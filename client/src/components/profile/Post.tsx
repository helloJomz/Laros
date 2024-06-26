import { capitalizeFirstLetter } from "@/utils/utils";

interface PostProps {
  imgURL: string;
  displayname: string;
}

const Post = ({ imgURL, displayname }: PostProps) => {
  //TODO: Put Comments and Reactions on the design
  // Need backend
  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="w-full bg-secondary h-fit p-2 flex flex-col gap-y-4 rounded">
          {/* Header with user info */}
          <div className="flex gap-x-2 items-center">
            <img
              src={imgURL}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-semibold">
                {capitalizeFirstLetter(displayname)}
              </span>
              <span className="text-muted-foreground text-xs">26/06/2024</span>
            </div>
          </div>

          {/* Actual Post */}
          <div className="bg-pink-500 w-full rounded h-72 p-2"></div>
        </div>

        <div className="w-full bg-secondary h-fit p-2 flex flex-col gap-y-4 rounded">
          {/* Header with user info */}
          <div className="flex gap-x-2 items-center">
            <img
              src={imgURL}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-semibold">
                {capitalizeFirstLetter(displayname)}
              </span>
              <span className="text-muted-foreground text-xs">26/06/2024</span>
            </div>
          </div>

          {/* Actual Post */}
          <div className="bg-emerald-500 w-full rounded h-72 p-2"></div>
        </div>
      </div>
    </>
  );
};

export default Post;
