import { Plane, Hotel, MapPin, Headphones, CreditCard, Shield } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: {opacity: 0, y: 30},
    visible: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.5},
    },
};

const Services = () => {
    const {t} = useLanguage();

    const services = [
        {
            icon: Plane,
            title: t.services.items.flights.title,
            description: t.services.items.flights.description,
        },
        {
            icon: Hotel,
            title: t.services.items.hotels.title,
            description: t.services.items.hotels.description,
        },
        {
            icon: MapPin,
            title: t.services.items.excursions.title,
            description: t.services.items.excursions.description,
        },
        {
            icon: Headphones,
            title: t.services.items.support.title,
            description: t.services.items.support.description,
        },
        {
            icon: CreditCard,
            title: t.services.items.payment.title,
            description: t.services.items.payment.description,
        },
        {
            icon: Shield,
            title: t.services.items.insurance.title,
            description: t.services.items.insurance.description,
        },
    ];

    return (
        <section
            id="xizmatlar"
            className="py-24 bg-muted/30 relative overflow-hidden"
        >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.6}}
                >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            {t.services.badge}
          </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        {t.services.title1} <span className="text-primary">{t.services.title2}</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {t.services.description}
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true}}
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                        >
                            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2 cursor-pointer overflow-hidden">
                                <CardContent className="p-8">
                                    <div className="relative">
                                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-all duration-500 group-hover:scale-110">
                                            <service.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                                        </div>
                                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-card-foreground mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {service.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
