
import React from "react";
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Separator } from "@/components/ui/separator";
import TypographySection from "@/components/design-system/TypographySection";
import ColorsSection from "@/components/design-system/ColorsSection";
import LayoutSection from "@/components/design-system/LayoutSection";
import ComponentsSection from "@/components/design-system/ComponentsSection";
import PatternsSection from "@/components/design-system/PatternsSection";
import PrinciplesSection from "@/components/design-system/PrinciplesSection";

const DesignSystem = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default DesignSystem;
