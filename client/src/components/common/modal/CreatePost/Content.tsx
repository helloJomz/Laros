import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/context/UserContext";
import ImageContent from "./ImageContent";

const Content = ({ contentType }: { contentType: string }) => {
  const { authenticatedUserObject } = useUserContext();
  const { displayname } = authenticatedUserObject;

  return (
    <>
      <Textarea
        className="resize-none h-[7rem] p-0 bg-secondary border focus:border-none"
        placeholder={`Share what's on your mind, ${displayname}!`}
      />

      {contentType === "image" && <ImageContent />}
    </>
  );
};

export default Content;
