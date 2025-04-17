
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const AccordionSection = () => {
  return (
    <div id="accordion" className="mb-10">
      <h3 className="text-xl font-heading mb-4 tracking-normal">Accordion</h3>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is this a design system?</AccordionTrigger>
          <AccordionContent>
            Yes. This page showcases the various UI components, typography, and colors used throughout the website.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>What fonts are being used?</AccordionTrigger>
          <AccordionContent>
            Viga is used for headings, providing a modern, clean aesthetic. Saira Semi Condensed is used for body text, offering a readable and balanced style.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Are these components customizable?</AccordionTrigger>
          <AccordionContent>
            Yes. All components are built with Tailwind CSS and can be easily customized by adjusting their class names or creating variants.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="mt-4 p-4 border rounded-md">
        <h4 className="text-base font-heading mb-2">Accordion Guidelines</h4>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Use accordions to organize content that doesn't need to be visible all at once</li>
          <li>Write clear, concise headers that indicate the content within</li>
          <li>Consider whether the content is better suited to tabs or accordions</li>
          <li>Allow multiple sections to be open simultaneously when appropriate</li>
        </ul>
      </div>
    </div>
  );
};

export default AccordionSection;
