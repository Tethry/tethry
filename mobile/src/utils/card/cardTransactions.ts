import { API_URL } from "@/src/config/apiConfig";

export const getCardRecentTransactions = async (token: string) => {
  const response = await fetch(`${API_URL}/transactions/card/recent`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
};
