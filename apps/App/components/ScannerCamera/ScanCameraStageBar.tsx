import ScanCameraStage from "./ScanCameraStage";
import { View } from "react-native";
import { ScannerCameraStage } from "../../types/enums";

interface ScanCameraStageBarProps {
  actionStage: ScannerCameraStage;
}

export default function ScanCameraStageBar({
  actionStage,
}: ScanCameraStageBarProps) {
  return (
    <View className="flex flex-row justify-between gap-4 px-10">
      <ScanCameraStage
        stage={ScannerCameraStage.Scan}
        actionStage={actionStage}
        stageText="Scan QR Code"
      />
      <ScanCameraStage
        stage={ScannerCameraStage.Before}
        actionStage={actionStage}
        stageText="Photo Before"
      />
      <ScanCameraStage
        stage={ScannerCameraStage.After}
        actionStage={actionStage}
        stageText="Photo After"
      />
    </View>
  );
}
