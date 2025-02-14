import * as React from "react";
import { useState } from "react";

export const GlobalContext = React.createContext<any>(null);

export function useGlobal() {
  return React.useContext(GlobalContext);
}

export function GlobalProvider({ children }: React.PropsWithChildren) {
  const [email, setEmail] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [jwtToken, setJwtToken] = useState<string>("");

  return (
    <GlobalContext.Provider
      value={{
        email,
        setEmail,
        walletAddress,
        setWalletAddress,
        privateKey,
        setPrivateKey,
        password,
        setPassword,
        jwtToken,
        setJwtToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
