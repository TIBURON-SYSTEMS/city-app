import { Link, router, useLocalSearchParams } from "expo-router";
import { Text } from "./ui/text";
import { Button } from "./ui/button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Box } from "./ui/box";
import { Card } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { Image } from "./ui/image";
import { BASE_URL } from "../utils/baseUrl";

export default function BrandInfoSection() {
  const { id } = useLocalSearchParams();

  async function getBrandInfo() {
    const res = await fetch(`${BASE_URL}/api/brand/${id}`);
    const data = await res.json();

    return data.brand;
  }

  const { data: brand } = useQuery({
    queryKey: ["brand"],
    queryFn: getBrandInfo,
  });

  if (!brand) return;

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
                {brand.name}
              </Text>

              <Image
                source={{ uri: brand.imgUrl }}
                className="w-full h-48 rounded-xl"
                resizeMode="contain"
                alt={brand.name}
              />

              <Text className="text-center text-gray-700">
                {brand.description}
              </Text>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
