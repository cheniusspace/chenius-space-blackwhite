
import React from "react";
import { 
  Type, 
  Palette, 
  Component, 
  LayoutGrid, 
  Square, 
  Play, 
  BookOpen, 
  Layers, 
  FileText, 
  Bell, 
  ToggleLeft, 
  ListTodo,
  Panel,
  SlidersHorizontal,
  ExternalLink,
  Box,
  ListCollapse,
  HeartHandshake
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarGroupLabel,
  SidebarGroup,
} from "@/components/ui/sidebar";

interface SideMenuProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const SideMenu = ({ activeSection, setActiveSection }: SideMenuProps) => {
  const menuItems = [
    { id: "typography", name: "Typography", icon: Type },
    { id: "colors", name: "Color Palette", icon: Palette },
    { id: "layout", name: "Layout & Grid", icon: LayoutGrid },
    { id: "components", name: "Components", icon: Component },
    { id: "patterns", name: "Patterns & Utilities", icon: Layers },
    { id: "principles", name: "Design Principles", icon: HeartHandshake },
  ];

  const submenuItems = {
    components: [
      { id: "buttons", name: "Buttons", icon: Play },
      { id: "cards", name: "Cards", icon: Square },
      { id: "forms", name: "Form Elements", icon: FileText },
      { id: "badges", name: "Badges", icon: BookOpen },
      { id: "alerts", name: "Alerts", icon: Bell },
      { id: "tabs", name: "Tabs", icon: Panel },
      { id: "toggle", name: "Toggle", icon: ToggleLeft },
      { id: "progress", name: "Progress", icon: SlidersHorizontal },
      { id: "avatar", name: "Avatars", icon: BookOpen },
      { id: "accordion", name: "Accordion", icon: ListCollapse },
    ],
    layout: [
      { id: "grid-system", name: "Grid System", icon: LayoutGrid },
      { id: "containers", name: "Containers", icon: Box },
      { id: "spacing", name: "Spacing", icon: Square },
    ],
    patterns: [
      { id: "layout-pattern", name: "Layout Patterns", icon: LayoutGrid },
      { id: "hover-effects", name: "Hover Effects", icon: ExternalLink },
      { id: "list-patterns", name: "List Patterns", icon: ListTodo },
    ]
  };

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Scroll to the section
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubItemClick = (itemId: string) => {
    const section = document.getElementById(itemId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Sidebar className="w-64 border-r border-chenius-gray-200">
      <SidebarContent>
        <div className="pt-4 pl-4 mb-4">
          <h2 className="font-heading text-xl tracking-normal">Design System</h2>
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
              
              {activeSection === item.id && submenuItems[item.id as keyof typeof submenuItems] && (
                <SidebarMenuSub>
                  {submenuItems[item.id as keyof typeof submenuItems].map((subItem) => (
                    <SidebarMenuSubItem key={subItem.id}>
                      <SidebarMenuSubButton 
                        onClick={() => handleSubItemClick(subItem.id)}
                      >
                        <subItem.icon className="mr-2" size={16} />
                        <span>{subItem.name}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default SideMenu;
