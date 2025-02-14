import { API_URL } from "@/src/config/apiConfig";

export const getUserCard = async (token: string) => {
  const response = await fetch(`${API_URL}/card/check-if-user-has-card`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
