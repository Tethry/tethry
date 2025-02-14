// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./IERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ReentrancyGuard.sol";

contract Tethry is Ownable, ReentrancyGuard {
    // Custom Errors
    error InvalidAmount();
    error InsufficientBalance();
    error TransferFailed();
    error CardAlreadyExists();
    error NoActiveCard();
    error FeeExceedsMaxLimit();
    error GaslessTransfer__NotEnoughAllowance();
    error GaslessTransfer__NotEnoughBalance();
    error GaslessTransfer__TransferFailed();
    error GaslessTransfer__PermitFailed();

    // Constants
    uint256 public constant MAX_FEE_PERCENTAGE = 5; // Maximum 5% fee
    uint256 public FEE_DENOMINATOR = 100;

    // Mapping to store user card balances
    mapping(address => uint256) public cardBalances;
    mapping(address => bool) public cardExists;

    // State variables
    uint256 public totalProfits;
    IERC20Permit public immutable token;
    uint256 public feePercentage;

    // Events
    event CardCreated(address indexed user);
    event CardDeleted(address indexed user, uint256 balance);
    event CardFunded(address indexed user, uint256 amount);
    event FundsTransferred(
        address indexed sender,
        address indexed receiver,
        uint256 amount,
        uint256 fee
    );
    event ProfitsWithdrawn(address indexed recipient, uint256 amount);
    event FeeUpdated(uint256 newFeePercentage);
    event FeeDenominatorUpdated(uint256 newFeeDenominator);

    constructor(
        address _tokenAddress,
        uint256 _initialFeePercentage
    ) Ownable(msg.sender) {
        if (_tokenAddress == address(0)) revert TransferFailed();
        if (_initialFeePercentage > MAX_FEE_PERCENTAGE)
            revert FeeExceedsMaxLimit();

        token = IERC20Permit(_tokenAddress);
        feePercentage = _initialFeePercentage;
    }

    function createCard(address _user) external onlyOwner {
        if (cardExists[_user]) revert CardAlreadyExists();

        cardBalances[_user] = 0;
        cardExists[_user] = true;
        emit CardCreated(_user);
    }

    function fundCard(
        address _owner,
        uint256 _value,
        uint256 _deadline,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) external onlyOwner nonReentrant {
        if (_value == 0) revert InvalidAmount();
        if (!cardExists[_owner]) revert NoActiveCard();

        token.permit(_owner, address(this), _value, _deadline, _v, _r, _s);

        require(
            token.transferFrom(_owner, address(this), _value),
            "Transfer failed"
        );

        cardBalances[_owner] += _value;
        emit CardFunded(_owner, _value);
    }

    function cardTransfer(
        address _sender,
        address _receiver,
        uint256 _amount
    ) external onlyOwner nonReentrant {
        if (!cardExists[_sender]) revert NoActiveCard();

        uint256 _fee = (_amount * feePercentage) / FEE_DENOMINATOR;
        if (cardBalances[_sender] < _amount + _fee)
            revert InsufficientBalance();

        cardBalances[_sender] -= (_amount + _fee);
        require(token.transfer(_receiver, _amount), "Transfer failed");
        totalProfits += _fee;

        emit FundsTransferred(_sender, _receiver, _amount, _fee);
    }

    function updateFeePercentage(uint256 _newFeePercentage) external onlyOwner {
        if (_newFeePercentage > MAX_FEE_PERCENTAGE) revert FeeExceedsMaxLimit();

        feePercentage = _newFeePercentage;
        emit FeeUpdated(_newFeePercentage);
    }

    function updateFeeDenominator(
        uint256 _newFeeDenominator
    ) external onlyOwner {
        FEE_DENOMINATOR = _newFeeDenominator;

        emit FeeDenominatorUpdated(_newFeeDenominator);
    }

    function getCardBalance(address _user) external view returns (uint256) {
        return cardBalances[_user];
    }

    function deleteCard(address _user) external onlyOwner nonReentrant {
        if (!cardExists[_user] || cardBalances[_user] == 0)
            revert NoActiveCard();

        uint256 _balance = cardBalances[_user];
        uint256 _fee = (_balance * feePercentage) / FEE_DENOMINATOR;
        uint256 _withdrawAmount = _balance - _fee;

        totalProfits += _fee;
        cardBalances[_user] = 0;
        cardExists[_user] = false;

        require(token.transfer(_user, _withdrawAmount), "Transfer failed");

        emit CardDeleted(_user, _withdrawAmount);
    }

    function withdrawProfits(
        address _recipient
    ) external onlyOwner nonReentrant {
        uint256 _amount = totalProfits;
        if (_amount == 0) revert InvalidAmount();

        totalProfits = 0;
        require(token.transfer(_recipient, _amount), "Transfer failed");

        emit ProfitsWithdrawn(_recipient, _amount);
    }

    function transfer(
        address _owner,
        uint256 _value,
        uint256 _deadline,
        uint8 _v,
        bytes32 _r,
        bytes32 _s,
        address _to,
        uint256 _charge
    ) external onlyOwner {
        uint256 _totalValue = _value + _charge;

        try
            token.permit(
                _owner,
                address(this),
                _totalValue,
                _deadline,
                _v,
                _r,
                _s
            )
        {} catch {
            revert GaslessTransfer__PermitFailed();
        }

        bool success1 = token.transferFrom(_owner, address(this), _totalValue);
        if (!success1) {
            revert GaslessTransfer__TransferFailed();
        }

        bool success2 = token.transfer(_to, _value);
        if (!success2) {
            revert GaslessTransfer__TransferFailed();
        }

        bool success3 = token.transfer(owner(), _charge);
        if (!success3) {
            revert GaslessTransfer__TransferFailed();
        }
    }
}
