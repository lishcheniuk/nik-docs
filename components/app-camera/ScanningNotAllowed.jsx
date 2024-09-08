import { Image, StyleSheet, Text, View } from "react-native";
import * as Linking from "expo-linking";
import { useAppFocus } from "../../hooks/useAppFocus";
import { useAppLocale } from "../../hooks/useAppLocale";
import { AppButton } from "../ui/AppButton";

export const ScanningNotAllowed = ({ onFocus }) => {
    const { trans } = useAppLocale();

    useAppFocus(() => {
        onFocus();
    });

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/images/favicon.png")}
                resizeMode='contain'
                style={styles.logo}
            />
            <Text style={styles.message}>
                {trans("The application requires permission to use the camera")}
            </Text>
            <AppButton
                label={trans("Open settings")}
                onPress={() => Linking.openSettings()}
                style={{ marginTop: 30 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    message: {
        textAlign: "center",
        fontSize: 16,
    },
    logo: {
        width: 100,
        height: 100,
    },
});
