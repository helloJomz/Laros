import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { useModal } from "@/hooks/useModal";
import { useProfile } from "@/hooks/useProfile";

const Genre = () => {
  const { isAuthProfile, userObject, useGenre } = useProfile();
  const { modalType } = useModal();

  const { genre } = userObject;

  const [clientGenreList, setClientGenreList] = useState<string[]>(
    useGenre.length > 0 ? useGenre : genre
  );

  useEffect(() => {
    if (useGenre.length > 0) {
      setClientGenreList(useGenre);
    }
  }, [modalType]);

  const { setModalOpen } = useModal();

  if (clientGenreList?.length !== 0)
    return (
      <>
        <div className="flex flex-wrap gap-y-2 gap-x-2 text-xs md:text-sm justify-center w-full px-8 md:px-0">
          {clientGenreList.map((item: string) => (
            <Badge
              key={item}
              className="text-xs text-center bg-gradient-to-tr from-sky-500 to-indigo-600 cursor-pointer"
            >
              {item}
            </Badge>
          ))}
        </div>
        {isAuthProfile && (
          <Button
            className="w-full text-xs md:text-sm h-8"
            onClick={() => setModalOpen("genre")}
          >
            Edit Genre
          </Button>
        )}
      </>
    );

  if (isAuthProfile && clientGenreList.length === 0)
    return (
      <>
        <Button
          className="w-full text-xs md:text-sm h-8"
          onClick={() => setModalOpen("genre")}
        >
          Add Genre
        </Button>
      </>
    );
};

export default Genre;
