
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
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-normal mb-4 md:mb-6">{title}</h2>
      {description && (
        <p className="mt-3 md:mt-4 text-lg sm:text-xl md:text-2xl text-chenius-gray-500 font-body font-light leading-relaxed tracking-wide max-w-3xl mx-auto md:mx-0">
          {description}
        </p>
      )}
      {children && <div className="mt-5 md:mt-6">{children}</div>}
    </div>
  );
}
