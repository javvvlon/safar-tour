import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Destinations from "../components/Destinations";
import About from "../components/About";
import Footer from "../components/Footer";

const Index = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <Hero />
            <Services />
            <Destinations />
            <About />
            <Footer />
        </div>
    );
};

export default Index;
