import { useFocusEffect } from "@react-navigation/native";
import {
  CameraView,
  useCameraPermissions,
  // BarcodeScanningResult,
} from "expo-camera";
import { useCallback, useState, useRef } from "react";
import { View } from "react-native";
import { AI_SERVER_URL, BASE_URL } from "../../utils/baseUrl";
import { ScannerCameraStage } from "../../types/enums";
import { photos } from "../../../admin/src/mocks/photos";
import { Button, ButtonText } from "../ui/button";
import ScanCameraStageBar from "./ScanCameraStageBar";
import ScanCameraButton from "./ScanCameraButton";
import FinishRestartButton from "./FinishRestartButton";
import TakenPhotosPreview from "./TakenPhotosPreview";
import FullScreenPhotoPreview from "./FullScreenPhotoPreview";
import { useAuth0 } from "react-native-auth0";
import convertUriToPayload from "../../utils/convertUriToPayload";
import { Spinner } from "../ui/spinner";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

const photoConfig = {
  quality: 0.7,
  base64: true,
};

export default function ScannerCamera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanned, setIsScanned] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [actionStage, setActionStage] = useState<ScannerCameraStage>(
    ScannerCameraStage.Scan
  );
  const [photosUri, setPhotosUri] = useState<string[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<0 | 1 | null>(
    null
  );
  const { user } = useAuth0();

  const cameraRef = useRef<any>(null);

  // unmount the camera if we navigate to another page
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
        {/* <Button onPress={requestPermission} title="grant permission" /> */}
        <Button onPress={requestPermission}>
          <ButtonText>Grant Permission</ButtonText>
        </Button>
      </View>
    );
  }

  // function handleBarcodeScanned(result: BarcodeScanningResult) {
  async function handleBarcodeScanned() {
    if (!isScanned) {
      setIsScanned(true);

      const mockQRCodeData = { binId: 1 };
      const res = await fetch(`${BASE_URL}/api/bin/${mockQRCodeData.binId}`);
      const data = await res.json();

      if (!data) return;

      setIsScanned(false);
      setActionStage(ScannerCameraStage.Before);
      // console.log(data.bin);
      // return data.bin;
    }
  }

  async function handleTakePhotos() {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync(photoConfig);
    // If photos is a real photo from camera, it will have a `base64` property
    // that we can use. Otherwise, for mock data photo, we have to fetch and convert to Blob and Base64.
    // console.log(photo.base64);
    const isSimulatedPhoto = photo.uri;

    // photo before
    if (actionStage === ScannerCameraStage.Before) {
      // 'photo.uri' is the uri of the real photo taken from the camera.
      // However, on Android emulator, the virtual camera only returns a black screen with a timestamp.
      // So here we use a mock photo for testing purposes.
      const photoUri = isSimulatedPhoto ? photos[0].uri : photo.uri;

      setPhotosUri((prev) => [...prev, photoUri]);
      setCurrentPhotoIndex(0);
      setIsPhotoTaken(true);

      setActionStage(ScannerCameraStage.After);
    }

    // photo after
    if (actionStage === ScannerCameraStage.After) {
      // 'photo.uri' is the uri of the real photo taken from the camera.
      // However, on Android emulator, the virtual camera only returns a black screen with a timestamp.
      // So here we use a mock photo for testing purposes.
      const photoUri = isSimulatedPhoto ? photos[1].uri : photo.uri;

      setPhotosUri((prev) => [...prev, photoUri]);
      setCurrentPhotoIndex(1);
      setIsPhotoTaken(true);

      setActionStage(ScannerCameraStage.Finish);
    }

    setTimeout(() => {
      setIsPhotoTaken(false);
    }, 3000);
  }

  async function handleSubmit() {
    // I don't want to log in, so temporarily comment out for development
    // if (!user) return;

    setIsProcessing(true);

    const payload = await convertUriToPayload(
      // "fake-uuid-id" only for development without login
      user?.sub || "fake-uuid-id",
      photosUri[0],
      photosUri[1]
    );

    const res = await fetch(`${AI_SERVER_URL}/analysis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    if (data.success) {
      console.log("Base64 file transfer successfully", data.result);
    }

    setIsProcessing(false);
  }

  function handleRestart() {
    setIsScanned(false);
    setIsPhotoTaken(false);
    setActionStage(ScannerCameraStage.Scan);
    setPhotosUri([]);
    setCurrentPhotoIndex(null);
  }

  return (
    <View>
      <FullScreenPhotoPreview
        isPhotoTaken={isPhotoTaken}
        currentPhotoIndex={currentPhotoIndex}
        photosUri={photosUri}
      />

      {isFocused && !isPhotoTaken && (
        <CameraView
          ref={cameraRef}
          onBarcodeScanned={handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        >
          <View className="h-full flex justify-between items-center py-10">
            <ScanCameraStageBar actionStage={actionStage} />

            <ScanCameraButton
              actionStage={actionStage}
              handleBarcodeScanned={handleBarcodeScanned}
              handleTakePhotos={handleTakePhotos}
            />

            {!isProcessing && (
              <FinishRestartButton
                actionStage={actionStage}
                handleSubmit={handleSubmit}
                handleRestart={handleRestart}
              />
            )}

            {isProcessing && (
              <VStack className="absolute top-1/2 bg-black/50 gap-2 p-4 rounded-md">
                <Spinner size="large" color="white" />
                <Text className="text-white">Processing...</Text>
              </VStack>
            )}

            <TakenPhotosPreview photosUri={photosUri} />
          </View>
        </CameraView>
      )}
    </View>
  );
}
