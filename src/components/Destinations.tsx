import { MapPin, Clock, Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const destinations = [
    {
        name: "Sharm el Sheikh",
        country: "Misr",
        image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=600&h=400&fit=crop",
        price: "450",
        duration: "7 kun",
        rating: 4.8,
        description: "Qizil dengiz sohilida go'zal kurortlar, snorkling va suv osti olamini kashf eting.",
        hot: true,
    },
    {
        name: "Tailand",
        country: "Tailand",
        image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&h=400&fit=crop",
        price: "850",
        duration: "10 kun",
        rating: 4.9,
        description: "Tropik orollar, ekzotik oshxona va boy madaniyat bilan tanishing.",
        hot: false,
    },
    {
        name: "Turkiya",
        country: "Turkiya",
        image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&h=400&fit=crop",
        price: "350",
        duration: "7 kun",
        rating: 4.7,
        description: "O'rta er dengizi sohili, tarixiy joylar va mazali turkcha taomlari.",
        hot: true,
    },
    {
        name: "Dubai",
        country: "BAA",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop",
        price: "750",
        duration: "5 kun",
        rating: 4.9,
        description: "Zamonaviy me'morchilik, hashamatli savdo markazlari va cho'l safarilari.",
        hot: false,
    },
    {
        name: "Vietnam",
        country: "Vetnam",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&h=400&fit=crop",
        price: "700",
        duration: "12 kun",
        rating: 4.8,
        description: "Chiroyli tabiat, tarixiy shaharlar va o'ziga xos Osiyo madaniyati.",
        hot: false,
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
    },
};

const Destinations = () => {
    return (
        <section id="manzillar" className="py-24 bg-background relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl -translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Mashhur yo'nalishlar
            </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                            Mashhur <span className="text-primary">yo'nalishlar</span>
                        </h2>
                        <p className="text-muted-foreground max-w-xl text-lg">
                            Bizning eng ko'p sotilgan sayohat yo'nalishlari bilan tanishing
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        className="mt-6 md:mt-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl group"
                    >
                        Barcha yo'nalishlar
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {destinations.map((destination, index) => (
                        <motion.div key={index} variants={cardVariants}>
                            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white hover:-translate-y-3 cursor-pointer">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={destination.image}
                                        alt={destination.name}
                                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Price Badge */}
                                    <div className="absolute top-4 right-4 bg-white text-foreground px-4 py-2 rounded-xl text-lg font-bold shadow-lg">
                                        ${destination.price}
                                    </div>

                                    {/* Hot Badge */}
                                    {destination.hot && (
                                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase animate-pulse">
                                            🔥 Mashhur
                                        </div>
                                    )}

                                    {/* Rating */}
                                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 shadow-lg">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        <span className="font-bold">{destination.rating}</span>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        {destination.country}
                                    </div>
                                    <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                                        {destination.name}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                        {destination.description}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-border">
                                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                            <Clock className="w-4 h-4" />
                                            {destination.duration}
                                        </div>
                                        <Button
                                            size="sm"
                                            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl group/btn"
                                        >
                                            Batafsil
                                            <ArrowRight className="ml-1 w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Destinations;
