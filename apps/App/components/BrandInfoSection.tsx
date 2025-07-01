import { Link, router, useLocalSearchParams } from "expo-router";
import { Text } from "./ui/text";
import { Button } from "./ui/button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Box } from "./ui/box";
import { Card } from "./ui/card";

export default function BrandInfoSection() {
  const { id } = useLocalSearchParams();

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
        <Text>I am the brand id: {id}</Text>
      </Card>
    </Box>
  );
}
