import CreatePost from "./CreatePost";
import PostView from "./PostView";
import { useProfile } from "@/hooks/useProfile";

type PostProps = React.HTMLAttributes<HTMLDivElement>;

const Post = ({ className, ...rest }: PostProps) => {
  const { isAuthProfile } = useProfile();
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
