import { Box } from "../ui/box";
import { Text } from "../ui/text";
import { HStack } from "../ui/hstack";
import { ScrollView } from "react-native";
import { VStack } from "../ui/vstack";
import { aiResultInterface } from "@/types/types";
import { Heading } from "../ui/heading";

interface DisposalResultsTableProps {
  items: aiResultInterface["detectedItems"];
}

export default function DisposalResultsTable({
  items,
}: DisposalResultsTableProps) {
  return (
    <>
      <Heading className="text-2xl text-center mb-4">Disposal Results</Heading>
      <Box className="border border-slate-900 rounded-lg overflow-hidden mb-4">
        <Box className="bg-slate-800 p-3">
          <HStack className="justify-between">
            <Box className="flex-1">
              <Text className="text-white font-bold">Disposed Product</Text>
            </Box>
            <Box className="flex-1 ml-4">
              <Text className="text-white font-bold">Material</Text>
            </Box>
            <Box className="w-20">
              <Text className="text-white font-bold text-right">Quantity</Text>
            </Box>
          </HStack>
        </Box>
        {/* table content */}
        <ScrollView className="h-44">
          <VStack>
            {items.map((item, index) => (
              <Box
                key={item.id}
                className={`p-3 border-b border-gray-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <HStack className="justify-between items-center">
                  <Box className="flex-1">
                    <Text className="font-medium">
                      {item.disposedProduct.label}
                    </Text>
                  </Box>
                  <Box className="flex-1 ml-4">
                    <Text className="text-gray-600">
                      {item.disposedProduct.material}
                    </Text>
                  </Box>
                  <Box className="w-20">
                    <Text className="text-right font-semibold">
                      {item.amount}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            ))}
          </VStack>
        </ScrollView>
      </Box>
    </>
  );
}
