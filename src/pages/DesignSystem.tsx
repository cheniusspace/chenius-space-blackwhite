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
import Layout from "@/components/layout/Layout";
import { MouseTrail } from "@/components/effects/MouseTrail";
import { RainEffect } from "@/components/ui/rain-effect";

const DesignSystem = () => {
  return (
    <Layout>
      <div className="min-h-screen w-full subtle-grid bg-black text-white">
        <MouseTrail />
        <div className="relative z-0">
          <RainEffect />
        </div>
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-5xl mx-auto">
              <div className="mb-8">
                <img 
                  src="/images/logo.png" 
                  alt="Chenius Space Logo" 
                  className="mx-auto h-32 w-auto object-contain"
                />
              </div>
            <SectionHeading
              title="Design System"
              description="A comprehensive guide to our visual language, components, and design patterns used throughout the application."
            />

              <div className="space-y-16 mt-16">
                <section className="bg-white/5 p-8 rounded-lg">
                  <TypographySection />
              </section>
                <Separator className="bg-white/10" />
                
                <section className="bg-white/5 p-8 rounded-lg">
                  <ColorsSection />
                </section>
                <Separator className="bg-white/10" />
                
                <section className="bg-white/5 p-8 rounded-lg">
                  <LayoutSection />
                </section>
                <Separator className="bg-white/10" />
                
                <section className="bg-white/5 p-8 rounded-lg">
                  <ComponentsSection />
                </section>
                <Separator className="bg-white/10" />
                
                <section className="bg-white/5 p-8 rounded-lg">
                  <PatternsSection />
              </section>
                <Separator className="bg-white/10" />
                
                <section className="bg-white/5 p-8 rounded-lg">
                  <PrinciplesSection />
              </section>
                </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DesignSystem;
