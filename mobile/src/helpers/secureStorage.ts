import * as SecureStore from "expo-secure-store";

interface SecureStorageService {
  save: (key: string, value: string) => Promise<boolean>;
  getValueFor: (key: string) => Promise<string | null>;
  delete: (key: string) => Promise<boolean>;
}

export class SecureStorage implements SecureStorageService {
  async save(key: string, value: string): Promise<boolean> {
    try {
      await SecureStore.setItemAsync(key, value, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED,
        requireAuthentication: false,
      });
      return true;
    } catch (error) {
      console.error("Error saving to secure storage:", error);
      return false;
    }
  }

  async getValueFor(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error("Error reading from secure storage:", error);
      return null;
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      await SecureStore.deleteItemAsync(key);
      return true;
    } catch (error) {
      console.error("Error deleting from secure storage:", error);
      return false;
    }
  }
}
