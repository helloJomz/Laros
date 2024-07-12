import { capitalizeFirstLetter } from "@/utils/utils";
import { useEffect } from "react";

export const usePageTabName = ({ tabName }: { tabName: string }) => {
  useEffect(() => {
    document.title = capitalizeFirstLetter(tabName);
  }, []);
};
