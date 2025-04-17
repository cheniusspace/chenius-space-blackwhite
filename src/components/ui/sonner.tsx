
import { useTheme } from "@/providers/ThemeProvider";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:focus-visible:ring-2 group-[.toast]:focus-visible:ring-ring",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:focus-visible:ring-2 group-[.toast]:focus-visible:ring-ring",
          closeButton:
            "group-[.toast]:text-foreground/50 group-[.toast]:hover:text-foreground group-[.toast]:focus-visible:ring-2 group-[.toast]:focus-visible:ring-ring",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
