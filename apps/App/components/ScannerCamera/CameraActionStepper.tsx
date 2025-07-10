import { ScannerCameraStage } from "../../types/enums";
import { View } from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { Text } from "../ui/text";

interface CameraActionStepperProps {
  actionStage: ScannerCameraStage;
  binLabel: string | undefined;
  binType: string | undefined;
}

export default function CameraActionStepper({
  actionStage,
  binLabel,
  binType,
}: CameraActionStepperProps) {
  const currentStep =
    actionStage === ScannerCameraStage.Scan
      ? 0
      : actionStage === ScannerCameraStage.Before
        ? 1
        : 2;

  return (
    <View className="h-[230px] w-full z-0 blur-3xl bg-slate-700/40">
      <ProgressSteps
        key={actionStage}
        activeStep={currentStep}
        isComplete={
          actionStage === ScannerCameraStage.Finish ||
          actionStage === ScannerCameraStage.Submit ||
          actionStage === ScannerCameraStage.End
        }
      >
        <ProgressStep label="Scan QR Code" removeBtnRow>
          <View style={{ alignItems: "center" }}>
            <Text className="text-white">
              Scan the QR code of the bin you want to use
            </Text>
          </View>
        </ProgressStep>
        <ProgressStep label="Photo 1" removeBtnRow>
          <View style={{ alignItems: "center" }}>
            <Text className="text-slate-800 mb-3">
              Take a picture before discarding your items
            </Text>
            <Text className="text-slate-800">
              {`You are using 🗑️ ${binLabel} of type ${binType}`}
            </Text>
          </View>
        </ProgressStep>
        <ProgressStep label="Photo 2" removeBtnRow>
          <View style={{ alignItems: "center" }}>
            <Text className="text-white">
              Take a picture after discarding your items
            </Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
}
