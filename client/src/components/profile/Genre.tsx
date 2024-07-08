import { useProfileContext } from "@/context/ProfileContext";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

const Genre = ({ getProps }: { getProps: (prop: boolean) => void }) => {
  const {
    isAuthProfile,
    setShowProfileModal,
    showProfileModal,
    userProfileObject,
  } = useProfileContext();

  const [genre, setGenre] = useState<string[]>(() => {
    const storageItem = localStorage.getItem("temp_genre");
    let genre: string[];
    if (storageItem && isAuthProfile) {
      genre = JSON.parse(storageItem);
    } else {
      genre = [...(userProfileObject ? userProfileObject.genre[0] : [])];
    }
    return genre;
  });

  useEffect(() => {
    const storageItem = localStorage.getItem("temp_genre");
    if (storageItem && isAuthProfile) {
      const genre = JSON.parse(storageItem);
      setGenre(genre);
    }
  }, [showProfileModal]);

  useEffect(() => {
    getProps(genre.length === 0 ? true : false);
  }, [genre, getProps]);

  if (genre.length !== 0)
    return (
      <>
        <div className="flex flex-wrap gap-y-2 gap-x-2 text-xs md:text-sm justify-center w-full px-8 md:px-0">
          {genre.map((item) => (
            <Badge
              key={item}
              className="text-xs text-center bg-sky-800 cursor-pointer"
            >
              {item}
            </Badge>
          ))}
        </div>
        {isAuthProfile && (
          <Button
            className="w-full text-xs md:text-sm h-8"
            onClick={() => {
              setShowProfileModal("genre");
            }}
          >
            Edit Genre
          </Button>
        )}
      </>
    );

  if (isAuthProfile && genre.length === 0)
    return (
      <>
        <Button
          className="w-full text-xs md:text-sm h-8"
          onClick={() => {
            setShowProfileModal("genre");
          }}
        >
          Add Genre
        </Button>
      </>
    );
};

export default Genre;
