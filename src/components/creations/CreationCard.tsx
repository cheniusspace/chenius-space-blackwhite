import { Link } from "react-router-dom";
import { Creation } from "@/services/creationsService";

type CreationCardProps = Creation;

export const CreationCard = ({ 
  id, 
  title, 
  date, 
  imageClass = "bg-gray-200",
  featured_image, 
  status,
  tags,
  overview
}: CreationCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'bg-white/10 text-white/70';
      case 'completed':
        return 'bg-white/20 text-white/90';
      case 'archived':
        return 'bg-white/5 text-white/50';
      default:
        return 'bg-white/10 text-white/70';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'archived':
        return 'Archived';
      default:
        return status;
    }
  };

  // Function to strip HTML tags from text
  const stripHtmlTags = (text: string) => {
    return text.replace(/<[^>]*>/g, '');
  };

  return (
    <Link 
      to={`/creations/${id}`} 
      className="group block relative overflow-hidden bg-white/5 hover:bg-white/10 transition-colors duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {featured_image ? (
          <img 
            src={featured_image} 
            alt={stripHtmlTags(title)} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full ${imageClass} transition-transform duration-500 group-hover:scale-105`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
          <span className={`text-sm tracking-widest uppercase px-2 py-1 ${getStatusColor(status)}`}>
            {getStatusText(status)}
          </span>
        </div>
        
        <h3 className="text-xl font-light mb-2">{stripHtmlTags(title)}</h3>
        
        {overview && (
          <p className="text-sm text-white/70 mb-4 line-clamp-2">
            {stripHtmlTags(overview.text)}
          </p>
        )}
        
        <div className="flex justify-between items-center text-sm text-white/50">
          <span>{new Date(date).toLocaleDateString('default', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>

        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={tag.id || index} 
                className="text-xs bg-white/10 text-white/70 px-3 py-1 rounded-none font-medium uppercase tracking-wider"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};
