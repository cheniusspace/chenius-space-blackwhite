
import React from "react";
import ButtonsSection from "./ButtonsSection";
import CardsSection from "./CardsSection";
import FormsSection from "./FormsSection";
import BadgesSection from "./BadgesSection";
import AlertsSection from "./AlertsSection";
import TabsSection from "./TabsSection";
import ToggleSection from "./ToggleSection";
import ProgressSection from "./ProgressSection";
import AvatarSection from "./AvatarSection";
import AccordionSection from "./AccordionSection";

const ComponentsSection = () => {
  return (
    <section id="components">
      <h2 className="text-2xl font-heading font-bold mb-6 tracking-normal">Components</h2>
      <ButtonsSection />
      <CardsSection />
      <FormsSection />
      <BadgesSection />
      <AlertsSection />
      <TabsSection />
      <ToggleSection />
      <ProgressSection />
      <AvatarSection />
      <AccordionSection />
    </section>
  );
};

export default ComponentsSection;
