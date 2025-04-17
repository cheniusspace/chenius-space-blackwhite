
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { CardGrid } from "@/components/ui/card-grid";
import { Link } from "react-router-dom";

const creationsData = [
  {
    id: 1,
    title: "Monochrome Study",
    category: "Photography",
    date: "April 2023",
    imageClass: "bg-chenius-gray-800",
  },
  {
    id: 2,
    title: "Geometric Patterns",
    category: "Illustration",
    date: "March 2023",
    imageClass: "bg-chenius-gray-300",
  },
  {
    id: 3,
    title: "Minimalist Architecture",
    category: "Photography",
    date: "February 2023",
    imageClass: "bg-chenius-gray-600",
  },
  {
    id: 4,
    title: "Typographic Explorations",
    category: "Design",
    date: "January 2023",
    imageClass: "bg-chenius-gray-700",
  },
  {
    id: 5,
    title: "Linear Compositions",
    category: "Illustration",
    date: "December 2022",
    imageClass: "bg-chenius-gray-400",
  },
  {
    id: 6,
    title: "Urban Contrasts",
    category: "Photography",
    date: "November 2022",
    imageClass: "bg-chenius-gray-900",
  },
];

const Creations = () => {
  return (
    <Layout>
      <div className="container px-4 md:px-6 max-w-7xl mx-auto py-12">
        <SectionHeading
          title="Creations"
          description="A collection of visual works, designs, and creative projects presented in monochromatic elegance."
        />

        <div className="mb-12">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            <button className="px-4 py-2 bg-black text-white rounded-full text-sm whitespace-nowrap">
              All Works
            </button>
            <button className="px-4 py-2 bg-white border border-chenius-gray-200 rounded-full text-sm whitespace-nowrap hover:bg-chenius-gray-100">
              Photography
            </button>
            <button className="px-4 py-2 bg-white border border-chenius-gray-200 rounded-full text-sm whitespace-nowrap hover:bg-chenius-gray-100">
              Illustration
            </button>
            <button className="px-4 py-2 bg-white border border-chenius-gray-200 rounded-full text-sm whitespace-nowrap hover:bg-chenius-gray-100">
              Design
            </button>
            <button className="px-4 py-2 bg-white border border-chenius-gray-200 rounded-full text-sm whitespace-nowrap hover:bg-chenius-gray-100">
              Digital Art
            </button>
          </div>
        </div>

        <CardGrid>
          {creationsData.map((item) => (
            <Link 
              key={item.id} 
              to={`#${item.id}`} 
              className="group block"
            >
              <div className={`aspect-[4/5] ${item.imageClass} mb-4 transition-transform duration-500 group-hover:scale-[0.98]`} />
              <h3 className="text-lg font-medium">{item.title}</h3>
              <div className="flex justify-between mt-2 text-sm text-chenius-gray-500">
                <span>{item.category}</span>
                <span>{item.date}</span>
              </div>
            </Link>
          ))}
        </CardGrid>
      </div>
    </Layout>
  );
};

export default Creations;
