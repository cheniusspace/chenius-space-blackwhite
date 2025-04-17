import React from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Separator } from "@/components/ui/separator";
import {
  TypographySection,
  ColorsSection,
  LayoutSection,
  ComponentsSection,
  PatternsSection,
  PrinciplesSection
} from "@/components/design-system";

const DesignSystem = () => {
  return (
    <div className="px-4 md:px-6 py-12 max-w-5xl mx-auto">
      <SectionHeading
        title="Design System"
        description="A comprehensive guide to our visual language, components, and design patterns used throughout the application."
      />

      <div className="space-y-16">
        <TypographySection />
        <Separator />
        <ColorsSection />
        <Separator />
        <LayoutSection />
        <Separator />
        <ComponentsSection />
        <Separator />
        <PatternsSection />
        <Separator />
        <PrinciplesSection />
      </div>
    </div>
  );
};

export default DesignSystem;
