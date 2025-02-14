import { API_URL } from "@/src/config/apiConfig";

export const activateCard = async (
  cardNumber: string,
  pin: string,
  token: string
) => {
  const response = await fetch(`${API_URL}/card/activate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      cardNumber,
      pin,
    }),
  });

  const data = await response.json();

  return data;
};
