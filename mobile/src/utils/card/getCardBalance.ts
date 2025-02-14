import { API_URL } from "@/src/config/apiConfig";

export const getCardBalance = async (token: string) => {
  const response = await fetch(`${API_URL}/card/balance`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
};
