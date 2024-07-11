import { useProfileContext } from "@/context/ProfileContext";
import { capitalizeFirstLetter } from "@/utils/utils";
import { useDispatch } from "react-redux";
import { setModal } from "@/app/features/profile/profileSlice";

const CreatePost = () => {
  const dispatch = useDispatch();
  const { userProfileObject } = useProfileContext();
  const { userid, imgURL, displayname } = userProfileObject || {};

  return (
    <>
      <div className="bg-secondary rounded ps-2 pe-4 py-2 flex items-center gap-x-3">
        <img
          src={imgURL}
          alt={`${displayname}_photo`}
          className="w-10 h-10 rounded-full object-cover pointer-events-none"
        />

        <div
          className="bg-gray-500 hover:bg-gray-400 w-full rounded-xl py-1 px-4 cursor-pointer h-8 flex flex-col justify-center text-slate-300 hover:text-slate-100"
          onClick={() => dispatch(setModal({ modal: "createpost" }))}
        >
          <span className="text-xs md:text-sm ">{`Hi ${
            displayname && capitalizeFirstLetter(displayname)
          }, share something!`}</span>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
