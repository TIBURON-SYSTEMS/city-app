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
    <View className="h-[40%] w-full inset-x-0 top-0 z-0 bg-slate-700/20">
      <ProgressSteps
        key={actionStage}
        activeStep={currentStep}
        isComplete={
          actionStage === ScannerCameraStage.Finish ||
          actionStage === ScannerCameraStage.Submit ||
          actionStage === ScannerCameraStage.End
        }
      >
        <ProgressStep label="🔍 QR Code" removeBtnRow>
          <View style={{ alignItems: "center" }}>
            <Text className="text-slate-900 text-lg">
              Please scan the QR code located on the bin
            </Text>
          </View>
        </ProgressStep>
        <ProgressStep label="First Picture" removeBtnRow>
          <View style={{ alignItems: "center" }}>
            <Text className="text-slate-800 mb-3 text-lg text-center">
              You are in front of 🗑️{" "}
              <Text className="font-bold text-primary-700">{binLabel}</Text> to
              recycle {binType}
            </Text>
            <Text className="text-slate-800 mb-3 text-lg text-center">
              Take a picture inside the bin, then drop in your waste
            </Text>
          </View>
        </ProgressStep>
        <ProgressStep label="Photo 2" removeBtnRow>
          <View style={{ alignItems: "center" }}>
            <Text className="text-slate-800 mb-3 text-lg text-center">
              Take a picture inside the bin once your waste is in
            </Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
}
