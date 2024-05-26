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
        className="fixed right-5 top-8 w-1/3 flex gap-x-4 items-center cursor-pointer hover:bg-slate-800"
        {...props}
      >
        <div>{icon}</div>
        <div>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{desc}</AlertDescription>
        </div>
      </Alert>
    </>
  );
};

export default AlertToast;
