import { useNavbarContext } from "@/context/NavbarContext";
import AlertToast from "../AlertToast";
import { Hand, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

const Alerts = () => {
  const { triggerAlertFooter, setTriggerAlertFooter } = useNavbarContext();
  const { trigger, title, desc }: any = triggerAlertFooter;

  const icons: any = {
    logout: <LogOut />,
    login: <Hand />,
  };

  useEffect(() => {
    setTimeout(() => {
      setTriggerAlertFooter({});
    }, 7000);
  }, [triggerAlertFooter]);

  return (
    <>
      {Object.keys(triggerAlertFooter).length > 0 && (
        <AlertToast title={title} desc={desc} icon={icons[trigger]} />
      )}
    </>
  );
};

export default Alerts;
