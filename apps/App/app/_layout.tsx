import { Stack } from "expo-router";
import { Auth0Provider } from "react-native-auth0";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <Auth0Provider
          domain={"dev-xdrciyamtkwtk3qm.eu.auth0.com"}
          clientId={"1ZKBYXr1cpqA2fZE1Ba4pXXJuTF6NX9h"}
        >
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="details" options={{ headerShown: false }} />
          </Stack>
        </Auth0Provider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
