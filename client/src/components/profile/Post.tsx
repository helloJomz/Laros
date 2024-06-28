import CreatePost from "./CreatePost";
import PostView from "./PostView";
import { type UserProfileObject } from "@/types/Profile";

type PostProps = React.HTMLAttributes<HTMLDivElement> & {
  user: UserProfileObject;
};

const Post = ({ user, className, ...rest }: PostProps) => {
  return (
    <>
      <div className={className} {...rest}>
        <CreatePost {...user} />
        <PostView {...user} />
      </div>
    </>
  );
};

export default Post;
