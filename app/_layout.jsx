import { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { LocaleProvider } from "../lib/locale/locale-provider";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
    initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        ...FontAwesome.font,
        ...MaterialCommunityIcons.font,
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <LocaleProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name='index' />
                <Stack.Screen name='scanning' />
                <Stack.Screen
                    name='device-detail'
                    options={{
                        headerShown: true,
                        headerTitleAlign: "center",
                    }}
                />
            </Stack>
        </LocaleProvider>
    );
}
