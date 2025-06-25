import { Link, router } from "expo-router";
import { Badge, BadgeText } from "./ui/badge";
import { Box } from "./ui/box";
import { Button, ButtonText } from "./ui/button";
import { Card } from "./ui/card";
import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import AntDesign from "@expo/vector-icons/AntDesign";

const challenge = {
  id: "1",
  label: "Where is my jet",
  status: "published",
  goal: 100,
  brandId: "1",
  brand: "PepsiCo",
  description:
    "Join PepsiCo's recycling challenge and make a difference for our planet! Recycle 100 Pepsi cans to unlock amazing rewards and help create a more sustainable future. Collect empty cans from your daily consumption and bring them to participating recycling centers. Track your progress and watch your environmental impact grow with each recycled container!",
  rewards: ["A dream jet", "Pepsi tshirt"],
  product: "Pepsi can",
  user: {
    id: "1",
    email: "arnaud.obri@gmail.com",
  },
  amount: 45,
};

export default function ChallengeDetailsCard() {
  return (
    <Box className="px-7 bg-white h-full">
      <Card className="flex flex-col py-5 px-4 mt-4 mb-4 border border-slate-300 h-full items-center">
        <Box className="flex gap-4">
          <Link href="/">
            <Button
              className="w-10"
              variant="link"
              onPress={() => router.back()}
            >
              <AntDesign name="leftcircle" size={24} color="black" />
            </Button>
          </Link>

          <Box>
            <Heading className="uppercase text-slate-900">
              <Text>{challenge.label}</Text>
            </Heading>
            <Text>by {challenge.brand}</Text>
          </Box>
          <Box>
            <Heading className="text-slate-900 text-base font-semibold">
              <Text>Description</Text>
            </Heading>
            <Text className="text-slate-800">{challenge.description}</Text>
          </Box>
          <Box>
            <Heading className="text-slate-900 text-base font-semibold mb-1">
              <Text>Rewards</Text>
            </Heading>
            <HStack className="gap-2 ">
              {challenge.rewards.map((reward, index, array) => {
                return (
                  <Badge
                    variant="outline"
                    className="bg-slate-100/80 rounded-xl"
                    key={reward}
                  >
                    <BadgeText>{reward}</BadgeText>
                  </Badge>
                );
              })}
            </HStack>
          </Box>
        </Box>
        <Box className="mt-20">
          <Button className="rounded-full">
            <ButtonText>Participate</ButtonText>
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
