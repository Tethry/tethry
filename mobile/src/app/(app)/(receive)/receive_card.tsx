import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import BackTab from "@/src/components/ui/BackTab";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useCameraPermissions,
  PermissionStatus,
  CameraView,
  BarcodeScanningResult,
} from "expo-camera";
import Loading from "@/src/components/ui/Loading";
// import NfcManager, { NfcTech } from "react-native-nfc-manager";
import { Redirect, router } from "expo-router";
import { processCard } from "@/src/utils/card/processCard";
import { useAuth } from "@/src/contexts/auth";
import { useReceiveCard } from "../../../contexts/receiveCard";

export default function ReceiveCard() {
  const [supportsNFC, setSupportsNFC] = useState(true);
  const [showCamera, setShowCamera] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [scannedLoading, setScannedLoading] = useState(false);
  const { token } = useAuth();
  const { setCardId, setCardOwner, setCardBalance } = useReceiveCard();

  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    async function getPermission() {
      if (permission?.status !== PermissionStatus.GRANTED) {
        const newPermission = await requestPermission();
        setIsLoading(false);
        if (!newPermission.granted) {
          setShowCamera(false);
        }
      } else {
        setIsLoading(false);
      }
    }

    getPermission();
  }, []);

  const handleBarcodeScanned = useCallback(
    async (result: BarcodeScanningResult) => {
      if (!isScanning || scannedData) {
        return;
      }

      setIsScanning(false);
      setScannedData(result.data);

      console.log(result.data);
      console.log("redirecting to receive page");
      setScannedLoading(true);
      setShowCamera(false);

      const data = await processCard(result.data, token);
      console.log(data);
    },
    [isScanning, scannedData]
  );

  const nfcScanned = async (cardId: string) => {
    if (!isScanning || scannedData) {
      return;
    }

    setIsScanning(false);
    setScannedData(cardId);

    console.log(cardId);
    console.log("redirecting to receive page");
    setScannedLoading(true);
    setShowCamera(false);

    const data = await processCard(cardId, token);
    console.log(data);
  };

  if (isLoading && !supportsNFC) {
    return (
      <StyledSafeView>
        <View className="flex-1 items-center justify-center">
          <Text>Loading camera...</Text>
        </View>
      </StyledSafeView>
    );
  }

  const handleScan = () => {
    setShowCamera(true);
  };

  // const checkNFCSupport = async (): Promise<boolean> => {
  //   try {
  //     // Initialize NFC Manager
  //     await NfcManager.start();

  //     // Check if NFC is supported
  //     const isSupported = await NfcManager.isSupported();

  //     // If not supported, clean up and return false
  //     if (!isSupported) {
  //       await NfcManager.close();
  //       return false;
  //     }

  //     // Check if NFC is enabled in phone settings
  //     const isEnabled = await NfcManager.isEnabled();

  //     // If not enabled, clean up and return false
  //     if (!isEnabled) {
  //       await NfcManager.close();
  //       return false;
  //     }

  //     // Device supports and has enabled NFC
  //     return true;
  //   } catch (error) {
  //     console.error("Error checking NFC support:", error);
  //     // Clean up in case of error
  //     await NfcManager.close();
  //     return false;
  //   }
  // };

  //   useEffect(() => {
  //     checkNFCSupport().then((supported) => {
  //       console.log("NFC supported: ", supported);
  //     });
  //   }, []);

  useEffect(() => {
    const simulateProcessCard = async () => {
      setIsScanning(false);
      setScannedData("5u3wd2bycfbbbddpkl90ls");
      setScannedLoading(true);
      setShowCamera(false);

      const data = await processCard("5u3wd2bycfbbbddpkl90ls", token);

      setScannedLoading(false);

      if (data.status) {
        router.replace("/(app)/(receive)/receive_card_preview");
        setCardId(data.card.cardId);
        setCardOwner(data.cardOwner);
        setCardBalance(data.balance);
      }
      console.log(data);
    };

    setTimeout(() => {
      simulateProcessCard();
    }, 2000);
  }, []);

  return (
    <StyledSafeView>
      {scannedLoading && <Loading />}
      <View className="w-full flex-1 justify-between pb-10">
        <View className="w-full">
          <View className="w-full flex-row items-center gap-2">
            <View className="w-[30px] mt-3 mr-3">
              <BackTab />
            </View>
            <Text className="text-xl font-AlexandriaLight">Receive USDT</Text>
          </View>

          {supportsNFC && (
            <>
              <View className="w-full mt-5 px-5 items-center justify-center">
                <Image
                  source={require("@/assets/images/Receive USDT - Tap/Illustration.png")}
                  className=""
                />
              </View>

              <View className="w-full" style={{ paddingHorizontal: 20 }}>
                <Text className="text-xl font-AlexandriaBold text-center">
                  Ready to receive payment
                </Text>

                <Text
                  className="font-AlexandriaLight text-center mt-2"
                  style={{ fontSize: 20 }}
                >
                  Hold the sender's card or device near your phone
                </Text>
              </View>
            </>
          )}

          {!supportsNFC && !showCamera && (
            <>
              <View className="w-full mt-5 px-5 items-center justify-center">
                <TouchableOpacity
                  className="w-full items-center justify-center"
                  onPress={handleScan}
                >
                  <Ionicons name="scan-sharp" size={120} color="black" />
                </TouchableOpacity>
              </View>

              <View className="w-full mt-10" style={{ paddingHorizontal: 20 }}>
                <Text className="text-xl font-AlexandriaBold text-center">
                  Tap to Scan
                </Text>

                <Text
                  className="font-AlexandriaLight text-center mt-2"
                  style={{ fontSize: 20 }}
                >
                  Scan QR code on card
                </Text>
              </View>
            </>
          )}

          {showCamera && permission?.granted && (
            <View className="w-full items-center justify-center">
              <View className="w-full h-full">
                {/* Camera View Container */}
                <View className="absolute inset-0">
                  <CameraView
                    style={{ flex: 1 }}
                    facing="back"
                    onBarcodeScanned={handleBarcodeScanned}
                    barcodeScannerSettings={{
                      barcodeTypes: ["qr"],
                    }}
                  />
                </View>

                {/* Overlay */}
                <View
                  className="flex-1"
                  style={{ backgroundColor: "transparent" }}
                >
                  {/* Center Square Scanner */}
                  <View className="flex-1 justify-center items-center">
                    <View className="w-64 h-64 relative">
                      {/* Transparent Square */}
                      <View
                        className="absolute inset-0"
                        style={{ backgroundColor: "transparent" }}
                      >
                        {/* Corner Markers */}
                        <View className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white" />
                        <View className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white" />
                        <View className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white" />
                        <View className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white" />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </StyledSafeView>
  );
}
