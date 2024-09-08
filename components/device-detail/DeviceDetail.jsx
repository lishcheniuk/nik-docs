import { useRouter } from "expo-router";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDeviceDocs } from "../../hooks/useDeviceDocs";
import { AppButton } from "../ui/AppButton";
import { DeviceDetailFields } from "./DeviceDetailFields";
import { useAppLocale } from "../../hooks/useAppLocale";

export const DeviceDetail = ({ barcode }) => {
    const router = useRouter();
    const { trans } = useAppLocale();
    const { deviceDocs, status, onDownloadDocument, deviceClass, deviceNumber, deviceYear } =
        useDeviceDocs(barcode);
    const insets = useSafeAreaInsets();

    const renderPresentedView = () => {
        return (
            <View style={[styles.presented, { paddingBottom: Math.max(insets.bottom, 10) }]}>
                <AppButton
                    label={trans("Scan new code")}
                    renderIcon={() => (
                        <MaterialCommunityIcons name='barcode-scan' size={24} color='white' />
                    )}
                    onPress={() => router.navigate("/scanning")}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {status === "loading" && (
                <View style={styles.indicatorWrap}>
                    <ActivityIndicator color={"#000000"} size='large' />
                    <Text style={{ color: "#000000", textAlign: "center" }}>
                        {trans("Search for documents")}
                    </Text>
                </View>
            )}
            {status === "error" && (
                <View style={styles.error}>
                    <Image
                        source={require("../../assets/images/no-data-found.png")}
                        resizeMode='contain'
                        style={{ width: 220, height: 220 }}
                    />
                    <Text style={{ color: "gray", textAlign: "center", width: 300 }}>
                        {trans("No documents found")}
                    </Text>
                </View>
            )}
            {status === "success" && (
                <DeviceDetailFields
                    deviceDocs={deviceDocs}
                    deviceClass={deviceClass}
                    deviceNumber={deviceNumber}
                    deviceYear={deviceYear}
                    onDownloadDocument={onDownloadDocument}
                />
            )}
            {status !== "loading" && renderPresentedView()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    indicatorWrap: {
        gap: 10,
        margin: "auto",
        alignItems: "center",
    },
    presented: {
        paddingHorizontal: 10,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
    },
    error: {
        alignItems: "center",
        margin: "auto",
        transform: [{ translateY: -70 }],
    },
});
