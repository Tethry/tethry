import { ethers } from "ethers";
import {
  USDT_ABI,
  USDT_CONTRACT_ADDRESS,
  RPC_URL,
  TETHRY_CONTRACT_ADDRESS,
} from "../../config/contract/contractConfig";
import { permitConfig } from "../../config/permitConfig";

export const userSignMessage = async (
  ownerPrivateKey: string,
  owner: string,
  recipient: string,
  value: number,
  charge: number
) => {
  // GaslessTransfer Contract and Wallet Information
  const tethryContractAddress = TETHRY_CONTRACT_ADDRESS;

//   console.log(permitConfig.chainId);

  const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

  if (!ownerPrivateKey || !owner || !recipient || !value || !charge) {
    throw new Error("Invalid input");
  }

  if (!USDT_CONTRACT_ADDRESS) {
    throw new Error("Invalid USDT contract address");
  }

  // Connect to Provider
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(ownerPrivateKey, provider);

  // Token Contract ABI
  const tokenContract = new ethers.Contract(
    USDT_CONTRACT_ADDRESS,
    USDT_ABI,
    provider
  );

  // Get Nonce and Domain Separator
  const nonce = await tokenContract.nonces(owner);
  console.log("Nonce:", nonce);
  const domainSeparator = await tokenContract.DOMAIN_SEPARATOR();
  console.log("Domain Separator:", domainSeparator);

  const parsedValue = ethers.parseEther(value.toString());
  console.log("parsedValue", parsedValue);
  const parsedCharge = ethers.parseEther(charge.toString());
  console.log("parsedCharge", parsedCharge);
  // Build Permit Hash
  const message = {
    owner,
    spender: tethryContractAddress,
    value: parsedValue + parsedCharge,
    nonce,
    deadline,
  };

  console.log("message", message);

  const balance = await tokenContract.balanceOf(owner);
  if (balance < value + charge) {
    throw new Error("Insufficient balance");
  }

  console.log("permitConfig", permitConfig);

  const signature = await wallet.signTypedData(
    {
      name: permitConfig.domainSeparator,
      version: permitConfig.version,
      chainId: permitConfig.chainId, 
      verifyingContract: USDT_CONTRACT_ADDRESS,
    },
    permitConfig.types,
    message
  );

  // Extract Signature Components
  const { r, s, v } = ethers.Signature.from(signature);

  console.log("r", r);
  console.log("s", s);
  console.log("v", v);

  // Convert message values to strings for JSON serialization
  const serializedMessage = {
    ...message,
    value: value.toString(),
    nonce: message.nonce.toString(),
    deadline: message.deadline.toString(),
    charge: charge.toString(),
    recipient: recipient,
  };

  return {
    signature,
    message: serializedMessage,
  };
};
