import { ethers } from "ethers";
import dotenv from "dotenv";
import { Message } from "../interfaces/Imessage";

dotenv.config();

// Constants
const REQUIRED_ENV_VARS = {
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  TETHRY_CONTRACT_ADDRESS: process.env.TETHRY_CONTRACT_ADDRESS,
  RPC_URL: process.env.RPC_URL,
} as const;

// Validate all required environment variables at startup
Object.entries(REQUIRED_ENV_VARS).forEach(([key, value]) => {
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
});

const TETHRY_TRANSFER_ABI = [
  "function transfer(address _owner, uint256 _value, uint256 _deadline, uint8 _v, bytes32 _r, bytes32 _s, address _to, uint256 _charge) external",
] as const;

export const transferGasless = async (signature: string, message: Message) => {
  try {
    // Create provider and wallet
    const provider = new ethers.JsonRpcProvider(REQUIRED_ENV_VARS.RPC_URL);
    const spenderWallet = new ethers.Wallet(
      REQUIRED_ENV_VARS.PRIVATE_KEY as string,
      provider
    );

    // Extract signature components
    const { v, r, s } = ethers.Signature.from(signature);

    // Log transaction details
    console.log({
      owner: message.owner,
      recipient: message.recipient,
      value: message.value,
      charge: message.charge,
      deadline: message.deadline,
      spender: REQUIRED_ENV_VARS.TETHRY_CONTRACT_ADDRESS,
      signatureComponents: { v, r, s },
    });

    // Create contract instance
    const tethryContract = new ethers.Contract(
      REQUIRED_ENV_VARS.TETHRY_CONTRACT_ADDRESS as string,
      TETHRY_TRANSFER_ABI,
      spenderWallet
    );

    // Ensure value and charge are properly formatted before parsing
    const parsedValue = ethers.parseEther(message.value.toString());
    const parsedCharge = ethers.parseEther(message.charge.toString());

    console.log(parsedValue + parsedCharge);

    // Validate deadline hasn't passed
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (parseInt(message.deadline) < currentTimestamp) {
      throw new Error("Transaction deadline has expired");
    }

    // Send transaction
    const tx = await tethryContract.transfer(
      message.owner,
      parsedValue,
      message.deadline,
      v,
      r,
      s,
      message.recipient,
      parsedCharge,
      {
        gasLimit: 300000, // Add reasonable gas limit
      }
    );

    console.log("Transaction sent:", tx.hash);

    // Wait for confirmation with timeout
    const receipt = await Promise.race([
      tx.wait(),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("Transaction confirmation timeout")),
          60000
        )
      ),
    ]);

    if (!receipt) {
      throw new Error("Failed to get transaction receipt");
    }

    console.log(receipt.hash);

    console.log("Transaction confirmed:", receipt.hash);
    return receipt.hash;
  } catch (error) {
    // Enhanced error handling
    if (error instanceof Error) {
      console.error("Gasless transfer failed:", {
        message: error.message,
        stack: error.stack,
      });
      throw error;
    }

    // Handle unknown error types
    console.error("Unknown error in gasless transfer:", error);
    throw new Error("An unexpected error occurred during gasless transfer");
  }
};
