import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Layout from "@/components/layout/Layout";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Creations from "@/pages/Creations";
import Creation from "@/pages/Creation";
import AddCreation from "@/pages/AddCreation";
import Journals from "@/pages/Journals";
import Journal from "@/pages/Journal";
import AddJournal from "@/pages/AddJournal";
import Favorites from "@/pages/Favorites";
import DesignSystem from "@/pages/DesignSystem";
import NotFound from "@/pages/NotFound";

function App() {
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      } else if (event === 'SIGNED_OUT') {
        toast({
          title: "Goodbye!",
          description: "You have been signed out.",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  return (
    <Router>
      <ThemeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/creations" element={<Creations />} />
            <Route path="/creations/new" element={<AddCreation />} />
            <Route path="/creations/:id" element={<Creation />} />
            <Route path="/journals" element={<Journals />} />
            <Route path="/journals/new" element={<AddJournal />} />
            <Route path="/journals/:id" element={<Journal />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/design-system" element={<DesignSystem />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </ThemeProvider>
      <Toaster />
    </Router>
  );
}

export default App;
