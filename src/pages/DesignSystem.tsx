
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { CardGrid } from "@/components/ui/card-grid";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertCircle, Check, Info, Plus, AlertTriangle } from "lucide-react";

const DesignSystem = () => {
  const [progressValue, setProgressValue] = useState(45);

  return (
    <Layout>
      <div className="container px-4 md:px-6 max-w-5xl mx-auto py-12">
        <SectionHeading
          title="Design System Journal"
          description="A comprehensive documentation of the design elements, components, and patterns used throughout the website."
        />

        <div className="space-y-16">
          {/* Typography Section */}
          <section id="typography">
            <h2 className="text-2xl font-heading font-bold mb-6 tracking-wider">Typography</h2>
            <div className="space-y-6">
              <div className="p-6 border">
                <h1 className="font-heading tracking-wider">Heading 1 - Orbitron</h1>
                <h2 className="font-heading tracking-wider">Heading 2 - Orbitron</h2>
                <h3 className="font-heading tracking-wider">Heading 3 - Orbitron</h3>
                <h4 className="font-heading tracking-wider">Heading 4 - Orbitron</h4>
                <h5 className="font-heading tracking-wider">Heading 5 - Orbitron</h5>
                <h6 className="font-heading tracking-wider">Heading 6 - Orbitron</h6>
              </div>
              
              <div className="p-6 border">
                <p className="font-body text-lg mb-4 tracking-wide leading-relaxed">
                  Body Text (Large) - Roboto Mono: This is an example of the primary body text used for paragraphs and general content. 
                  The font is designed for readability while maintaining a modern, technical aesthetic.
                </p>
                <p className="font-body text-base mb-4 tracking-wide leading-relaxed">
                  Body Text (Medium) - Roboto Mono: Secondary body text used for additional information and extended reading content. 
                  The line height and tracking are optimized for comfortable reading.
                </p>
                <p className="font-body text-sm tracking-wide leading-relaxed">
                  Body Text (Small) - Roboto Mono: Used for captions, footnotes, and smaller informational text throughout the interface.
                </p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Colors Section */}
          <section id="colors">
            <h2 className="text-2xl font-heading font-bold mb-6 tracking-wider">Color Palette</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <div className="h-20 bg-chenius-black rounded-none"></div>
                <span className="mt-2 text-sm font-body">Black</span>
              </div>
              <div className="flex flex-col">
                <div className="h-20 bg-chenius-white border rounded-none"></div>
                <span className="mt-2 text-sm font-body">White</span>
              </div>
              <div className="flex flex-col">
                <div className="h-20 bg-chenius-gray-100 rounded-none"></div>
                <span className="mt-2 text-sm font-body">Gray 100</span>
              </div>
              <div className="flex flex-col">
                <div className="h-20 bg-chenius-gray-200 rounded-none"></div>
                <span className="mt-2 text-sm font-body">Gray 200</span>
              </div>
              <div className="flex flex-col">
                <div className="h-20 bg-chenius-gray-300 rounded-none"></div>
                <span className="mt-2 text-sm font-body">Gray 300</span>
              </div>
              <div className="flex flex-col">
                <div className="h-20 bg-chenius-gray-400 rounded-none"></div>
                <span className="mt-2 text-sm font-body text-white">Gray 400</span>
              </div>
              <div className="flex flex-col">
                <div className="h-20 bg-chenius-gray-500 rounded-none"></div>
                <span className="mt-2 text-sm font-body text-white">Gray 500</span>
              </div>
              <div className="flex flex-col">
                <div className="h-20 bg-chenius-gray-600 rounded-none"></div>
                <span className="mt-2 text-sm font-body text-white">Gray 600</span>
              </div>
              <div className="flex flex-col">
                <div className="h-20 bg-chenius-gray-700 rounded-none"></div>
                <span className="mt-2 text-sm font-body text-white">Gray 700</span>
              </div>
              <div className="flex flex-col">
                <div className="h-20 bg-chenius-gray-800 rounded-none"></div>
                <span className="mt-2 text-sm font-body text-white">Gray 800</span>
              </div>
            </div>
          </section>

          <Separator />

          {/* Components Section */}
          <section id="components">
            <h2 className="text-2xl font-heading font-bold mb-6 tracking-wider">Components</h2>
            
            {/* Buttons */}
            <div className="mb-10">
              <h3 className="text-xl font-heading mb-4 tracking-wider">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
                <Button disabled>Disabled</Button>
                <Button variant="default" size="sm">Small</Button>
                <Button variant="default" size="lg">Large</Button>
                <Button variant="default">
                  <Plus className="mr-2" />
                  With Icon
                </Button>
              </div>
            </div>
            
            {/* Cards */}
            <div className="mb-10">
              <h3 className="text-xl font-heading mb-4 tracking-wider">Cards</h3>
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
            </div>
            
            {/* Forms */}
            <div className="mb-10">
              <h3 className="text-xl font-heading mb-4 tracking-wider">Form Elements</h3>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <Button className="w-full">Submit</Button>
                </div>
              </div>
            </div>
            
            {/* Badges */}
            <div className="mb-10">
              <h3 className="text-xl font-heading mb-4 tracking-wider">Badges</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>
            
            {/* Alerts */}
            <div className="mb-10">
              <h3 className="text-xl font-heading mb-4 tracking-wider">Alerts</h3>
              <div className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>This is an informational alert with default styling.</AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>This is a destructive alert for error messages.</AlertDescription>
                </Alert>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="mb-10">
              <h3 className="text-xl font-heading mb-4 tracking-wider">Tabs</h3>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="p-4 border mt-2">
                  <p>This is the overview tab content. It provides a summary of information.</p>
                </TabsContent>
                <TabsContent value="details" className="p-4 border mt-2">
                  <p>This is the details tab content. It provides more specific information.</p>
                </TabsContent>
                <TabsContent value="settings" className="p-4 border mt-2">
                  <p>This is the settings tab content. It contains configurable options.</p>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Progress */}
            <div className="mb-10">
              <h3 className="text-xl font-heading mb-4 tracking-wider">Progress</h3>
              <div className="space-y-4">
                <Progress value={progressValue} className="w-full" />
                <div className="flex gap-2">
                  <Button onClick={() => setProgressValue(Math.max(0, progressValue - 10))}>
                    Decrease
                  </Button>
                  <Button onClick={() => setProgressValue(Math.min(100, progressValue + 10))}>
                    Increase
                  </Button>
                </div>
                <div className="text-sm font-body">Current progress: {progressValue}%</div>
              </div>
            </div>
            
            {/* Avatar */}
            <div className="mb-10">
              <h3 className="text-xl font-heading mb-4 tracking-wider">Avatars</h3>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
            </div>
            
            {/* Accordion */}
            <div className="mb-10">
              <h3 className="text-xl font-heading mb-4 tracking-wider">Accordion</h3>
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
                    Orbitron is used for headings, providing a futuristic, angular aesthetic. Roboto Mono is used for body text, offering a clean, modern monospace style that's easy to read.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Are these components customizable?</AccordionTrigger>
                  <AccordionContent>
                    Yes. All components are built with Tailwind CSS and can be easily customized by adjusting their class names or creating variants.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
          
          <Separator />
          
          {/* Pattern & Utilities Section */}
          <section id="patterns">
            <h2 className="text-2xl font-heading font-bold mb-6 tracking-wider">Patterns & Utilities</h2>
            
            {/* Layout Pattern */}
            <div className="mb-10">
              <h3 className="text-xl font-heading mb-4 tracking-wider">Layout Pattern</h3>
              <div className="border p-4 mb-4">
                <div className="border-b pb-4 mb-4 border-chenius-gray-200">Header</div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/4 border p-4">Sidebar</div>
                  <div className="md:w-3/4 border p-4 min-h-[200px]">Main Content Area</div>
                </div>
                <div className="border-t pt-4 mt-4 border-chenius-gray-200">Footer</div>
              </div>
            </div>
            
            {/* Hover Effects */}
            <div className="mb-10">
              <h3 className="text-xl font-heading mb-4 tracking-wider">Hover Effects</h3>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="hover-underline text-lg font-body">Underline Hover Effect</a>
                <button className="hover-fill border px-4 py-2">Fill Hover Effect</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default DesignSystem;
