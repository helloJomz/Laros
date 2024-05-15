import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/utils/utils";
import { FC, ReactNode } from "react";

type ButtonIconProps = {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
};

const ButtonIcon: FC<ButtonIconProps> = ({ className, icon, ...props }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <Button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(className, {
        "text-primary transition ease-in": isHovered === true,
      })}
      {...props}
    >
      <div>{icon}</div>
    </Button>
  );
};

export default ButtonIcon;
