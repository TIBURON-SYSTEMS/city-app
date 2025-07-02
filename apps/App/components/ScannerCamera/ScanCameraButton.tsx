import { ScannerCameraStage } from "@/types/enums";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";

interface ScanCameraButtonProps {
  actionStage: ScannerCameraStage;
  handleBarcodeScanned: () => void;
  handleTakePhotos: () => void;
}

export default function ScanCameraButton({
  actionStage,
  handleBarcodeScanned,
  handleTakePhotos,
}: ScanCameraButtonProps) {
  return (
    <TouchableOpacity
      className="flex justify-center items-center w-18 h-18 bg-purple-800/30 rounded-md p-1"
      onPress={
        actionStage === ScannerCameraStage.Scan
          ? handleBarcodeScanned
          : handleTakePhotos
      }
    >
      {actionStage === ScannerCameraStage.Scan && (
        <AntDesign name="scan1" size={48} color="white" />
      )}

      {(actionStage === ScannerCameraStage.Before ||
        actionStage === ScannerCameraStage.After) && (
        <AntDesign name="camera" size={48} color="white" />
      )}
    </TouchableOpacity>
  );
}
