import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function SectionHeading({ title, description, children, className = "" }: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      <div className="flex items-center gap-4 mb-6">
        <div className="h-12 w-1 bg-white/20 rounded-full"></div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-jost font-bold tracking-tight">
          {title}
        </h2>
      </div>
      {description && (
        <div className="pl-5 border-l-2 border-white/10">
          <p className="text-lg sm:text-xl text-white/70 font-jost font-light leading-relaxed max-w-3xl">
            {description}
          </p>
        </div>
      )}
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}
