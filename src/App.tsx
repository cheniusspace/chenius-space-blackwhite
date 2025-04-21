import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Creations from "./pages/Creations";
import Journals from "./pages/Journals";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import DesignSystem from "./pages/DesignSystem";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/creations" element={<Creations />} />
            <Route path="/journals" element={<Journals />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/design-system" element={<DesignSystem />} />
          </Routes>
        </Layout>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
