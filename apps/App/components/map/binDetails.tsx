import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { Bin } from "@/types/types";
import { Linking, Pressable, View } from "react-native";

type BinCardDetailsProps = {
  bin: Bin;
  onClose: () => void;
};

export function BinCardDetails({ bin, onClose }: BinCardDetailsProps) {
  const handleOpenMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${bin.latitude},${bin.longitude}`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open Google Maps", err)
    );
  };

  return (
    <View className="bg-white rounded-2xl shadow-lg border border-gray-100 w-[280px] overflow-hidden">
      {/* Header with close button */}
      <View className="bg-primary-500 px-4 py-3 flex-row justify-between items-center">
        <Text className="text-white font-bold text-lg flex-1" numberOfLines={1}>
          {bin.label}
        </Text>
        <Pressable
          onPress={onClose}
          className="ml-2 w-8 h-8 rounded-full bg-white/20 items-center justify-center"
        >
          <Text className="text-white text-lg">✕</Text>
        </Pressable>
      </View>

      {/* Content */}
      <View className="p-4 space-y-3">
        {/* Bin Type */}
        <View className="flex-row items-center">
          <View className="w-2 h-2 rounded-full bg-primary-500 mr-3" />
          <Text className="text-gray-600 text-sm">Type:</Text>
          <Text className="text-gray-900 font-medium ml-2 capitalize">
            {bin.type}
          </Text>
        </View>

        {/* Location */}
        <View className="flex-row items-center">
          <View className="w-2 h-2 rounded-full bg-gray-400 mr-3" />
          <Text className="text-gray-600 text-sm">Location:</Text>
          <Text
            className="text-gray-900 font-mono text-xs ml-2 flex-1"
            numberOfLines={1}
          >
            {bin.latitude.toFixed(4)}, {bin.longitude.toFixed(4)}
          </Text>
        </View>

        {/* Directions Button */}
        <Pressable
          onPress={handleOpenMaps}
          className="bg-blue-500 rounded-lg py-3 px-4 flex-row items-center justify-center mt-4 active:bg-blue-600"
        >
          <Text className="text-white font-semibold mr-2">Get Directions</Text>
          <Text className="text-white">🧭</Text>
        </Pressable>
      </View>
    </View>
  );
}
