import { useFocusEffect } from "@react-navigation/native";
import {
  CameraView,
  useCameraPermissions,
  // BarcodeScanningResult,
} from "expo-camera";
import { useCallback, useState, useRef } from "react";
import { Text, View } from "react-native";
import { BASE_URL } from "../../utils/baseUrl";
import { ScannerCameraStage } from "../../types/enums";
import { photos } from "../../../admin/src/mocks/photos";
import { Button, ButtonText } from "../ui/button";
import ScanCameraStageBar from "./ScanCameraStageBar";
import ScanCameraButton from "./ScanCameraButton";
import FinishRestartButton from "./FinishRestartButton";
import TakenPhotosPreview from "./TakenPhotosPreview";
import FullScreenPhotoPreview from "./FullScreenPhotoPreview";

const photoConfig = {
  quality: 0.7,
  base64: true,
};

export default function ScannerCamera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanned, setIsScanned] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const [actionStage, setActionStage] = useState<ScannerCameraStage>(
    ScannerCameraStage.Scan
  );
  const [photosUri, setPhotosUri] = useState<string[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<0 | 1 | null>(
    null
  );

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

            <FinishRestartButton
              actionStage={actionStage}
              handleRestart={handleRestart}
            />

            <TakenPhotosPreview photosUri={photosUri} />
          </View>
        </CameraView>
      )}
    </View>
  );
}
