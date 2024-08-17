import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";

type ButtonIconProps = HTMLAttributes<HTMLButtonElement> & {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  onClick?: () => void;
};

const ButtonIcon: FC<ButtonIconProps> = ({ className, children, ...props }) => {
  const [isHovered, _setIsHovered] = useState<boolean>(false);
  return (
    <Button
      className={cn(className, {
        "text-primary transition ease-in": isHovered === true,
      })}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonIcon;
