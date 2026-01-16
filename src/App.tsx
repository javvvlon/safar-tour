import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";

import Index from "./views/Index";
import { LanguageProvider } from "./i18n/LanguageContext";
import Destination from "./views/Destination";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <LanguageProvider>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/destination/:destination" element={<Destination />} />
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </LanguageProvider>
    </QueryClientProvider>
);

export default App;
