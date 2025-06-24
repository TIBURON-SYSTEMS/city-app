import { Text } from "@/components/ui/text";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-green-600 text-5xl">Hello</Text>
    </View>
  );
}
