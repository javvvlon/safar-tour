import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Clock, Star, Calendar, Minus, Plus, Check } from "lucide-react";
import { format } from "date-fns";
import { useLanguage } from "../i18n/LanguageContext";
import { useToast } from "../hooks/use-toast";
import Header from "../components/Header";
import { Card, CardContent } from "../components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Label } from "../components/ui/label";
import { Calendar as CalendarComponent } from "../components/ui/calendar";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { Input } from "../components/ui/input";
import Footer from "../components/Footer";

const destinationData: Record<string, {
    images: string[];
    highlights: string[];
    included: string[];
}> = {
    "sharm-el-sheikh": {
        images: [
            "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=800&h=500&fit=crop",
        ],
        highlights: ["snorkeling", "redSea", "pyramids", "desert"],
        included: ["flight", "hotel", "transfer", "breakfast", "guide"],
    },
    "thailand": {
        images: [
            "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800&h=500&fit=crop",
        ],
        highlights: ["islands", "temples", "cuisine", "beaches"],
        included: ["flight", "hotel", "transfer", "breakfast", "visa"],
    },
    "istanbul": {
        images: [
            "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1604941729229-8ab191c0c0f8?w=800&h=500&fit=crop",
        ],
        highlights: ["bazaars", "hamam", "bosphorus", "mosques"],
        included: ["flight", "hotel", "transfer", "breakfast", "cityTour"],
    },
    "antalya": {
        images: [
            "https://images.unsplash.com/photo-1589561454226-796a8aa89b05?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1593238739364-18cfde865772?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=500&fit=crop",
        ],
        highlights: ["allInclusive", "mediterranean", "beaches", "oldTown"],
        included: ["flight", "hotel", "transfer", "allMeals", "guide"],
    },
    "dubai": {
        images: [
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1548957175-84f0f9af659e?w=800&h=500&fit=crop",
        ],
        highlights: ["burjKhalifa", "desertSafari", "shopping", "luxury"],
        included: ["flight", "hotel", "transfer", "breakfast", "cityTour"],
    },
    "vietnam": {
        images: [
            "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=500&fit=crop",
        ],
        highlights: ["halongBay", "hoi_an", "cuisine", "culture"],
        included: ["flight", "hotel", "transfer", "breakfast", "visa"],
    },
};

const Destination = () => {
    const { destination } = useParams<{ destination: string }>();
    const { t } = useLanguage();
    const { toast } = useToast();

    const [date, setDate] = useState<Date | undefined>(undefined);
    const [adults, setAdults] = useState(2);
    const [kids, setKids] = useState(0);
    const [days, setDays] = useState(7);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [selectedImage, setSelectedImage] = useState(0);

    const destKey = destination?.toLowerCase().replace(/ /g, "-") || "";
    const data = destinationData[destKey];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Get destination info from translations
    const destInfoKey = destKey.replace(/-/g, "") === "sharmelsheikh" ? "sharm" : destKey.replace(/-/g, "");
    const destInfo = t.destinations.items[destInfoKey as keyof typeof t.destinations.items];

    if (!data || !destInfo) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-4">{t.destinationPage.notFound}</h1>
                    <Link to="/">
                        <Button>{t.destinationPage.backHome}</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const handleSubmit = () => {
        if (!firstName.trim() || !lastName.trim()) {
            toast({
                title: t.destinationPage.form.errorTitle,
                description: t.destinationPage.form.errorName,
                variant: "destructive",
            });
            return;
        }

        toast({
            title: t.destinationPage.form.successTitle,
            description: t.destinationPage.form.successMessage,
        });

        // Reset form
        setDate(undefined);
        setAdults(2);
        setKids(0);
        setDays(7);
        setFirstName("");
        setLastName("");
    };

    const destinationName = destKey === "sharm-el-sheikh" ? "Sharm el Sheikh" :
        destKey.charAt(0).toUpperCase() + destKey.slice(1);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section with Main Image */}
            <section className="pt-24 pb-12 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
                <div className="container mx-auto px-4 relative z-10">
                    <Link
                        to="/#manzillar"
                        className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {t.destinationPage.backToDestinations}
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
                                <img
                                    src={data.images[selectedImage]}
                                    alt={destinationName}
                                    className="w-full h-full object-cover transition-all duration-500"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {data.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={cn(
                                            "rounded-xl overflow-hidden aspect-video transition-all",
                                            selectedImage === idx
                                                ? "ring-2 ring-primary ring-offset-2"
                                                : "opacity-70 hover:opacity-100"
                                        )}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Destination Info */}
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    {destInfo.country}
                                </div>
                                <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                                    {destinationName}
                                </h1>
                                <p className="text-muted-foreground text-lg">
                                    {destInfo.description}
                                </p>
                            </div>

                            {/* Quick Info */}
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-xl">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="font-semibold">4.8</span>
                                </div>
                                <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-xl text-secondary-foreground">
                                    <Clock className="w-4 h-4" />
                                    <span>7-14 {t.destinations.days}</span>
                                </div>
                            </div>

                            {/* Highlights */}
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-3">
                                    {t.destinationPage.highlights}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {data.highlights.map((highlight, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1.5 bg-accent text-accent-foreground rounded-full text-sm"
                                        >
                      {t.destinationPage.highlightsList[highlight as keyof typeof t.destinationPage.highlightsList] || highlight}
                    </span>
                                    ))}
                                </div>
                            </div>

                            {/* What's Included */}
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-3">
                                    {t.destinationPage.included}
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {data.included.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                                            <Check className="w-4 h-4 text-green-500" />
                                            <span>{t.destinationPage.includedList[item as keyof typeof t.destinationPage.includedList] || item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Form Section */}
            <section className="py-12 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <Card className="max-w-4xl mx-auto border-0 shadow-xl">
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                                {t.destinationPage.form.title}
                            </h2>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Date Picker */}
                                <div className="space-y-2">
                                    <Label>{t.destinationPage.form.date}</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <Calendar className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : t.destinationPage.form.selectDate}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <CalendarComponent
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                disabled={(date) => date < new Date()}
                                                initialFocus
                                                className="pointer-events-auto"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* Adults Counter */}
                                <div className="space-y-2">
                                    <Label>{t.destinationPage.form.adults}</Label>
                                    <div className="flex items-center border rounded-md">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setAdults(Math.max(1, adults - 1))}
                                            className="rounded-r-none"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </Button>
                                        <div className="flex-1 text-center font-semibold">{adults}</div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setAdults(adults + 1)}
                                            className="rounded-l-none"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Kids Counter */}
                                <div className="space-y-2">
                                    <Label>{t.destinationPage.form.kids}</Label>
                                    <div className="flex items-center border rounded-md">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setKids(Math.max(0, kids - 1))}
                                            className="rounded-r-none"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </Button>
                                        <div className="flex-1 text-center font-semibold">{kids}</div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setKids(kids + 1)}
                                            className="rounded-l-none"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Days Counter */}
                                <div className="space-y-2">
                                    <Label>{t.destinationPage.form.days}</Label>
                                    <div className="flex items-center border rounded-md">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setDays(Math.max(3, days - 1))}
                                            className="rounded-r-none"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </Button>
                                        <div className="flex-1 text-center font-semibold">{days}</div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setDays(days + 1)}
                                            className="rounded-l-none"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* First Name */}
                                <div className="space-y-2">
                                    <Label>{t.destinationPage.form.firstName}</Label>
                                    <Input
                                        placeholder={t.destinationPage.form.firstNamePlaceholder}
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>

                                {/* Last Name */}
                                <div className="space-y-2">
                                    <Label>{t.destinationPage.form.lastName}</Label>
                                    <Input
                                        placeholder={t.destinationPage.form.lastNamePlaceholder}
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-8 text-center">
                                <Button
                                    size="lg"
                                    className="px-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                                    onClick={handleSubmit}
                                >
                                    {t.destinationPage.form.submit}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Destination;
