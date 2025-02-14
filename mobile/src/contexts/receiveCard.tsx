import * as React from "react";
import { useState } from "react";

export const ReceiveCardContext = React.createContext<any>(null);

export function useReceiveCard() {
  return React.useContext(ReceiveCardContext);
}

export function ReceiveCardProvider({ children }: React.PropsWithChildren) {
  const [amount, setAmount] = useState<string>("");
  const [cardId, setCardId] = useState<string>("");
  const [cardOwner, setCardOwner] = useState<string>("");
  const [cardBalance, setCardBalance] = useState<number>(0);

  return (
    <ReceiveCardContext.Provider
      value={{
        amount,
        setAmount,
        cardId,
        setCardId,
        cardOwner,
        setCardOwner,
        cardBalance,
        setCardBalance,
      }}
    >
      {children}
    </ReceiveCardContext.Provider>
  );
}
