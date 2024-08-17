import { useNavbarContext } from "@/context/NavbarContext";
import { useUserContext } from "@/context/UserContext";
import { useModal } from "@/hooks/useModal";
import { usePost } from "@/hooks/usePost";
import { useProfile } from "@/hooks/useProfile";
import { capitalizeFirstLetter } from "@/utils/utils";

const CreatePost = () => {
  const { isAtHomePage } = usePost().endpoints;
  const { setModalOpen } = useModal();
  const { setShowPromptToLogin } = useNavbarContext();
  const { authenticatedUserObject } = useUserContext();
  const {
    displayname: authDisplayname,
    imgURL: authImgURL,
    userid,
  } = authenticatedUserObject;

  const { userObject } = useProfile();
  const { imgURL, displayname } = userObject || {};
  const anonAvatar = localStorage.getItem("anon_avatar");

  return (
    <>
      <div className="bg-secondary rounded ps-2 pe-4 py-2 flex items-center gap-x-3">
        <img
          src={
            isAtHomePage
              ? userid
                ? authImgURL
                : anonAvatar!
              : userid
              ? imgURL
              : anonAvatar! || anonAvatar!
          }
          alt={`${isAtHomePage ? authDisplayname : displayname}_photo`}
          className="w-10 h-10 rounded-full object-cover pointer-events-none"
        />

        <div
          className="bg-gray-500 hover:bg-gray-400 w-full rounded-xl py-1 px-4 cursor-pointer h-8 flex flex-col justify-center text-slate-300 hover:text-slate-100"
          onClick={() => {
            if (!userid) {
              setShowPromptToLogin(true);
              return;
            }
            setModalOpen("createpost");
          }}
        >
          <span className="text-xs md:text-sm ">{`Hi ${capitalizeFirstLetter(
            userid && isAtHomePage ? authDisplayname : displayname || "Anon"
          )}, share something!`}</span>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
