import { useEffect, useState } from "react";
import genreJson from "../../../utils/genre.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAddGenreMutation } from "@/app/features/profile/profileApiSlice";
import { useUserContext } from "@/context/UserContext";
import { useModal } from "@/hooks/useModal";
import { useProfile } from "@/hooks/useProfile";
import useClickedOutsideModal from "@/hooks/useClickedOutsideModal";

const EditGenre = () => {
  const { componentRef } = useClickedOutsideModal();

  const { authenticatedUserObject } = useUserContext();
  const yourUID = authenticatedUserObject.userid;
  const { userObject, setGenre } = useProfile();
  const { setModalOpen } = useModal();

  const [listOfGenres, setListOfGenres] = useState<string[]>([]);
  useEffect(() => {
    setListOfGenres(genreJson.genres);
  }, []);

  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    userObject?.genre || []
  );

  const [addGenre] = useAddGenreMutation();

  const handleSelectGenre = (genre: string) => {
    setSelectedGenres((prevGenres: string[]) => {
      if (prevGenres.includes(genre)) {
        // Remove the genre if it already exists
        return prevGenres.filter((g) => g !== genre);
      } else {
        // Limit reached, return the selected five genres
        if (prevGenres.length >= 5) {
          return prevGenres;
        }
        // Add a new selected genre cause it has not reached the limit yet.
        return [...prevGenres, genre];
      }
    });
  };

  const handleSaveGenre = async () => {
    setGenre(selectedGenres);
    await addGenre({ yourUID: yourUID, genre: selectedGenres });
    setModalOpen(null);
  };

  return (
    <>
      <div
        className="bg-secondary w-[90%] h-[80%] md:w-1/2 md:h-1/2 xl:w-1/3 rounded shadow-lg p-4 flex flex-col gap-y-4"
        ref={componentRef}
      >
        <div>
          <h1 className="text-base lg:text-lg font-semibold">
            Add Your Favorite Genres
          </h1>
          <span className="text-xs text-muted-foreground">
            Pick 5 genres to feature on your profile.
          </span>
        </div>

        <div className="flex-grow space-y-2 space- overflow-y-auto pe-2">
          {listOfGenres.map((genre, index) => (
            <Badge
              className={`ms-1 bg-slate-600 cursor-pointer ${
                selectedGenres.includes(genre) ? "bg-primary" : ""
              }`}
              key={index}
              onClick={() => handleSelectGenre(genre)}
            >
              {genre}
            </Badge>
          ))}
        </div>

        <div className="flex gap-x-2 justify-between items-center border border-t-slate-600 pt-3">
          <span className="text-xs font-semibold">{`Selected: ${selectedGenres.length} / 5`}</span>
          <div className="flex gap-x-2">
            <Button
              className="text-xs px-4 bg-white text-black"
              onClick={() => setModalOpen(null)}
            >
              Cancel
            </Button>
            <Button className="text-xs px-4" onClick={handleSaveGenre}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditGenre;
