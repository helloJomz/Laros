import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavbarContext } from "@/context/NavbarContext";
import { cn } from "@/lib/utils";

type AlertToastProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const AlertToast = ({
  title,
  desc,
  icon,
  className,
  ...props
}: AlertToastProps) => {
  const { windowWidth } = useNavbarContext();

  const cutTheAlert = windowWidth >= 400;

  return (
    <>
      <Alert
        className={cn(
          "fixed bottom-3 left-1/2 transform -translate-x-1/2 w-[80%] md:w-fit md:left-3 md:transform-none md:translate-x-0 flex gap-x-2 md:gap-x-4 items-center cursor-pointer hover:bg-slate-800",
          className,
          {
            "w-[24rem]": cutTheAlert,
          }
        )}
        {...props}
      >
        <div className="text-3xl md:text-5xl">{icon}</div>
        <div>
          <AlertTitle
            className="text-xs lg:text-sm font-bold
          "
          >
            {title}
          </AlertTitle>
          <AlertDescription className="text-pretty w-full text-xs lg:text-sm">
            {desc}
          </AlertDescription>
        </div>
      </Alert>
    </>
  );
};

export default AlertToast;
