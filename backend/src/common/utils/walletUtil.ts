import { ethers } from "ethers";

export const createWallet = async () => {
  const wallet = ethers.Wallet.createRandom();
  return wallet;
};

export const verifySignature = async (
  signature: string,
  message: string,
  walletAddress: string
) => {
  try {
    const recoveredAddress = ethers.verifyMessage(message, signature);

    console.log(recoveredAddress, walletAddress);

    const nonceMatch = message.match(/Nonce:\s*([^\n\s]+)/);
    const nonce = nonceMatch ? nonceMatch[1] : null;

    console.log(nonce);

    const verified =
      recoveredAddress.toLowerCase() === walletAddress.toLowerCase();

    return { nonce, verified };
  } catch (error) {
    console.error("Error verifying signature:", error);
    return { nonce: null, verified: false };
  }
};
