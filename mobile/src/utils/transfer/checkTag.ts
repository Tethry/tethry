import { API_URL } from "@/src/config/apiConfig";

export const checkTag = async (tag: string, jwt: string) => {
  const response = await fetch(`${API_URL}/transfer/check-transfer-tag`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tag: String(tag).replace("@", "") }),
  });
  return response.json();
};
