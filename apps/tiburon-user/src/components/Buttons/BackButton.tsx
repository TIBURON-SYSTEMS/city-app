import { useRouter } from "@tanstack/react-router";
import { CircleArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.history.back()}
      className="cursor-pointer hover:underline"
    >
      <CircleArrowLeft />
    </button>
  );
}
