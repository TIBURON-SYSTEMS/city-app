import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  return (
    <SafeAreaView className="bg-white">
      <View className="h-full">
        <Text>Scanner</Text>
      </View>
    </SafeAreaView>
  );
}
