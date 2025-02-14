import { SecureStorage } from "@/src/helpers/secureStorage";
// import { decrypt } from "@/src/utils/encryptionUtils";

export class AuthStorage {
  private static readonly KEYS = {
    PRIVATE_KEY: "privateKey",
    JWT_TOKEN: "jwtToken",
    ADDRESS: "address",
  };

  private static storage = new SecureStorage();

  static async saveCredentials(
    privateKey: string,
    jwtToken: string,
    address: string
  ): Promise<boolean> {
    try {
      const savedPrivateKey = await this.storage.save(
        this.KEYS.PRIVATE_KEY,
        privateKey
      );
      const savedJwtToken = await this.storage.save(
        this.KEYS.JWT_TOKEN,
        jwtToken
      );
      const savedAddress = await this.storage.save(this.KEYS.ADDRESS, address);

      return savedPrivateKey && savedJwtToken && savedAddress;
    } catch (error) {
      console.error("Failed to save user session:", error);
      return false;
    }
  }

  static async getCredentials() {
    try {
      const privateKey = await this.storage.getValueFor(this.KEYS.PRIVATE_KEY);
      const jwtToken = await this.storage.getValueFor(this.KEYS.JWT_TOKEN);
      const address = await this.storage.getValueFor(this.KEYS.ADDRESS);
      return {
        privateKey,
        jwtToken,
        address,
      };
    } catch (error) {
      console.error("Failed to get user session:", error);
      return null;
    }
  }

  static async clearCredentials(): Promise<boolean> {
    try {
      const deletedPrivateKey = await this.storage.delete(
        this.KEYS.PRIVATE_KEY
      );
      const deletedJwtToken = await this.storage.delete(this.KEYS.JWT_TOKEN);
      const deletedAddress = await this.storage.delete(this.KEYS.ADDRESS);
      return deletedPrivateKey && deletedJwtToken && deletedAddress;
    } catch (error) {
      console.error("Failed to clear user session:", error);
      return false;
    }
  }
}

async function checkSession() {
  const session = await AuthStorage.getCredentials();
  if (session?.privateKey && session?.jwtToken && session?.address) {
    // User is logged in
    return true;
  }
  // User needs to login
  return false;
}
