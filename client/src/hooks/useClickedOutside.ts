import { RefObject, useEffect } from "react";

export const useClickOutside = (
  searchBoxRef: RefObject<HTMLDivElement>,
  setIsOpenSearch: (status: boolean) => void
) => {
  useEffect(() => {
    // If clicked outside set the setIsOpenSearch to false which causes the search box to dissapear.
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setIsOpenSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBoxRef, setIsOpenSearch]);
};
