import { useLocales } from "expo-localization";
import translations from "./translations";
import { LocaleContext } from "./locale-context";

export const LocaleProvider = ({ children }) => {
    const defaultLang = "en";
    const languageCode = useLocales()[0].languageCode;

    const trans = (key) => {
        const lang = translations[languageCode] || translations[defaultLang];
        return lang[key] ?? key;
    };

    return (
        <LocaleContext.Provider value={{ trans, languageCode }}>{children}</LocaleContext.Provider>
    );
};
