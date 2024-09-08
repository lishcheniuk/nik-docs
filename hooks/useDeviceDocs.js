import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { startActivityAsync } from "expo-intent-launcher";
import { getDeviceDocuments } from "../lib/api";
import { useAppLocale } from "./useAppLocale";
import { getDeviceType } from "../lib/utils";

export function useDeviceDocs(barcode) {
    const [deviceDocs, setDeviceDocs] = useState(null);
    const [status, setStatus] = useState("idle");
    const { trans } = useAppLocale();
    const deviceClass = barcode.substring(0, 4);
    const deviceNumber = barcode.substring(4, barcode.length - 4);
    const deviceYear = barcode.substring(barcode.length - 4);

    useEffect(() => {
        const fetchDeviceDocs = async () => {
            const params = {
                device_class: deviceClass,
                device_number: deviceNumber,
                device_type: getDeviceType(deviceClass),
                format: "json",
            };
            try {
                setStatus("loading");
                const data = await getDeviceDocuments(params);
                setDeviceDocs(data);
                setStatus("success");
            } catch (error) {
                const rStatus = error.response?.status ?? 500;
                if (rStatus >= 500) {
                    Alert.alert(
                        trans("Error"),
                        trans("Something went wrong. Check your network connection and try again.")
                    );
                }
                setStatus("error");
            }
        };

        fetchDeviceDocs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deviceClass, deviceNumber]);

    const getDirectoryUri = async () => {
        const dirDocumentsUri = `${FileSystem.documentDirectory}documents/`;

        const infoDirDocuments = await FileSystem.getInfoAsync(dirDocumentsUri);
        if (!infoDirDocuments.exists) {
            await FileSystem.makeDirectoryAsync(dirDocumentsUri);
        }

        return dirDocumentsUri;
    };

    const onShareFile = async (fileUri) => {
        await Sharing.shareAsync(fileUri, {
            UTI: ".pdf",
            mimeType: "application/pdf",
        });
    };

    const onOpenFileAndroid = async (fileUri) => {
        try {
            const contentUri = await FileSystem.getContentUriAsync(fileUri);
            await startActivityAsync("android.intent.action.VIEW", {
                data: contentUri,
                flags: 1,
                type: "application/pdf",
            });
        } catch (_error) {
            await onShareFile(fileUri);
        }
    };

    const onDownloadDocument = async (fileName, pdfData) => {
        try {
            const directoryUri = await getDirectoryUri();
            const fileUri = directoryUri + fileName;

            await FileSystem.writeAsStringAsync(fileUri, pdfData, {
                encoding: FileSystem.EncodingType.Base64,
            });

            if (Platform.OS === "ios") {
                await onShareFile(fileUri);
            } else {
                await onOpenFileAndroid(fileUri);
            }
        } catch (_error) {
            Alert.alert(trans("Error"), trans("Failed to save file"));
        }
    };

    return { deviceDocs, status, onDownloadDocument, deviceClass, deviceNumber, deviceYear };
}
