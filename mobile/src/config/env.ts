import Constants from "expo-constants";

// Type definition for our environment variables
interface EnvironmentVariables {
  ENCRYPTION_KEY: string;
}

// Get the environment variables from Expo's extra object
const ENV = Constants.expoConfig?.extra as EnvironmentVariables;

// Fallback values if environment variables are not set
const ENV_FALLBACK = {
  ENCRYPTION_KEY: "default_key",
} as const;

// Export environment variables with fallbacks
export const getEnvVars = (): EnvironmentVariables => ({
  ENCRYPTION_KEY: ENV?.ENCRYPTION_KEY ?? ENV_FALLBACK.ENCRYPTION_KEY,
});
