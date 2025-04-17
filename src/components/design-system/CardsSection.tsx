
import React from "react";
import { CardGrid } from "@/components/ui/card-grid";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const CardsSection = () => {
  return (
    <div id="cards" className="mb-10">
      <h3 className="text-xl font-heading mb-4 tracking-normal">Cards</h3>
      <CardGrid columns={2}>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description text with supporting information.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content with main information displayed here. The content area can contain any UI elements.</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Submit</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <AspectRatio ratio={16 / 9}>
            <div className="flex items-center justify-center h-full bg-muted">
              <span className="text-muted-foreground">16:9 Image</span>
            </div>
          </AspectRatio>
          <CardHeader>
            <CardTitle>Media Card</CardTitle>
            <CardDescription>Card with media content</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Cards can contain various media elements and content types.</p>
          </CardContent>
        </Card>
      </CardGrid>
      <div className="mt-4 p-4 border rounded-md">
        <h4 className="text-base font-heading mb-2">Card Guidelines</h4>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Use cards to group related content and actions</li>
          <li>Maintain consistent padding within card sections</li>
          <li>Limit the number of actions in a card footer</li>
          <li>Use the CardGrid component to display multiple cards in a responsive grid</li>
        </ul>
      </div>
    </div>
  );
};

export default CardsSection;
