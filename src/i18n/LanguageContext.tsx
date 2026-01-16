import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

import uzTranslations from "./translations/uz.json";
import ruTranslations from "./translations/ru.json";
import enTranslations from "./translations/en.json";

export type Language = "uz" | "ru" | "en";

type TranslationType = typeof uzTranslations;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: TranslationType;
}

const translations: Record<Language, TranslationType> = {
    uz: uzTranslations,
    ru: ruTranslations,
    en: enTranslations,
};

const STORAGE_KEY = "safar-travel-lang";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
            if (stored && translations[stored]) {
                return stored;
            }
        }
        return "uz";
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem(STORAGE_KEY, lang);
    };

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, language);
    }, [language]);

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
