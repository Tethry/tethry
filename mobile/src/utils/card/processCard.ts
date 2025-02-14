import { API_URL } from "@/src/config/apiConfig";

export const processCard = async (cardId: string, token: string) => {
  console.log("processing card");
  console.log(cardId);

  const response = await fetch(`${API_URL}/card/process-validity`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ cardId }),
  });

  const data = await response.json();

  console.log(data);

  return data;
};
