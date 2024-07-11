import { useProfileContext } from "@/context/ProfileContext";
import CreatePost from "./CreatePost";
import PostView from "./PostView";

type PostProps = React.HTMLAttributes<HTMLDivElement>;

const Post = ({ className, ...rest }: PostProps) => {
  const { isAuthProfile } = useProfileContext();
  return (
    <>
      <div className={className} {...rest}>
        {isAuthProfile && <CreatePost />}
        <PostView />
      </div>
    </>
  );
};

export default Post;
