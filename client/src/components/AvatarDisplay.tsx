import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type AvatarDisplayProps = {
  fallback?: string;
  src: string;
  className?: string;
};

const AvatarDisplay = (props: AvatarDisplayProps) => {
  return (
    <>
      <Avatar
        className={`w-8 h-8 ${props?.className} border-2 border-primary `}
      >
        <AvatarImage src={props.src} className="object-cover" />
        <AvatarFallback>
          {props.fallback ? props.fallback : "AN"}
        </AvatarFallback>
      </Avatar>
    </>
  );
};

export default AvatarDisplay;
