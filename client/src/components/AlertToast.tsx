import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type AlertToastProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const AlertToast = ({ title, desc, icon, ...props }: AlertToastProps) => {
  return (
    <>
      <Alert
        className="fixed bottom-3 left-3 w-[90%] lg:w-fit flex gap-x-4 items-center cursor-pointer hover:bg-slate-800"
        {...props}
      >
        <div>{icon}</div>
        <div>
          <AlertTitle className="text-xs lg:text-sm">{title}</AlertTitle>
          <AlertDescription className="text-pretty break-words w-full text-xs lg:text-sm">
            {desc}
          </AlertDescription>
        </div>
      </Alert>
    </>
  );
};

export default AlertToast;
