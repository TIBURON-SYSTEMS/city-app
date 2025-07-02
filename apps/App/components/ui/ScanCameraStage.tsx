import React from "react";
import { Box } from "./box";
import { Text } from "./text";

interface ScanCameraStageProps {
  stage: string;
}

export default function ScanCameraStage({ stage }: ScanCameraStageProps) {
  return (
    <Box className="border-2 border-white w-1/3 rounded-md bg-purple-800/30">
      <Text className="text-center text-white">{stage}</Text>
    </Box>
  );
}
