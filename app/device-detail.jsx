import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { DeviceDetail } from "../components/device-detail";

export default function DeviceDetailPage() {
    const { barcode } = useLocalSearchParams();

    if (!barcode) {
        return <Redirect href={"/not-found"} />;
    }

    return (
        <>
            <Stack.Screen options={{ headerTitle: barcode }} />
            <DeviceDetail barcode={barcode} />
        </>
    );
}
