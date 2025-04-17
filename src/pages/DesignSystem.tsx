
import { useState, useEffect } from "react";
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
import { AlertCircle, Check, Info, Plus, AlertTriangle, LayoutGrid, Grid3X3, HeartHandshake } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import SideMenu from "@/components/design-system/SideMenu";

const DesignSystem = () => {
  const [progressValue, setProgressValue] = useState(45);
  const [activeSection, setActiveSection] = useState("typography");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "typography",
        "colors",
        "layout",
        "components",
        "patterns",
        "principles"
      ];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      <div className="flex min-h-screen">
        <SidebarProvider>
          <SideMenu activeSection={activeSection} setActiveSection={setActiveSection} />
          <div className="flex-1 px-4 md:px-6 py-12 max-w-5xl mx-auto">
            <SectionHeading
              title="Design System"
              description="A comprehensive guide to our visual language, components, and design patterns used throughout the application."
            />

            <div className="space-y-16">
              {/* Typography Section */}
              <section id="typography">
                <h2 className="text-2xl font-heading font-bold mb-6 tracking-normal">Typography</h2>
                <div className="space-y-6">
                  <div className="p-6 border rounded-md">
                    <h1 className="text-4xl font-heading mb-4 tracking-tight">Heading 1 - Viga</h1>
                    <h2 className="text-3xl font-heading mb-4 tracking-normal">Heading 2 - Viga</h2>
                    <h3 className="text-2xl font-heading mb-3 tracking-normal">Heading 3 - Viga</h3>
                    <h4 className="text-xl font-heading mb-3 tracking-normal">Heading 4 - Viga</h4>
                    <h5 className="text-lg font-heading mb-2 tracking-normal">Heading 5 - Viga</h5>
                    <h6 className="text-base font-heading mb-2 tracking-normal">Heading 6 - Viga</h6>
                  </div>
                  
                  <div className="p-6 border rounded-md">
                    <p className="font-body text-lg mb-4 tracking-wide leading-relaxed">
                      Body Text (Large) - Saira Semi Condensed: This is an example of the primary body text used for paragraphs and general content. 
                      The font is designed for readability while maintaining a modern, technical aesthetic.
                    </p>
                    <p className="font-body text-base mb-4 tracking-wide leading-relaxed">
                      Body Text (Medium) - Saira Semi Condensed: Secondary body text used for additional information and extended reading content. 
                      The line height and tracking are optimized for comfortable reading.
                    </p>
                    <p className="font-body text-sm tracking-wide leading-relaxed">
                      Body Text (Small) - Saira Semi Condensed: Used for captions, footnotes, and smaller informational text throughout the interface.
                    </p>
                  </div>
                  
                  <div className="p-6 border rounded-md">
                    <h3 className="text-xl font-heading mb-4 tracking-normal">Typography Guidelines</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use Viga for headings to create visual hierarchy</li>
                      <li>Use Saira Semi Condensed for body text to ensure readability</li>
                      <li>Maintain consistent text sizing throughout the interface</li>
                      <li>Use appropriate line heights for different text sizes</li>
                      <li>Keep paragraph width under 70 characters for optimal readability</li>
                      <li>Ensure sufficient contrast between text and background colors</li>
                      <li>Use tracking-tight for large headings and tracking-normal for smaller text</li>
                    </ul>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Colors Section */}
              <section id="colors">
                <h2 className="text-2xl font-heading font-bold mb-6 tracking-normal">Color Palette</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div className="flex flex-col">
                      <div className="h-20 bg-chenius-black rounded-md"></div>
                      <span className="mt-2 text-sm font-body">Black</span>
                      <span className="text-xs text-chenius-gray-500">#000000</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="h-20 bg-chenius-white border rounded-md"></div>
                      <span className="mt-2 text-sm font-body">White</span>
                      <span className="text-xs text-chenius-gray-500">#FFFFFF</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="h-20 bg-chenius-gray-100 rounded-md"></div>
                      <span className="mt-2 text-sm font-body">Gray 100</span>
                      <span className="text-xs text-chenius-gray-500">#F6F6F7</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="h-20 bg-chenius-gray-200 rounded-md"></div>
                      <span className="mt-2 text-sm font-body">Gray 200</span>
                      <span className="text-xs text-chenius-gray-500">#EBEBEC</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="h-20 bg-chenius-gray-300 rounded-md"></div>
                      <span className="mt-2 text-sm font-body">Gray 300</span>
                      <span className="text-xs text-chenius-gray-500">#DCDCDD</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="h-20 bg-chenius-gray-400 rounded-md"></div>
                      <span className="mt-2 text-sm font-body text-white">Gray 400</span>
                      <span className="text-xs text-white opacity-70">#BBBBBF</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="h-20 bg-chenius-gray-500 rounded-md"></div>
                      <span className="mt-2 text-sm font-body text-white">Gray 500</span>
                      <span className="text-xs text-white opacity-70">#8E9196</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="h-20 bg-chenius-gray-600 rounded-md"></div>
                      <span className="mt-2 text-sm font-body text-white">Gray 600</span>
                      <span className="text-xs text-white opacity-70">#6E7073</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="h-20 bg-chenius-gray-700 rounded-md"></div>
                      <span className="mt-2 text-sm font-body text-white">Gray 700</span>
                      <span className="text-xs text-white opacity-70">#52545A</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="h-20 bg-chenius-gray-800 rounded-md"></div>
                      <span className="mt-2 text-sm font-body text-white">Gray 800</span>
                      <span className="text-xs text-white opacity-70">#3A3B3F</span>
                    </div>
                  </div>
                  
                  <div className="p-6 border rounded-md">
                    <h3 className="text-xl font-heading mb-4 tracking-normal">Color Usage Guidelines</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use black for main headings and key UI elements</li>
                      <li>Use gray tones for supporting text and secondary elements</li>
                      <li>Maintain sufficient contrast ratios for accessibility (WCAG 2.1 AA standards)</li>
                      <li>Be consistent with color application across similar elements</li>
                      <li>Use lighter grays for backgrounds and darker grays for text</li>
                      <li>Reserve high-contrast colors for important UI actions and notifications</li>
                    </ul>
                  </div>
                </div>
              </section>

              <Separator />
              
              {/* Layout Section */}
              <section id="layout">
                <h2 className="text-2xl font-heading font-bold mb-6 tracking-normal">Layout & Grid</h2>
                <div className="space-y-8">
                  {/* Grid System */}
                  <div id="grid-system" className="space-y-4">
                    <h3 className="text-xl font-heading mb-2 tracking-normal">Grid System</h3>
                    <div className="p-4 border rounded-md">
                      <div className="grid grid-cols-12 gap-2 mb-4">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div key={i} className="h-10 bg-chenius-gray-200 flex items-center justify-center text-xs">
                            {i + 1}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                        <div className="h-20 bg-chenius-gray-200 flex items-center justify-center">
                          <LayoutGrid className="w-6 h-6 mr-2" /> 1/3
                        </div>
                        <div className="h-20 bg-chenius-gray-200 flex items-center justify-center">
                          <LayoutGrid className="w-6 h-6 mr-2" /> 2/3
                        </div>
                        <div className="h-20 bg-chenius-gray-200 flex items-center justify-center">
                          <LayoutGrid className="w-6 h-6 mr-2" /> 3/3
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-chenius-gray-600">
                          Our grid system uses a 12-column layout with responsive breakpoints at 640px (sm), 
                          768px (md), 1024px (lg), and 1280px (xl).
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Containers */}
                  <div id="containers" className="space-y-4">
                    <h3 className="text-xl font-heading mb-2 tracking-normal">Containers</h3>
                    <div className="p-4 border rounded-md">
                      <div className="max-w-7xl mx-auto p-4 bg-chenius-gray-100 mb-4 rounded-md">
                        <div className="text-center">max-w-7xl Container (1280px)</div>
                      </div>
                      <div className="max-w-5xl mx-auto p-4 bg-chenius-gray-100 mb-4 rounded-md">
                        <div className="text-center">max-w-5xl Container (1024px)</div>
                      </div>
                      <div className="max-w-3xl mx-auto p-4 bg-chenius-gray-100 rounded-md">
                        <div className="text-center">max-w-3xl Container (768px)</div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-chenius-gray-600">
                          Containers help maintain consistent content width across the application.
                          They automatically center content and apply appropriate padding at different screen sizes.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Spacing */}
                  <div id="spacing" className="space-y-4">
                    <h3 className="text-xl font-heading mb-2 tracking-normal">Spacing</h3>
                    <div className="p-4 border rounded-md">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center">
                          <div className="w-16 h-16 bg-chenius-gray-200 mr-4"></div>
                          <div>Spacing: 16px (1rem)</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-chenius-gray-200 mr-8"></div>
                          <div>Spacing: 32px (2rem)</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-chenius-gray-200 mr-12"></div>
                          <div>Spacing: 48px (3rem)</div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-chenius-gray-600">
                          Our spacing system uses multiples of 4px (0.25rem) as the base unit.
                          Common spacing values include 4px (0.25rem), 8px (0.5rem), 16px (1rem), 
                          24px (1.5rem), 32px (2rem), and 48px (3rem).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Components Section */}
              <section id="components">
                <h2 className="text-2xl font-heading font-bold mb-6 tracking-normal">Components</h2>
                
                {/* Buttons */}
                <div id="buttons" className="mb-10">
                  <h3 className="text-xl font-heading mb-4 tracking-normal">Buttons</h3>
                  <div className="p-6 border rounded-md">
                    <div className="flex flex-wrap gap-4 mb-6">
                      <Button variant="default">Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                      <Button variant="destructive">Destructive</Button>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <Button disabled>Disabled</Button>
                      <Button variant="default" size="sm">Small</Button>
                      <Button variant="default" size="lg">Large</Button>
                      <Button variant="default">
                        <Plus className="mr-2" />
                        With Icon
                      </Button>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-base font-heading mb-2">Usage Guidelines</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Use Default for primary actions</li>
                        <li>Use Secondary for secondary actions that appear alongside a primary action</li>
                        <li>Use Outline for less prominent actions</li>
                        <li>Use Ghost for tertiary actions or in tight spaces</li>
                        <li>Use Link for navigation actions that appear inline with text</li>
                        <li>Use Destructive for actions that may result in data loss</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Cards */}
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
                
                {/* Forms */}
                <div id="forms" className="mb-10">
                  <h3 className="text-xl font-heading mb-4 tracking-normal">Form Elements</h3>
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 border p-6 rounded-md">
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
                    <div className="space-y-4">
                      <h4 className="text-base font-heading mb-2">Form Guidelines</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Always use labels with form controls</li>
                        <li>Provide clear, helpful placeholder text</li>
                        <li>Group related form fields together</li>
                        <li>Use appropriate input types (email, password, etc.)</li>
                        <li>Provide clear error states and validation feedback</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Badges */}
                <div id="badges" className="mb-10">
                  <h3 className="text-xl font-heading mb-4 tracking-normal">Badges</h3>
                  <div className="border rounded-md">
                    <div className="flex flex-wrap gap-2 p-6 border-b">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                    </div>
                    <div className="p-6">
                      <h4 className="text-base font-heading mb-2">Badge Guidelines</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Use badges to highlight status, counts, or categories</li>
                        <li>Keep badge text concise and clear</li>
                        <li>Use appropriate badge variants based on context</li>
                        <li>Ensure sufficient contrast between badge and background</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Alerts */}
                <div id="alerts" className="mb-10">
                  <h3 className="text-xl font-heading mb-4 tracking-normal">Alerts</h3>
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
                    <div className="mt-4 p-4 border rounded-md">
                      <h4 className="text-base font-heading mb-2">Alert Guidelines</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Use Info icon for informational alerts</li>
                        <li>Use AlertCircle icon for error/destructive alerts</li>
                        <li>Use AlertTriangle for warnings</li>
                        <li>Use Check icon for success messages</li>
                        <li>Keep alert messages clear and concise</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Tabs */}
                <div id="tabs" className="mb-10">
                  <h3 className="text-xl font-heading mb-4 tracking-normal">Tabs</h3>
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
                  <div className="mt-4 p-4 border rounded-md">
                    <h4 className="text-base font-heading mb-2">Tab Guidelines</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Use tabs to organize content into logical sections</li>
                      <li>Keep tab labels short and descriptive</li>
                      <li>Ensure tab content is contextually related</li>
                      <li>Limit the number of tabs to avoid overwhelming users</li>
                    </ul>
                  </div>
                </div>
                
                {/* Toggle */}
                <div id="toggle" className="mb-10">
                  <h3 className="text-xl font-heading mb-4 tracking-normal">Toggle</h3>
                  <div className="p-6 border rounded-md">
                    <div className="flex items-center space-x-2">
                      <div className="bg-chenius-gray-200 h-6 w-12 rounded-full relative">
                        <div className="absolute left-1 top-1 bg-white h-4 w-4 rounded-full"></div>
                      </div>
                      <span>Off</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                      <div className="bg-black h-6 w-12 rounded-full relative">
                        <div className="absolute right-1 top-1 bg-white h-4 w-4 rounded-full"></div>
                      </div>
                      <span>On</span>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-base font-heading mb-2">Toggle Guidelines</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Use toggles for binary settings (on/off, yes/no)</li>
                        <li>Provide clear labeling for what the toggle controls</li>
                        <li>Consider using a label that indicates the current state</li>
                        <li>Apply immediate changes when possible (avoid requiring a save action)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Progress */}
                <div id="progress" className="mb-10">
                  <h3 className="text-xl font-heading mb-4 tracking-normal">Progress</h3>
                  <div className="space-y-4 p-6 border rounded-md">
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
                    <div className="mt-4">
                      <h4 className="text-base font-heading mb-2">Progress Guidelines</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Use progress indicators for operations that take time</li>
                        <li>Show percentage completion when possible</li>
                        <li>Consider using indeterminate progress indicators when completion time is unknown</li>
                        <li>Provide context about what operation is in progress</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Avatar */}
                <div id="avatar" className="mb-10">
                  <h3 className="text-xl font-heading mb-4 tracking-normal">Avatars</h3>
                  <div className="p-6 border rounded-md">
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar>
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-16 w-16">
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-base font-heading mb-2">Avatar Guidelines</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Use avatars to represent users or entities</li>
                        <li>Provide meaningful fallback text (initials) when images are unavailable</li>
                        <li>Maintain consistent sizes for avatars in similar contexts</li>
                        <li>Consider using different sizes based on importance or prominence</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Accordion */}
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
              </section>
              
              <Separator />
              
              {/* Pattern & Utilities Section */}
              <section id="patterns">
                <h2 className="text-2xl font-heading font-bold mb-6 tracking-normal">Patterns & Utilities</h2>
                
                {/* Layout Pattern */}
                <div id="layout-pattern" className="mb-10">
                  <h3 className="text-xl font-heading mb-4 tracking-normal">Layout Patterns</h3>
                  <div className="border p-4 mb-4 rounded-md">
                    <div className="border-b pb-4 mb-4 border-chenius-gray-200">Header</div>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-1/4 border p-4">Sidebar</div>
                      <div className="md:w-3/4 border p-4 min-h-[200px]">Main Content Area</div>
                    </div>
                    <div className="border-t pt-4 mt-4 border-chenius-gray-200">Footer</div>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="text-base font-heading mb-2">Common Layouts</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>Single Column:</strong> Ideal for focused content like articles or forms</li>
                      <li><strong>Two Columns:</strong> Good for dashboards with sidebar navigation</li>
                      <li><strong>Three Columns:</strong> Useful for complex applications with multiple navigation levels</li>
                      <li><strong>Card Grid:</strong> Excellent for displaying collections of similar items</li>
                    </ul>
                  </div>
                </div>
                
                {/* Hover Effects */}
                <div id="hover-effects" className="mb-10">
                  <h3 className="text-xl font-heading mb-4 tracking-normal">Hover Effects</h3>
                  <div className="flex flex-wrap gap-4 p-6 border rounded-md">
                    <a href="#" className="text-lg font-body border-b border-transparent hover:border-current transition-all duration-200">Underline Hover Effect</a>
                    <button className="border-2 border-black px-4 py-2 relative overflow-hidden group">
                      <span className="relative z-10">Fill Hover Effect</span>
                      <span className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                    </button>
                  </div>
                  <div className="mt-4 p-4 border rounded-md">
                    <h4 className="text-base font-heading mb-2">Hover Effect Guidelines</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Use subtle hover effects to indicate interactivity</li>
                      <li>Ensure hover effects are consistent across similar elements</li>
                      <li>Consider adding transitions for smoother effects</li>
                      <li>Remember that hover effects don't work on touch devices</li>
                    </ul>
                  </div>
                </div>
                
                {/* List Patterns */}
                <div id="list-patterns" className="mb-10">
                  <h3 className="text-xl font-heading mb-4 tracking-normal">List Patterns</h3>
                  <div className="space-y-6 p-6 border rounded-md">
                    <div>
                      <h4 className="text-base font-heading mb-2">Bulleted List</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>First item in bulleted list</li>
                        <li>Second item in bulleted list</li>
                        <li>Third item with sub-items:
                          <ul className="list-circle pl-6 mt-1 space-y-1">
                            <li>Sub-item one</li>
                            <li>Sub-item two</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-base font-heading mb-2">Numbered List</h4>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>First step in the process</li>
                        <li>Second step in the process</li>
                        <li>Third step with sub-steps:
                          <ol className="list-alpha pl-6 mt-1 space-y-1">
                            <li>Sub-step one</li>
                            <li>Sub-step two</li>
                          </ol>
                        </li>
                      </ol>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-base font-heading mb-2">List Pattern Guidelines</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Use bulleted lists for unordered collections of items</li>
                        <li>Use numbered lists for sequential steps or ranked items</li>
                        <li>Maintain consistent formatting within lists</li>
                        <li>Consider using nested lists for hierarchical information</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
              
              <Separator />
              
              {/* Design Principles Section */}
              <section id="principles">
                <h2 className="text-2xl font-heading font-bold mb-6 tracking-normal">Design Principles</h2>
                <div className="space-y-6">
                  <div className="p-6 border rounded-md">
                    <h3 className="text-xl font-heading mb-4 tracking-normal">Core Principles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="text-lg font-heading font-medium flex items-center">
                          <HeartHandshake className="mr-2 h-5 w-5" />
                          Clarity
                        </h4>
                        <p>Eliminate ambiguity. Make interfaces clear and intuitive by using familiar patterns and consistent visual elements.</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-heading font-medium flex items-center">
                          <HeartHandshake className="mr-2 h-5 w-5" />
                          Efficiency
                        </h4>
                        <p>Design interfaces that help users accomplish their tasks with minimum effort and maximum efficiency.</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-heading font-medium flex items-center">
                          <HeartHandshake className="mr-2 h-5 w-5" />
                          Consistency
                        </h4>
                        <p>Maintain consistent patterns, behaviors, and visual elements throughout the interface to build user confidence.</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-heading font-medium flex items-center">
                          <HeartHandshake className="mr-2 h-5 w-5" />
                          Accessibility
                        </h4>
                        <p>Design for all users, ensuring interfaces are usable by people with diverse abilities and in various contexts.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 border rounded-md">
                    <h3 className="text-xl font-heading mb-4 tracking-normal">Application</h3>
                    <p className="mb-4">These principles guide our design decisions across all aspects of the interface:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use consistent spacing and alignment to create visual order</li>
                      <li>Apply color with purpose to guide attention and communicate meaning</li>
                      <li>Design for flexibility across different screen sizes and devices</li>
                      <li>Prioritize content hierarchy to help users find what they need</li>
                      <li>Create feedback mechanisms that acknowledge user actions</li>
                      <li>Reduce cognitive load by simplifying complex tasks and workflows</li>
                      <li>Incorporate familiar patterns to leverage existing user knowledge</li>
                      <li>Design with empathy to address real user needs and pain points</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </Layout>
  );
};

export default DesignSystem;
