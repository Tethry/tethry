import React, { useState } from "react";

export const TransferContext = React.createContext<any>(null);

export function useTransfer() {
  return React.useContext(TransferContext);
}

export function TransferProvider({ children }: React.PropsWithChildren) {
  const [transferTag, setTransferTag] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [method, setMethod] = useState<"address" | "transferTag">(
    "transferTag"
  );
  const [charge, setCharge] = useState(3);
  const [signedData, setSignedData] = useState<any>(null);
  return (
    <TransferContext.Provider
      value={{
        transferTag,
        setTransferTag,
        address,
        setAddress,
        amount,
        setAmount,
        method,
        setMethod,
        charge,
        setCharge,
        signedData,
        setSignedData,
      }}
    >
      {children}
    </TransferContext.Provider>
  );
}
