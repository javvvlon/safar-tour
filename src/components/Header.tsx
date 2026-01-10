import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
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
        { href: "#bosh-sahifa", label: "Bosh sahifa" },
        { href: "#xizmatlar", label: "Xizmatlar" },
        { href: "#manzillar", label: "Manzillar" },
        { href: "#haqimizda", label: "Biz haqimizda" },
        { href: "#aloqa", label: "Aloqa" },
    ];

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
                isScrolled
                    ? "top-3 left-4 right-4 mx-auto max-w-6xl bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-white/50"
                    : "bg-transparent"
            }`}
        >
            <div className={`container mx-auto flex items-center justify-between transition-all duration-500 ${
                isScrolled ? "px-6 py-2" : "px-4 py-4"
            }`}>
                <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                >
                    <img
                        src="./logo.png"
                        alt="Safar Travel"
                        className={`w-auto transition-all duration-500 ${isScrolled ? "h-10" : "h-12"}`}
                    />
                </motion.div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link.href}
                            href={link.href}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * index }}
                            className="relative text-muted-foreground hover:text-primary transition-colors font-medium group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                        </motion.a>
                    ))}
                </nav>

                {/* Phone + CTA */}
                <div className="hidden md:flex items-center gap-6">
                    <div className={`flex items-center gap-2 text-sm transition-all duration-500 ${isScrolled ? "hidden lg:flex" : "flex"}`}>
                        <Phone className="w-4 h-4 text-primary" />
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground">Qo'ng'iroq qiling</p>
                            <p className="font-semibold text-foreground">+998 77 265 26 00</p>
                        </div>
                    </div>
                    <Button className={`bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-md hover:shadow-lg transition-all ${
                        isScrolled ? "px-4 py-2 text-sm" : ""
                    }`}>
                        Sayohat rejalashtiring
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-foreground p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white border-t border-border overflow-hidden rounded-b-2xl"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="text-muted-foreground hover:text-primary transition-colors font-medium py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full rounded-xl">
                                Sayohat rejalashtiring
                            </Button>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;
