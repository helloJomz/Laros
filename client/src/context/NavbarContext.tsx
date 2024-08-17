import useWidthResize from "@/hooks/useWidthResize";
import { createContext, useContext, useState, FC } from "react";

interface NavbarContextType {
  windowWidth: number;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  triggerAlertFooter: null | {
    trigger: string;
    title: string;
    desc: string;
    alertType?: "default" | "error" | "success";
  };
  setTriggerAlertFooter: React.Dispatch<
    React.SetStateAction<null | {
      trigger: string;
      title: string;
      desc: string;
      alertType?: "default" | "error" | "success";
    }>
  >;
  showPromptToLogin: boolean;
  setShowPromptToLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarContext = createContext<undefined | NavbarContextType>(undefined);

const NavbarContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Width Resize
  const { windowWidth } = useWidthResize();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [triggerAlertFooter, setTriggerAlertFooter] = useState<null | {
    trigger: string;
    title: string;
    desc: string;
    alertType?: "default" | "error" | "success";
  }>(null);
  const [showPromptToLogin, setShowPromptToLogin] = useState<boolean>(false);

  return (
    <NavbarContext.Provider
      value={{
        windowWidth,
        searchQuery,
        setSearchQuery,
        triggerAlertFooter,
        setTriggerAlertFooter,
        showPromptToLogin,
        setShowPromptToLogin,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

// Custom hook to consume the context
const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error(
      "useSearchContext must be used within a APISearchContextProvider"
    );
  }
  return context;
};

export { NavbarContextProvider, useNavbarContext };
