import { API_URL } from "../config/apiConfig";

export const getRecentTransactions = async (token: string) => {
  const response = await fetch(`${API_URL}/transactions/recent`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
