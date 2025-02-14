import {
  USDT_CONTRACT_ADDRESS,
  USDT_ABI,
  RPC_URL,
} from "../../config/contract/contractConfig";
import { ethers } from "ethers";
import { TOKEN_DECIMALS } from "@/src/config/contract/contractConfig";

export const getUserBalance = async (address: string): Promise<string> => {
  if (!RPC_URL) {
    throw new Error("RPC_URL is not set");
  }
  if (!USDT_CONTRACT_ADDRESS) {
    throw new Error("USDT_CONTRACT_ADDRESS is not set");
  }
  if (!USDT_ABI) {
    throw new Error("USDT_ABI is not set");
  }

  console.log("RPC_URL", RPC_URL);
  console.log("USDT_CONTRACT_ADDRESS", USDT_CONTRACT_ADDRESS);

  const provider = new ethers.JsonRpcProvider(RPC_URL);

  console.log("provider", provider);

  const contract = new ethers.Contract(
    USDT_CONTRACT_ADDRESS,
    USDT_ABI,
    provider
  );

  console.log("contract", contract);
  const balance = await contract.balanceOf(address);

  console.log("balance", balance);

  return balance;
};

export const formatBigInt = (value: bigint, maxDecimals = 2) => {
  // Convert from 18 decimals to a decimal string

  const divisor = BigInt("1000000000000000000"); // 10^18
  const wholePart = value / divisor;
  const decimalPart = value % divisor;

  // Convert to a decimal string
  let fullDecimalStr = "";

  if (decimalPart === BigInt(0)) {
    fullDecimalStr = wholePart.toString();
  } else {
    // Pad the decimal part to full 18 digits
    const decimalStr = decimalPart.toString().padStart(18, "0");
    fullDecimalStr = `${wholePart}.${decimalStr}`;
  }

  // Now format with suffixes
  const num = parseFloat(fullDecimalStr);

  const suffixes = [
    { value: 1e24, symbol: "Y" }, // Yotta
    { value: 1e21, symbol: "Z" }, // Zetta
    { value: 1e18, symbol: "E" }, // Exa
    { value: 1e15, symbol: "P" }, // Peta
    { value: 1e12, symbol: "T" }, // Tera
    { value: 1e9, symbol: "B" }, // Billion
    { value: 1e6, symbol: "M" }, // Million
    //   { value: 1e3, symbol: 'K' },   // Thousand
  ];

  // Find the appropriate suffix
  const suffix = suffixes.find((s) => num >= s.value);

  if (!suffix) {
    // If number is smaller than 1 million, format with up to maxDecimals
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxDecimals,
    });
  }

  // Calculate the divided number
  const divided = num / suffix.value;

  // Round to max decimals
  const rounded =
    Math.round(divided * Math.pow(10, maxDecimals)) / Math.pow(10, maxDecimals);

  // Format with locale string to get proper comma separators
  return (
    rounded.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxDecimals,
    }) + suffix.symbol
  );
};
