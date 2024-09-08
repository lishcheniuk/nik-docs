import { CameraView, useCameraPermissions } from "expo-camera";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { CameraMask } from "./CameraMask";
import { isValidBarcode } from "../../lib/utils";
import { useAppLocale } from "../../hooks/useAppLocale";
import { ScanningNotAllowed } from "./ScanningNotAllowed";

export const AppCamera = () => {
    const router = useRouter();
    const [permission, requestPermission] = useCameraPermissions();
    const isDisabledScanning = useRef(false);
    const [isAskedPermission, setIsAskedPermission] = useState(false);
    const { trans } = useAppLocale();

    const onRequestPermission = useCallback(() => {
        if (isAskedPermission) return;

        requestPermission().then(() => {
            setIsAskedPermission(true);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAskedPermission]);

    useEffect(() => {
        onRequestPermission();
    }, [onRequestPermission]);

    const onBarcodeScanned = (scanningResult) => {
        if (isDisabledScanning.current) {
            return;
        }
        isDisabledScanning.current = true;
        const barcode = scanningResult.data;

        if (!isValidBarcode(barcode)) {
            Alert.alert(
                trans("Error"),
                trans("Invalid barcode"),
                [
                    {
                        text: "OK",
                        onPress: () => (isDisabledScanning.current = false),
                    },
                ],
                {
                    cancelable: false,
                }
            );
            return;
        }

        router.replace({
            pathname: "/device-detail",
            params: {
                barcode,
            },
        });
    };

    if (!permission) {
        return <View />;
    }

    if (!permission.granted && isAskedPermission) {
        return <ScanningNotAllowed onFocus={() => setIsAskedPermission(false)} />;
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr", "code128"],
                }}
                facing='back'
                onBarcodeScanned={onBarcodeScanned}
            >
                <CameraMask />
            </CameraView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
});
