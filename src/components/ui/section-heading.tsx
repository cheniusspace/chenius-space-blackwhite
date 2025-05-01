import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function SectionHeading({ title, description, children, className = "" }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-normal">{title}</h2>
      {description && (
        <p className="mt-4 text-xl text-chenius-gray-500 font-body font-light leading-relaxed tracking-wide max-w-prose">
          {description}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
