import { ScannerCameraStage } from "../../types/enums";
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
  if (
    actionStage === ScannerCameraStage.Finish ||
    actionStage === ScannerCameraStage.Submit ||
    actionStage === ScannerCameraStage.End
  )
    return;

  return (
    <TouchableOpacity
      className="flex justify-center items-center w-18 h-18 bg-slate-800 rounded-full p-4"
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
