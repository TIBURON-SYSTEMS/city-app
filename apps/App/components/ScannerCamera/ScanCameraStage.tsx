import React from "react";
import { Box } from "../ui/box";
import { Text } from "../ui/text";
import { ScannerCameraStage } from "../../types/enums";

interface ScanCameraStageProps {
  stage: ScannerCameraStage;
  actionStage: ScannerCameraStage;
  stageText: string;
}

export default function ScanCameraStage({
  stage,
  actionStage,
  stageText,
}: ScanCameraStageProps) {
  const isActive = actionStage === stage ? "bg-white/30" : "bg-black/30";

  return (
    <Box className={`border-2 border-white w-1/3 rounded-md ${isActive}`}>
      <Text className="text-center text-white">{stageText}</Text>
    </Box>
  );
}
