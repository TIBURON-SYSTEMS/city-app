import { ScannerCameraStage } from "../../types/enums";
import { View } from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

interface CameraActionStepperProps {
  actionStage: ScannerCameraStage;
}

export default function CameraActionStepper({
  actionStage,
}: CameraActionStepperProps) {
  const currentStep =
    actionStage === ScannerCameraStage.Scan
      ? 0
      : actionStage === ScannerCameraStage.Before
        ? 1
        : 2;

  return (
    <View className="flex-1 w-full z-0">
      <ProgressSteps
        key={actionStage}
        activeStep={currentStep}
        isComplete={
          actionStage === ScannerCameraStage.Finish ||
          actionStage === ScannerCameraStage.Submit ||
          actionStage === ScannerCameraStage.End
        }
      >
        <ProgressStep label="Scan QR Code" removeBtnRow />
        <ProgressStep label="Photo Before" removeBtnRow />
        <ProgressStep label="Photo After" removeBtnRow />
      </ProgressSteps>
    </View>
  );
}
