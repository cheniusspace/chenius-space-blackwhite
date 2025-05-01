
import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function SectionHeading({ title, description, children, className = "" }: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${className}`}>
      <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-normal mb-6">{title}</h2>
      {description && (
        <p className="mt-4 text-xl md:text-2xl text-chenius-gray-500 font-body font-light leading-relaxed tracking-wide max-w-3xl">
          {description}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
