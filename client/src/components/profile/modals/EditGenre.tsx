import { useEffect, useState } from "react";
import genreJson from "../../../utils/genre.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const EditGenre = () => {
  const [listOfGenres, setListOfGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setListOfGenres(genreJson.genres);
  }, []);

  const handleSelectGenre = (genre: string) => {
    setSelectedGenres((prevGenres: string[]) => {
      if (prevGenres.includes(genre)) {
        // Remove the genre if it already exists
        return prevGenres.filter((g) => g !== genre);
      } else {
        // Add the genre if it doesn't exist and the limit is not reached
        if (prevGenres.length >= 5) {
          setError(true);
          return prevGenres;
        }
        return [...prevGenres, genre];
      }
    });
  };

  return (
    <>
      <div className="bg-secondary w-[90%] h-[80%] md:w-1/2 md:h-1/2 xl:w-1/3 rounded shadow-lg p-4 flex flex-col gap-y-4">
        <div>
          <h1 className="text-sm font-semibold">Add Your Favorite Genres</h1>
          <span className="text-xs text-muted-foreground">
            Pick 5 genres to feature on your profile.
          </span>
        </div>

        {error}

        <div className="flex-grow space-y-2 space- overflow-y-auto pe-2">
          {listOfGenres.map((genre, index) => (
            <Badge
              className={`ms-1 bg-slate-600 ${
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
            <Button className="text-xs px-4">Cancel</Button>
            <Button className="text-xs px-4">Save</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditGenre;
