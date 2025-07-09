import { useFocusEffect } from "@react-navigation/native";
import {
  CameraView,
  useCameraPermissions,
  // BarcodeScanningResult,
} from "expo-camera";
import { useCallback, useState, useRef } from "react";
import { View } from "react-native";
import { ScannerCameraStage } from "../../types/enums";
import { photos } from "../../../admin/src/mocks/photos";
import { Button, ButtonText } from "../ui/button";
import ScanCameraButton from "./ScanCameraButton";
import FinishRestartButton from "./FinishRestartButton";
import TakenPhotosPreview from "./TakenPhotosPreview";
import FullScreenPhotoPreview from "./FullScreenPhotoPreview";
import { useAuth0 } from "react-native-auth0";
import convertUriToPayload from "../../utils/convertUriToPayload";
import { Text } from "../ui/text";
import ProcessingSpinner from "./ProcessingSpinner";
import DisposalSuccessModal from "./DisposalSuccessModal";
import CameraActionStepper from "./CameraActionStepper";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/api/api";

const photoConfig = {
  quality: 0.7,
  base64: true,
};

export default function ScannerCamera() {
  const [brandNames, setBrandNames] = useState<string>("");
  const [productNames, setProductNames] = useState<string>("");
  const [permission, requestPermission] = useCameraPermissions();
  const [isFocused, setIsFocused] = useState(true);
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const [actionStage, setActionStage] = useState<ScannerCameraStage>(
    ScannerCameraStage.Scan
  );
  const [photosUri, setPhotosUri] = useState<string[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<0 | 1 | null>(
    null
  );
  const { user, authorize } = useAuth0();

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

  const { data: participant } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.getUserByEmail(user?.email),
    enabled: !!user,
  });

  const { data: bin, refetch: fetchBin } = useQuery({
    queryKey: ["bin"],
    queryFn: () => api.getBinByPositionType(),
    enabled: false,
  });

  const { data: affectedChallenges } = useQuery({
    queryKey: [
      "affectedChallenges",
      brandNames,
      productNames,
      participant?.participantId,
    ],
    queryFn: () =>
      api.getAffectedChallenges(
        brandNames,
        productNames,
        participant?.participantId
      ),
    enabled: brandNames.length > 0 && productNames.length > 0,
  });

  const startAnalysisMutation = useMutation({
    mutationFn: (payload: {
      before: string;
      after: string;
      filenameBefore: string;
      filenameAfter: string;
      typeBefore: string;
      typeAfter: string;
    }) => api.startAnalysis(payload),
    onSuccess: (data) => {
      const newBrandNames = data.result.detectedItems
        .map((item) => item.disposedProduct.brandName)
        .join(",");
      setBrandNames(newBrandNames);

      const newProductNames = data.result.detectedItems
        .map((item) => item.disposedProduct.label)
        .join(",");
      setProductNames(newProductNames);

      setActionStage(ScannerCameraStage.End);
    },
  });

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
    if (actionStage !== ScannerCameraStage.Scan) return;

    const { data: binData, isSuccess } = await fetchBin();

    setActionStage(ScannerCameraStage.Before);
    // console.log(data.bin);
    // return data.bin;
  }

  async function handleTakePhotos() {
    if (
      !cameraRef.current ||
      (actionStage !== ScannerCameraStage.Before &&
        actionStage !== ScannerCameraStage.After)
    )
      return;

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
    //invert
    // setTimeout(() => {
    //   setIsPhotoTaken(false);
    // }, 3000);

    setIsPhotoTaken(false);
  }

  async function handleSubmit() {
    if (!user) {
      await authorize({
        additionalParameters: {
          prompt: "select_account",
        },
      });
    }
    if (actionStage !== ScannerCameraStage.Finish) return;
    // I don't want to log in, so temporarily comment out for development
    // if (!user) return;

    setActionStage(ScannerCameraStage.Submit);

    const payload = await convertUriToPayload(
      // "fake-uuid-id" only for development without login
      user?.sub || "fake-id-uuid",
      photosUri[0],
      photosUri[1]
    );

    startAnalysisMutation.mutate(payload);
  }

  function handleRestart() {
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
          <View className="h-full flex justify-between items-center pb-10">
            <CameraActionStepper actionStage={actionStage} />

            <ScanCameraButton
              actionStage={actionStage}
              handleBarcodeScanned={handleBarcodeScanned}
              handleTakePhotos={handleTakePhotos}
            />

            <FinishRestartButton
              actionStage={actionStage}
              handleSubmit={handleSubmit}
              handleRestart={handleRestart}
            />

            <ProcessingSpinner actionStage={actionStage} />

            <TakenPhotosPreview photosUri={photosUri} />

            <DisposalSuccessModal
              actionStage={actionStage}
              aiResult={startAnalysisMutation.data?.result}
              affectedChallenges={affectedChallenges}
              handleRestart={handleRestart}
            />
          </View>
        </CameraView>
      )}
    </View>
  );
}
