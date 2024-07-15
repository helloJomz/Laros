import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/context/UserContext";
import { usePost } from "@/hooks/usePost";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/utils/utils";
import { X } from "lucide-react";

const Content = () => {
  const { authenticatedUserObject } = useUserContext();
  const { displayname } = authenticatedUserObject;

  const { usePreviewImg, setPreviewImg, setPreviewContent } = usePost();

  return (
    <>
      <div
        className={cn(" overflow-y-auto lg:pe-1", {
          "max-h-72": usePreviewImg,
        })}
      >
        <Textarea
          className="resize-none p-0 bg-secondary border rounded-none"
          placeholder={`Share what's on your mind, ${capitalizeFirstLetter(
            displayname
          )}!`}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPreviewContent(e.target.value)
          }
        />

        {usePreviewImg && (
          <>
            <div className="relative border border-slate-600 rounded-lg p-2">
              <img src={usePreviewImg} className="rounded w-full" />
              <div
                className="absolute top-4 right-4 rounded-full bg-slate-600 hover:bg-slate-500 border border-slate-400 border-opacity-30 cursor-pointer w-8 h-8 flex justify-center items-center"
                onClick={() => setPreviewImg("")}
              >
                <X size={18} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Content;
