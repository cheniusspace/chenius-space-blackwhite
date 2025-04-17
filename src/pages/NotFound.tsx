import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-8xl font-bold mb-6">404</h1>
          <p className="text-xl text-chenius-gray-500 mb-8">The page you are looking for doesn't exist.</p>
          <Link to="/" className="inline-flex items-center text-sm font-medium hover-underline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
