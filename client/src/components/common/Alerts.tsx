import { useNavbarContext } from "@/context/NavbarContext";
import AlertToast from "../AlertToast";
import { Hand, LogOut } from "lucide-react";
import { useEffect } from "react";
import { MdError } from "react-icons/md";

const Alerts = () => {
  const { triggerAlertFooter, setTriggerAlertFooter } = useNavbarContext();

  const { trigger, title, desc }: any = triggerAlertFooter || {};

  const icons: any = {
    logout: <LogOut />,
    login: <Hand />,
    error: <MdError />,
  };

  const handeCloseToast = () => {
    setTriggerAlertFooter(null);
  };

  useEffect(() => {
    const alertTimeOut = setTimeout(() => {
      setTriggerAlertFooter(null);
    }, 5000);

    return () => {
      clearTimeout(alertTimeOut);
    };
  }, [triggerAlertFooter]);

  return (
    <>
      {triggerAlertFooter && (
        <AlertToast
          title={title}
          desc={desc}
          icon={icons[trigger]}
          onClick={handeCloseToast}
        />
      )}
    </>
  );
};

export default Alerts;
