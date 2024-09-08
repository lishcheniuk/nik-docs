import { useContext } from "react";
import { LocaleContext } from "../lib/locale/locale-context";

export function useAppLocale() {
    const localeContext = useContext(LocaleContext);

    if (!localeContext) {
        throw new Error("LocaleContext is not defined");
    }

    return localeContext;
}
