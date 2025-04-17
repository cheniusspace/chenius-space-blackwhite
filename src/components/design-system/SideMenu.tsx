
import React from "react";
import { Typography, Palette, Component, Grid, AspectRatio, Play, Book, Layers, FileText } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

interface SideMenuProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const SideMenu = ({ activeSection, setActiveSection }: SideMenuProps) => {
  const menuItems = [
    { id: "typography", name: "Typography", icon: Typography },
    { id: "colors", name: "Color Palette", icon: Palette },
    { id: "components", name: "Components", icon: Component },
    { id: "patterns", name: "Patterns & Utilities", icon: Layers },
  ];

  const componentsSubmenu = [
    { id: "buttons", name: "Buttons", icon: Play },
    { id: "cards", name: "Cards", icon: AspectRatio },
    { id: "forms", name: "Form Elements", icon: FileText },
    { id: "badges", name: "Badges", icon: Book },
    { id: "alerts", name: "Alerts", icon: Book },
    { id: "tabs", name: "Tabs", icon: Book },
    { id: "progress", name: "Progress", icon: Book },
    { id: "avatar", name: "Avatars", icon: Book },
    { id: "accordion", name: "Accordion", icon: Book },
  ];

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Scroll to the section
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Sidebar className="w-64 border-r border-chenius-gray-200">
      <SidebarContent>
        <div className="pt-4 pl-4 mb-4">
          <h2 className="font-heading text-xl tracking-wider">Design System</h2>
        </div>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                isActive={activeSection === item.id}
                onClick={() => handleSectionClick(item.id)}
              >
                <item.icon className="mr-2" size={18} />
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {activeSection === "components" && (
          <div className="ml-4 mt-2">
            <h3 className="text-sm font-body text-chenius-gray-500 pl-2 mb-2">Components</h3>
            <SidebarMenu>
              {componentsSubmenu.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={false}
                    onClick={() => {
                      const section = document.getElementById(item.id);
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    <item.icon className="mr-2" size={16} />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default SideMenu;
