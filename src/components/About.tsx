import { CheckCircle, Users, Globe, Award, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

const About = () => {
    const {t} = useLanguage();

    const features = [
        t.about.features.experience,
        t.about.features.quality,
        t.about.features.prices,
        t.about.features.personal,
        t.about.features.booking,
        t.about.features.support,
    ];

    const stats = [
        {icon: Users, value: "500+", label: t.about.stats.clients},
        {icon: Globe, value: "50+", label: t.about.stats.countries},
        {icon: Award, value: "10+", label: t.about.stats.experience},
        {icon: ThumbsUp, value: "99%", label: t.about.stats.reviews},
    ];
    return (
        <section
            id="haqimizda"
            className="py-24 bg-muted/30 relative overflow-hidden"
        >
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Section */}
                    <div className="relative">
                        <div className="relative z-10">
                            <motion.img
                                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=500&fit=crop"
                                alt="Sayohat"
                                className="rounded-3xl shadow-2xl w-full"
                                whileHover={{scale: 1.02}}
                                transition={{duration: 0.3}}
                            />

                            {/* Floating Card */}
                            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl max-w-[200px]">
                                <div className="text-4xl font-bold text-primary mb-1">2+</div>
                                <div className="text-muted-foreground text-sm">
                                    {t.about.floatingCard}
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-primary/10 rounded-3xl -z-0" />
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/20 rounded-3xl -z-0" />
                    </div>

                    {/* Content Section */}
                    <div>
                        <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                          {t.about.badge}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                            {t.about.title1} <span className="text-primary">{t.about.title2}</span>
                        </h2>
                        <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                            {t.about.description1}
                        </p>
                        <p className="text-muted-foreground mb-8 leading-relaxed">
                            {t.about.description2}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-xl hover:translate-x-1 transition-transform duration-200"
                                >
                                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-foreground font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors duration-300">
                                <stat.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                                {stat.value}
                            </div>
                            <div className="text-muted-foreground text-sm">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
