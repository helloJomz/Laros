import { useProfileContext } from "@/context/ProfileContext";
import { Button } from "../ui/button";
import { useState } from "react";
import { Badge } from "../ui/badge";

const Genre = () => {
  const genre = ["MMORPG", "RPG", "Horror", "Thriller", "Fantasy"];

  const [editGenre, setEditGenre] = useState<boolean>(false);

  const { isAuthProfile, setShowProfileModal } = useProfileContext();

  if (genre.length !== 0)
    return (
      <>
        <div className="flex flex-wrap gap-y-2 gap-x-2 text-xs md:text-sm justify-center w-full px-8 md:px-0">
          {genre.map((item) => (
            <Badge key={item} className="bg-sky-800 cursor-pointer">
              {item}
            </Badge>
          ))}
        </div>
        {isAuthProfile && (
          <Button
            className="w-full text-xs h-8 md:text-sm"
            onClick={() => {
              setShowProfileModal("genre");
            }}
          >
            Edit Genre
          </Button>
        )}
      </>
    );

  if (isAuthProfile && editGenre)
    //TODO: Modal for this one
    return (
      <>
        <span>edit</span>
      </>
    );

  if (isAuthProfile && genre.length === 0)
    return (
      <>
        <Button
          className="w-full"
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
