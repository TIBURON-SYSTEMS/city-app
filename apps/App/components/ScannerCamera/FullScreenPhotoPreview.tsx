import { Image } from "../ui/image";

interface FullScreenPhotoPreviewProps {
  isPhotoTaken: boolean;
  currentPhotoIndex: number | null;
  photosUri: string[];
}

export default function FullScreenPhotoPreview({
  isPhotoTaken,
  currentPhotoIndex,
  photosUri,
}: FullScreenPhotoPreviewProps) {
  if (!isPhotoTaken || currentPhotoIndex === null || photosUri.length === 0)
    return;

  return (
    <Image
      source={{
        uri: photosUri[currentPhotoIndex],
      }}
      className="w-full h-full rounded-xl"
      resizeMode="contain"
      alt="recycle photo"
    />
  );
}
