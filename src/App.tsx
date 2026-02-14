import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UUIDProvider } from "./context/UUIDProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppMain from "@/components/AppMain";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient();

// Wrapper to handle onBack prop
const AppMainWrapper = () => {
  const navigate = useNavigate();
  return <AppMain onBack={() => navigate("/")} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UUIDProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/chat" element={<AppMainWrapper />} />
            <Route path="/chat/:contactId" element={<AppMainWrapper />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UUIDProvider>
  </QueryClientProvider>
);

export default App;
