import ScannerCamera from "@/components/ScannerCamera/ScannerCamera";
import { SafeAreaView } from "react-native-safe-area-context";
// import { View, Text } from "react-native";

export default function Tab() {
  return (
    <SafeAreaView className="bg-white">
      <ScannerCamera />
      {/* <View className="h-full">
        <Text>Scanner</Text>
      </View> */}
    </SafeAreaView>
  );
}
