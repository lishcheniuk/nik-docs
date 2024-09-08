import { deviceClasses, deviceTypesShortNames } from "./constants";

export function isValidBarcode(barcode) {
    let isValid = true;

    if (/\D+/g.test(barcode)) {
        isValid = false;
    } else if (barcode.length < 15) {
        isValid = false;
    }

    return isValid;
}

export function getDeviceType(deviceClass) {
    let deviceType;

    for (const dType in deviceClasses) {
        const findDeviceClass = deviceClasses[dType].find(
            (dClass) => dClass === deviceClass.toString()
        );
        if (findDeviceClass) {
            deviceType = dType;
            break;
        }
    }

    return deviceType || deviceTypesShortNames.EM;
}
