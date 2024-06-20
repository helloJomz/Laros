import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type AvatarDisplayProps = {
  fallback?: string;
  src?: string;
  className?: string;
  variant?: "menu" | "search";
  icon?: React.ReactNode;
};

const AvatarDisplay = ({
  fallback = "AN",
  src,
  className,
  variant = "menu",
  icon,
}: AvatarDisplayProps) => {
  return (
    <>
      <Avatar
        className={cn("w-8 h-8 border-2 bg-red-600", className, {
          "border-primary": variant === "menu",
          "w-10 h-10 border-none": variant === "search",
        })}
      >
        <AvatarImage src={src} className="object-cover " />
        <AvatarFallback className="bg-muted-foreground">
          {icon ? icon : !src && fallback}
        </AvatarFallback>
      </Avatar>
    </>
  );
};

export default AvatarDisplay;
