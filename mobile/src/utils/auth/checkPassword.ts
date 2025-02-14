import { API_URL } from "@/src/config/apiConfig";

export const checkPassword = async (password: string, jwt: string) => {
  const response = await fetch(`${API_URL}/auth/check-password`, {
    method: "POST",
    body: JSON.stringify({ password }),
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
