export const deviceTypesShortNames = {
    EM: "em",
    TRANS: "trans",
    KS: "ks",
    AGSM: "agsm",
    HM: "hm",
    WM: "wm",
    KO: "ko",
    AMBUS: "ambus",
    KK: "KK",
};

export const deviceTypes = {
    [deviceTypesShortNames.EM]: "Electricity meter",
    [deviceTypesShortNames.TRANS]: "Transformers",
    [deviceTypesShortNames.KS]: "Data collection controllers",
    [deviceTypesShortNames.AGSM]: "GSM communication modules",
    [deviceTypesShortNames.HM]: "Heat meters",
    [deviceTypesShortNames.WM]: "Water meters",
    [deviceTypesShortNames.KO]: "Cabinets of data collection controllers",
    [deviceTypesShortNames.AMBUS]: "A-MBus communication modules",
    [deviceTypesShortNames.KK]: "Communication controllers",
};

export const deviceClasses = {
    [deviceTypesShortNames.EM]: ["2100", "2102", "2104", "2300", "2301", "2303", "2307", "2308"],
    [deviceTypesShortNames.HM]: ["7071"],
    [deviceTypesShortNames.WM]: ["7011", "7021"],
    [deviceTypesShortNames.KS]: ["1001"],
    [deviceTypesShortNames.AGSM]: ["0201"],
    [deviceTypesShortNames.KO]: ["0405", "8041"],
    [deviceTypesShortNames.AMBUS]: ["8031"],
    [deviceTypesShortNames.KK]: ["0310"],
};
