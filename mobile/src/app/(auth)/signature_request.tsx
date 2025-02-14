import Button from "@/src/components/ui/Button";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import { Text, View, Image, ScrollView } from "react-native";
import { router } from "expo-router";
import { AuthStorage } from "@/src/utils/storageUtil";
import { ethers } from "ethers";
import { decrypt, encrypt } from "@/src/utils/encryptionUtils";
import { API_URL, RPC_URL } from "@/src/config/apiConfig";
import { useGlobal } from "@/src/contexts/globals";
import { messageToSign } from "@/src/utils/messageToSign";
import { useEffect, useState } from "react";

export default function SignatureRequest() {
  const { privateKey, jwtToken, password, setJwtToken } = useGlobal();
  const [nonce, setNonce] = useState("");

  useEffect(() => {
    const generateNonce = async () => {
      console.log("generating nonce ....");
      console.log("API_URL", API_URL);

      const response = await fetch(`${API_URL}/auth/get-nonce`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const data = await response.json();
      console.log("Data", data);
      if (data.status) {
        setNonce(data.nonce);
      } else {
        console.log("Error generating nonce");
      }
    };

    generateNonce();
  }, []);

  const handleSign = async () => {
    console.log("Encrypted Private Key", privateKey);
    console.log("Password", password);

    try {
      const decryptedPrivateKey = decrypt(privateKey, password);
      console.log("Decrypted Private Key: ", decryptedPrivateKey);

      const provider = new ethers.JsonRpcProvider(RPC_URL);
      await provider.ready;
      console.log("Provider initialized");
      console.log("Provider", provider);
      const wallet = new ethers.Wallet(decryptedPrivateKey, provider);
      console.log("Wallet created:", wallet.address);
      const signature = await wallet.signMessage(messageToSign(nonce));

      console.log("Message signed successfully: ", signature);

      const response = await fetch(`${API_URL}/auth/verify-signature`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signature,
          message: messageToSign(nonce),
          walletAddress: wallet.address,
        }),
      });

      const data = await response.json();
      console.log("Data", data);

      if (data.status) {
        setJwtToken(data.token);

        const saved = await AuthStorage.saveCredentials(
          privateKey,
          data.token,
          wallet.address
        );

        if (saved) {
          router.replace("/(auth)/set_transfer_tag");
        } else {
          console.log("Failed to save credentials");
        }

        // this is where all the magic happens
      } else {
        console.log("Error verifying signature");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledSafeView>
      <View
        style={{ flex: 1, paddingBottom: 25 }}
        className="w-full justify-between"
      >
        <View className="w-full">
          <View className="w-full" style={{ marginVertical: 20 }}>
            <Text className="font-AlexandriaBold text-center text-xl">
              Signature Request
            </Text>
          </View>

          <View className="w-full items-center justify-center">
            <Image
              source={require("../../../assets/images/pen_circle_signature.png")}
            />
          </View>

          <View className="w-full mt-10">
            <Text className="text-center text-[#1E1E1E] text-xl font-AlexandriaMedium">
              Sign to authenticate your wallet.
            </Text>

            <Text className="text-center mt-5 text-md text-[#8F8F8F] font-AlexandriaRegular">
              You are signing the message below
            </Text>
          </View>

          <View className="w-full items-center justify-center mt-10">
            <View className="w-[90%] h-[300px] bg-[#F5F5F5] border-2 border-[#B4B4B4] rounded-xl p-5">
              <Text
                style={{ fontSize: 15 }}
                className=" font-AlexandriaRegular text-[#8F8F8F]"
              >
                {messageToSign(nonce)}
              </Text>
            </View>
          </View>
        </View>

        <View className="w-full items-center justify-center">
          <View className="w-[90%]">
            {nonce && <Button title="Sign" onPress={handleSign} />}
          </View>
        </View>
      </View>
    </StyledSafeView>
  );
}
