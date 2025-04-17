
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Creations from "./pages/Creations";
import CreationDetail from "./pages/CreationDetail";
import Journals from "./pages/Journals";
import JournalDetail from "./pages/JournalDetail";
import Favorites from "./pages/Favorites";
import FavoriteDetail from "./pages/FavoriteDetail";
import AddContent from "./pages/AddContent";
import NotFound from "./pages/NotFound";
import DesignSystem from "./pages/DesignSystem";
import { RainSound } from "./components/ui/rain-sound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <Layout>
              <RainSound />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/creations" element={<Creations />} />
                <Route path="/creations/:id" element={<CreationDetail />} />
                <Route path="/journals" element={<Journals />} />
                <Route path="/journals/:id" element={<JournalDetail />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/favorites/:id" element={<FavoriteDetail />} />
                <Route path="/add-content" element={<AddContent />} />
                <Route path="/design-system" element={<DesignSystem />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
