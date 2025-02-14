import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

// Constants
const REQUIRED_ENV_VARS = {
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  TETHRY_CONTRACT_ADDRESS: process.env.TETHRY_CONTRACT_ADDRESS,
  RPC_URL: process.env.RPC_URL,
} as const;

// Validate environment variables
Object.entries(REQUIRED_ENV_VARS).forEach(([key, value]) => {
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
});

// Full ABI for all contract functions
const TETHRY_ABI = [
  "function createCard(address _user) external",
  "function fundCard(address _owner, uint256 _value, uint256 _deadline, uint8 _v, bytes32 _r, bytes32 _s) external",
  "function cardTransfer(address _sender, address _receiver, uint256 _amount) external",
  "function updateFeePercentage(uint256 _newFeePercentage) external",
  "function getCardBalance(address _user) external view returns (uint256)",
  "function deleteCard(address _user) external",
  "function withdrawProfits(address _recipient) external",
  "function transfer(address _owner, uint256 _value, uint256 _deadline, uint8 _v, bytes32 _r, bytes32 _s, address _to, uint256 _charge) external",
] as const;

// Interfaces for different function parameters
interface Message {
  owner: string;
  recipient: string;
  value: number;
  charge: number;
  deadline: string;
}

interface PermitDetails {
  owner: string;
  value: number;
  deadline: string;
  signature: string;
}

export class CardService {
  private contract: ethers.Contract;
  private spenderWallet: ethers.Wallet;

  constructor() {
    const provider = new ethers.JsonRpcProvider(REQUIRED_ENV_VARS.RPC_URL);
    this.spenderWallet = new ethers.Wallet(
      REQUIRED_ENV_VARS.PRIVATE_KEY as string,
      provider
    );

    this.contract = new ethers.Contract(
      REQUIRED_ENV_VARS.TETHRY_CONTRACT_ADDRESS as string,
      TETHRY_ABI,
      this.spenderWallet
    );
  }

  // Create a card for a specific user
  async createCard(userAddress: string) {
    try {
      const tx = await this.contract.createCard(userAddress);
      console.log(`Card created for ${userAddress}. Tx hash: ${tx.hash}`);
      return await tx.wait();
    } catch (error) {
      console.error(`Failed to create card for ${userAddress}:`, error);
      throw error;
    }
  }

  // Fund a card using permit
  async fundCard(details: PermitDetails) {
    try {
      console.log(details);

      // Extract signature components
      const { v, r, s } = ethers.Signature.from(details.signature);

      const parsedValue = ethers.parseEther(details.value.toString());

      const tx = await this.contract.fundCard(
        details.owner,
        parsedValue,
        details.deadline,
        v,
        r,
        s
      );

      console.log(`Card funded for ${details.owner}. Tx hash: ${tx.hash}`);
      return await tx.wait();
    } catch (error) {
      console.error(`Failed to fund card for ${details.owner}:`, error);
      throw error;
    }
  }

  // Transfer between cards
  async cardTransfer(sender: string, receiver: string, amount: number) {
    try {
      // Parse the transfer amount
      const parsedAmount = ethers.parseEther(amount.toString());

      // Check sender's current balance
      const senderBalance = await this.contract.getCardBalance(sender);

      // Convert balance to a number for comparison
      const formattedBalance = ethers.formatEther(senderBalance);

      // Check if sender has sufficient balance
      if (parseFloat(formattedBalance) < amount) {
        throw new Error(
          `Insufficient card balance. Current balance: ${formattedBalance}, Requested transfer: ${amount}`
        );
      }

      // Proceed with transfer if balance is sufficient
      const tx = await this.contract.cardTransfer(
        sender,
        receiver,
        parsedAmount
      );
      console.log(
        `Transfer from ${sender} to ${receiver}. Tx hash: ${tx.hash}`
      );
      return await tx.wait();
    } catch (error) {
      console.error(`Failed to transfer between cards:`, error);
      throw error;
    }
  }

  // Update fee percentage
  async updateFeePercentage(newFeePercentage: number) {
    try {
      const tx = await this.contract.updateFeePercentage(newFeePercentage);
      console.log(
        `Fee percentage updated to ${newFeePercentage}%. Tx hash: ${tx.hash}`
      );
      return await tx.wait();
    } catch (error) {
      console.error(`Failed to update fee percentage:`, error);
      throw error;
    }
  }

  // Get card balance
  async getCardBalance(userAddress: string) {
    try {
      const balance = await this.contract.getCardBalance(userAddress);
      return Number(balance);
    } catch (error) {
      console.error(`Failed to get card balance for ${userAddress}:`, error);
      throw error;
    }
  }

  // Delete a card
  async deleteCard(userAddress: string) {
    try {
      const tx = await this.contract.deleteCard(userAddress);
      console.log(`Card deleted for ${userAddress}. Tx hash: ${tx.hash}`);
      return await tx.wait();
    } catch (error) {
      console.error(`Failed to delete card for ${userAddress}:`, error);
      throw error;
    }
  }
}

// Example usage
async function exampleUsage() {
  const cardService = new CardService();

  try {
    // Create a card
    await cardService.createCard("0x1234...");

    // Fund a card
    await cardService.fundCard({
      owner: "0x5678...",
      value: 100,
      deadline: Math.floor(Date.now() / 1000 + 3600).toString(),
      signature: "0x...", // Permit signature
    });

    // Get balance
    const balance = await cardService.getCardBalance("0x5678...");
    console.log("Card Balance:", balance);
  } catch (error) {
    console.error("Error in example usage:", error);
  }
}
