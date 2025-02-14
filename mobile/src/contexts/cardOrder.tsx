import * as React from "react";
import { useState } from "react";

export const CardOrderContext = React.createContext<any>(null);

export function useCardOrder() {
  return React.useContext(CardOrderContext);
}

export function CardOrderProvider({ children }: React.PropsWithChildren) {
  const [fullName, setFullName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");
  const [estimatedDelivery, setEstimatedDelivery] = useState<string>("");

  // Fund Card
  const [fundAmount, setFundAmount] = useState<string>("");

  return (
    <CardOrderContext.Provider
      value={{
        fullName,
        setFullName,
        address,
        setAddress,
        city,
        setCity,
        state,
        setState,
        country,
        setCountry,
        phoneNumber,
        setPhoneNumber,
        orderId,
        setOrderId,
        estimatedDelivery,
        setEstimatedDelivery,
        fundAmount,
        setFundAmount,
      }}
    >
      {children}
    </CardOrderContext.Provider>
  );
}
