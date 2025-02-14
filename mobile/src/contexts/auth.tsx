import { useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config/apiConfig";
import { AuthStorage } from "../utils/storageUtil";

export const AuthContext = React.createContext<any>(null);

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }: React.PropsWithChildren) {
  const rootSegment = useSegments();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | undefined | null>(null);
  const [password, setPassword] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  // const [address, setAddress] = useState<string | null>(nu);
  useEffect(() => {
    const getUser = async () => {
      const credentials = await AuthStorage.getCredentials();
      // console.log(value);
      console.log(credentials);

      if (!credentials) return;

      if (credentials) {
        if (credentials.privateKey) {
          setPrivateKey(credentials.privateKey);
        }

        if (credentials.jwtToken) {
          setToken(credentials.jwtToken);
        }

        if (credentials.address) {
          setAddress(credentials.address);
        }

        const apiUrl = `${API_URL}/auth/me`;

        try {
          setIsLoading(true);

          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${credentials.jwtToken}`,
            },
          });

          const data = await response.json();

          console.log(data);

          setIsLoading(false);

          if (!data.status) {
          } else {
            setUser(data.user);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
      }
    };

    getUser();
  }, []);

  // useEffect(() => {
  //   // Guard against undefined/null values
  //   if (rootSegment === undefined || user === undefined) return;

  //   // Add a mounted check to prevent redirect after component unmount
  //   let isMounted = true;

  //   const handleNavigation = async () => {
  //     try {
  //       if (isMounted) {
  //         if (!token || (!privateKey && rootSegment[0] !== "(auth)")) {
  //           console.log("Navigating to onboarding");
  //           await router.replace("/(auth)/onboarding");
  //         } else if (token && rootSegment[0] === "(auth)") {
  //           console.log("Navigating to home");
  //           await router.replace("/");
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Navigation error:', error);
  //     }
  //   };

  //   handleNavigation();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [user, rootSegment, token, privateKey]);

  // first implementation

  useEffect(() => {
    console.log(rootSegment, user);
    // if (token === null) return;
    if (!token && rootSegment[0] !== "(auth)") {
      router.replace("/(auth)/onboarding");
    } else if (token && rootSegment[0] == "(auth)") {
      router.replace("/");
    }
  }, [user, rootSegment, token, privateKey]);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        signOut: async () => {
          setUser(null);
          await AuthStorage.clearCredentials();
          router.replace("/onboarding");
        },
        setToken: setToken,
        setUser: setUser,
        privateKey,
        setPrivateKey: setPrivateKey,
        password,
        setPassword: setPassword,
        token,
        isLoading,
        address,
        balance,
        setBalance: setBalance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
