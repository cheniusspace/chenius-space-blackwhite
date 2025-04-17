import { Link } from "react-router-dom";

type CreationCardProps = {
  id: string;
  title: string;
  category: string;
  date: string;
  imageClass: string;
  image_url: string | null;
  tags?: { id: string; name: string }[];
};

export const CreationCard = ({ 
  id, 
  title, 
  category, 
  date, 
  imageClass, 
  image_url, 
  tags 
}: CreationCardProps) => {
  return (
    <Link 
      to={`/creations/${id}`} 
      className="group block"
    >
      {image_url ? (
        <div className="aspect-[4/5] mb-4 transition-transform duration-500 group-hover:scale-[0.98]">
          <img 
            src={image_url} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className={`aspect-[4/5] ${imageClass} mb-4 transition-transform duration-500 group-hover:scale-[0.98]`} />
      )}
      <h3 className="text-lg font-body font-light">{title}</h3>
      <div className="flex justify-between mt-2 text-sm text-chenius-gray-500 font-body">
        <span>{category}</span>
        <span>{date}</span>
      </div>
      {tags && tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={tag.id || index} 
              className="text-xs bg-chenius-gray-100 px-2 py-1 rounded-none font-body font-light uppercase tracking-wider"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
};
