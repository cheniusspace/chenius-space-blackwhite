import { Link } from "react-router-dom";

interface TopicCardProps {
  title: string;
  icon: string;
  link: string;
}

export function TopicCard({ title, icon, link }: TopicCardProps) {
  return (
    <Link
      to={link}
      className="group relative flex items-center gap-4 p-4 bg-rich_black-900 border border-platinum-500/5 hover:border-platinum-500/10 transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-platinum-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 flex items-center gap-4">
        <div className="w-10 h-10 bg-rich_black-800 flex items-center justify-center">
          <img
            src={icon}
            alt={title}
            className="w-6 h-6 text-platinum-500"
          />
        </div>
        <h3 className="text-base font-medium text-platinum-500">{title}</h3>
      </div>
    </Link>
  );
} 