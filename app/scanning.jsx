import { StatusBar } from "expo-status-bar";
import { AppCamera } from "../components/app-camera";

export default function Page() {
    return (
        <>
            <StatusBar style='light' />
            <AppCamera />
        </>
    );
}
