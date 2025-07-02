import { useFocusEffect } from "@react-navigation/native";
import {
  CameraView,
  useCameraPermissions,
  // BarcodeScanningResult,
} from "expo-camera";
import { useCallback, useState } from "react";
import { Text, TouchableOpacity, View, Button } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import ScanCameraStage from "./ui/ScanCameraStage";
import { BASE_URL } from "@/utils/baseUrl";

export default function ScannerCamera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanned, setIsScanned] = useState(false);
  const [isFocused, setIsFocused] = useState(true);

  // for unmount the camera if we navigate to another page
  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => {
        setIsFocused(false);
      };
    }, [])
  );

  if (!permission) {
    return (
      <View>
        <Text>Initializing camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>Permission required for showing the camera.</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  // function handleBarcodeScanned(result: BarcodeScanningResult) {
  async function handleBarcodeScanned() {
    if (!isScanned) {
      setIsScanned(true);

      const mockQRCodeData = { id: 1 };
      const res = await fetch(`${BASE_URL}/api/bin/${mockQRCodeData.id}`);
      const data = await res.json();

      if (!data) return;

      setIsScanned(false);

      return data.bin;
    }
  }

  return (
    <View>
      {isFocused && (
        <CameraView
          onBarcodeScanned={handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        >
          <View className="h-full flex justify-between items-center py-10">
            <View className="flex flex-row justify-between gap-4 px-10">
              <ScanCameraStage stage="Scan QR Code" />
              <ScanCameraStage stage="Photo Before" />
              <ScanCameraStage stage="Photo After" />
            </View>
            <TouchableOpacity
              className="flex justify-center items-center w-18 h-18 bg-purple-800/30 rounded-md p-1"
              onPress={() => handleBarcodeScanned()}
            >
              <AntDesign name="scan1" size={48} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}
