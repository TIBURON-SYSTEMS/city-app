import { View } from "react-native";
import { Image } from "../ui/image";

interface TakenPhotosPreviewProps {
  photosUri: string[];
}

export default function TakenPhotosPreview({
  photosUri,
}: TakenPhotosPreviewProps) {
  if (photosUri.length === 0) return;

  return (
    <View className="absolute left-0 bottom-0 flex flex-row px-4 gap-2">
      {photosUri.map((photoUri) => (
        <Image
          key={photoUri}
          source={{
            uri: photoUri,
          }}
          className="w-20 h-40 rounded-xl"
          resizeMode="contain"
          alt="before photo"
        />
      ))}
    </View>
  );
}
