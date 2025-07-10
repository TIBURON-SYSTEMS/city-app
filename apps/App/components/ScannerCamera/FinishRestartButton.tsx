import { View } from "react-native";
import { Button, ButtonText } from "../ui/button";
import { ScannerCameraStage } from "@/types/enums";

interface FinishRestartButtonProps {
  actionStage: ScannerCameraStage;
  handleSubmit: () => void;
  handleRestart: () => void;
}

export default function FinishRestartButton({
  actionStage,
  handleSubmit,
  handleRestart,
}: FinishRestartButtonProps) {
  return (
    actionStage === ScannerCameraStage.Finish && (
      <View className="absolute top-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-6">
        <Button
          className="bg-black rounded-full border border-white"
          onPress={handleSubmit}
        >
          <ButtonText>Start Analysis</ButtonText>
        </Button>

        <Button
          className="bg-black rounded-full border border-white"
          onPress={handleRestart}
        >
          <ButtonText>Restart</ButtonText>
        </Button>
      </View>
    )
  );
}
