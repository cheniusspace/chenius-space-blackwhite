import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Creations from "./pages/Creations";
import Journals from "./pages/Journals";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import DesignSystem from "./pages/DesignSystem";
import Dashboard from "./pages/Dashboard";
import CreationDetail from "./pages/CreationDetail";
import AddContent from "./pages/AddContent";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Toaster } from "./components/ui/toaster";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/creations" element={<Creations />} />
            <Route path="/creations/:id" element={<CreationDetail />} />
            <Route path="/journals" element={<Journals />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/design-system" element={<DesignSystem />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/add-content" 
              element={
                <ProtectedRoute>
                  <AddContent />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
