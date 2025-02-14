import { API_URL } from "@/src/config/apiConfig";

export const fundCard = async (
  signature: string,
  token: string,
  amount: number,
  owner: string,
  deadline: string
) => {
  const response = await fetch(`${API_URL}/card/fund`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      signature,
      amount,
      owner,
      deadline,
    }),
  });

  const data = await response.json();

  return data;
};
