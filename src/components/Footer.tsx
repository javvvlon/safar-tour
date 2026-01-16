import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

const Footer = () => {
    const { t } = useLanguage();

    const contactInfo = [
        { icon: Phone, label: t.footer.phone, values: ["+998 (77) 265 26 00"] },
        { icon: Mail, label: t.footer.email, values: ["info@safartravel.uz"] },
        { icon: MapPin, label: t.footer.address, values: ["Farg'ona sh., Burxoniddin Marg'iloniy, 46A-uy"] },
        { icon: Clock, label: t.footer.workHours, values: [t.footer.weekdays, t.footer.weekend] },
    ];

    return (
        <footer
            id="aloqa"
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden"
        >
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

            {/* Contact Section */}
            <div className="py-20 relative z-10">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="mb-12"
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.6}}
                    >
                        <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
                          {t.footer.badge}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            {t.footer.title1} <span className="text-primary">{t.footer.title2}</span>
                        </h2>
                        <p className="text-white/60 max-w-xl text-lg">
                            {t.footer.description}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {contactInfo.map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex items-start gap-4 group"
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{duration: 0.4, delay: index * 0.1}}
                            >
                                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                                    <item.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
                                </div>
                                <div>
                                    <p className="text-white/50 text-sm mb-1">{item.label}</p>
                                    {item.values.map((value, i) => (
                                        <p
                                            key={i}
                                            className="font-medium"
                                        >{value}</p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Social Media */}
                    <motion.div
                        className="mt-12 pt-8 border-t border-white/10"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        viewport={{once: true}}
                        transition={{duration: 0.6, delay: 0.4}}
                    >
                        <p className="text-white/50 text-sm mb-4">{t.footer.socialMedia}</p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Youtube, Send].map((Icon, index) => (
                                <motion.a
                                    key={index}
                                    href="#"
                                    className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary transition-all duration-300 group"
                                    whileHover={{y: -3, scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                >
                                    <Icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/10 py-6 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <img
                                src="/logo.png"
                                alt="Safar Travel"
                                className="h-10 w-auto bg-white rounded-lg p-1"
                            />
                        </div>
                        <p className="text-white/50 text-sm text-center">
                            {t.footer.copyright}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
