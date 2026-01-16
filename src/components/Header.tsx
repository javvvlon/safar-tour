import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageSwitch from "./ui/language-switch";

const Header = () => {
    const { t } = useLanguage();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "#bosh-sahifa", label: t.nav.home },
        { href: "#xizmatlar", label: t.nav.services },
        { href: "#manzillar", label: t.nav.destinations },
        { href: "#haqimizda", label: t.nav.about },
        { href: "#aloqa", label: t.nav.contact },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out animate-fade-in ${
                isScrolled
                    ? "top-3 left-4 right-4 mx-auto max-w-6xl bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-white/50"
                    : "bg-transparent"
            }`}
        >
            <div className={`container mx-auto flex items-center justify-between transition-all duration-300 ${
                isScrolled ? "px-6 py-2" : "px-4 py-4"
            }`}>
                <div className="flex items-center gap-2">
                    <img
                        src="../logo.png"
                        alt="Safar Travel"
                        className={`w-auto transition-all duration-500 ${isScrolled ? "h-10" : "h-12"}`}
                    />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="relative text-muted-foreground hover:text-primary transition-colors font-medium group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <div className={`flex items-center gap-2 text-sm transition-all duration-300 ${isScrolled ? "hidden lg:flex" : "flex"}`}>                        <Phone className="w-4 h-4 text-primary" />
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground">{t.nav.callUs}</p>
                            <p className="font-semibold text-foreground">+998 77 265 26 00</p>
                        </div>
                    </div>
                    <LanguageSwitch />
                    <Button className={`bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-md hover:shadow-lg transition-all ${
                        isScrolled ? "px-4 py-2 text-sm" : ""
                    }`}>
                        {t.nav.planTrip}
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-2">
                    <LanguageSwitch variant="compact" />
                    <button
                        className="text-foreground p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav className="md:hidden bg-white border-t border-border overflow-hidden rounded-b-2xl animate-fade-in">
                    <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-muted-foreground hover:text-primary transition-colors font-medium py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full rounded-xl">
                            {t.nav.planTrip}
                        </Button>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;
