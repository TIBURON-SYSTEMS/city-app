import { Link, router, useLocalSearchParams } from "expo-router";
import { Text } from "./ui/text";
import { Button } from "./ui/button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Box } from "./ui/box";
import { Card } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { Image } from "./ui/image";
import { BASE_URL } from "../utils/baseUrl";

export default function RewardSection() {
  const { id } = useLocalSearchParams();

  async function getRewardById() {
    const res = await fetch(`${BASE_URL}/api/reward/${id}`);
    const data = await res.json();

    return data.reward;
  }

  const { data: reward } = useQuery({
    queryKey: ["reward"],
    queryFn: getRewardById,
  });

  if (!reward) return;

  return (
    <Box className="px-7 bg-white h-full">
      <Card className="flex flex-col py-5 px-4 mt-4 mb-4 border border-slate-300 h-full items-center">
        <Box className="flex flex-row justify-between w-full">
          <Link href="/">
            <Button
              className="w-10"
              variant="link"
              onPress={() => router.back()}
            >
              <AntDesign name="leftcircle" size={24} color="black" />
            </Button>
          </Link>
        </Box>

        <Box>
          <Box className="flex-1 bg-white px-6 pt-10">
            <Box className="flex gap-8 items-center">
              <Text className="text-2xl font-semibold text-gray-900">
                {reward.label}
              </Text>

              <Image
                source={{ uri: reward.imgUrl }}
                className="w-full h-48 rounded-xl"
                resizeMode="contain"
                alt={reward.label}
              />

              <Text className="text-center text-gray-700">
                {reward.description}
              </Text>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
