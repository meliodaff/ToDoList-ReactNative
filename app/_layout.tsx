import UseTheme, { ThemeProvider } from "@/hooks/useTheme";
import { Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const CustomBarStyle = () => {
  const { colors } = UseTheme();
  return (
    <StatusBar barStyle={colors.statusBarStyle} backgroundColor={colors.bg} />
  );
};

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <CustomBarStyle />
        <SafeAreaProvider>
          {/*Documentation says that the code above is for safety view, lets say theres notch where the text input is displayed?  */}
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ title: "Home" }} />{" "}
            {/* we can actually delete the options object now since im hiding the header  */}
          </Stack>
        </SafeAreaProvider>
      </ThemeProvider>
    </ConvexProvider>
  );
}
