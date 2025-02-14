import { API_URL } from "@/src/config/apiConfig";

export const placeCardOrder = async (
  message: any,
  signature: string,
  fullName: string,
  address: string,
  city: string,
  state: string,
  country: string,
  token: string
) => {
  const response = await fetch(`${API_URL}/card/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message,
      signature,
      fullName,
      address,
      city,
      state,
      country,
    }),
  });

  const data = await response.json();

  return data;
};
