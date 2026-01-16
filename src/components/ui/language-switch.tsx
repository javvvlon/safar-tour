import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import { type Language, useLanguage } from "../../i18n/LanguageContext";

const languages: { code: Language; label: string; flag: string }[] = [
    { code: "uz", label: "O'zbekcha", flag: "🇺🇿" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "en", label: "English", flag: "🇬🇧" },
];

interface LanguageSwitchProps {
    variant?: "default" | "compact";
}

const LanguageSwitch = ({ variant = "default" }: LanguageSwitchProps) => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLang = languages.find((l) => l.code === language) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (code: Language) => {
        setLanguage(code);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className="relative">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border border-border/50 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-primary/30 transition-all duration-300 ${
                    variant === "compact" ? "px-2 py-1.5" : ""
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <span className="text-lg">{currentLang.flag}</span>
                {variant === "default" && (
                    <>
            <span className="text-sm font-medium text-foreground hidden sm:inline">
              {currentLang.code.toUpperCase()}
            </span>
                        <ChevronDown
                            className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        />
                    </>
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-border/50 overflow-hidden z-50 min-w-[160px]"
                    >
                        {languages.map((lang, index) => (
                            <motion.button
                                key={lang.code}
                                onClick={() => handleSelect(lang.code)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-primary/5 transition-colors ${
                                    language === lang.code ? "bg-primary/10" : ""
                                } ${index !== languages.length - 1 ? "border-b border-border/30" : ""}`}
                                whileHover={{ x: 4 }}
                            >
                                <span className="text-lg">{lang.flag}</span>
                                <span
                                    className={`text-sm font-medium ${
                                        language === lang.code ? "text-primary" : "text-foreground"
                                    }`}
                                >
                  {lang.label}
                </span>
                                {language === lang.code && (
                                    <motion.div
                                        layoutId="activeLang"
                                        className="ml-auto w-2 h-2 bg-primary rounded-full"
                                    />
                                )}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitch;
