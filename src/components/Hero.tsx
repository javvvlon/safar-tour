import { ArrowRight, Plane, Hotel, Calendar, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../i18n/LanguageContext";

const Hero = () => {
    const {t} = useLanguage();

    const features = [
        {icon: Plane, label: t.hero.features.allInclusive},
        {icon: Hotel, label: t.hero.features.hotels},
        {icon: Calendar, label: t.hero.features.flexibleDates},
        {icon: DollarSign, label: t.hero.features.fixedPrice},
    ];

    return (
        <section
            id="bosh-sahifa"
            className="min-h-screen relative overflow-hidden pt-20"
        >
            {/* Sky Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: `linear-gradient(180deg, 
            hsl(210 60% 95%) 0%, 
            hsl(210 50% 90%) 30%,
            hsl(200 60% 88%) 60%,
            hsl(210 40% 92%) 100%
          )`,
                }}
            />

            {/* Cloud Effects */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-20 -left-20 w-96 h-40 bg-white/80 rounded-full blur-3xl" />
                <div className="absolute top-40 right-0 w-[500px] h-48 bg-white/70 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-1/4 w-[600px] h-60 bg-white/90 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-40 bg-white/80 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[70vh]">
                    {/* Left Content */}
                    <div className="text-left animate-fade-in">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                            {t.hero.title1}
                            <br />
                            <span className="text-primary">{t.hero.title2}</span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
                            {t.hero.description}
                        </p>

                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-7 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                            {t.hero.findTour}
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>

                    {/* Right Content - Airplane */}
                    <div
                        className="relative animate-fade-in"
                        style={{animationDelay: "0.2s"}}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop"
                            alt="Airplane"
                            className="w-full max-w-2xl mx-auto drop-shadow-2xl rounded-3xl"
                        />

                        {/* Floating Badge - static on mobile */}
                        <div className="absolute top-4 right-4 lg:top-8 lg:right-0 bg-foreground text-background rounded-full w-20 h-20 lg:w-24 lg:h-24 flex flex-col items-center justify-center shadow-xl">
                            <span className="text-2xl lg:text-3xl font-bold">50+</span>
                            <span className="text-xs lg:text-sm">{t.hero.countries}</span>
                        </div>
                    </div>
                </div>

                {/* Feature Icons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 lg:mt-0">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-fade-in"
                            style={{animationDelay: `${0.3 + index * 0.1}s`}}
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                <feature.icon className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-foreground font-medium text-center text-sm">
                {feature.label}
              </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Gradient Fade */
            }
            <div
                className="absolute bottom-0 left-0 right-0 h-32 z-10"
                style={{
                    background: "linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 100%)",
                }}
            />
            ;
        </section>
    )
        ;
};

export default Hero;
