import axios from "axios";

axios.defaults.timeout = 60_000;

export function getDeviceDocuments(params) {
    return axios
        .get(`${process.env.EXPO_PUBLIC_API_URL}/get_device_info`, {
            params,
        })
        .then((res) => res.data);
}
