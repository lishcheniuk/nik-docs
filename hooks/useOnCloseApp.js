import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";

export function useOnCloseApp() {
    const router = useRouter();

    useEffect(() => {
        const onBackPress = () => {
            if (router.canGoBack()) {
                return false;
            }

            Alert.alert(
                "",
                "Вийти з застосунку?",
                [
                    {
                        text: "Скасувати",
                        onPress: () => null,
                        style: "cancel",
                    },
                    { text: "Так", onPress: () => BackHandler.exitApp() },
                ],
                { cancelable: false }
            );

            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", onBackPress);

        return () => backHandler.remove();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
