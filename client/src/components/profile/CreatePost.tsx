interface CreatePostProps {
  imgURL: string;
}

const CreatePost = ({ imgURL }: CreatePostProps) => {
  return (
    <>
      <div className="bg-secondary rounded ps-2 pe-4 py-2 flex items-center gap-x-4">
        <img
          src={imgURL}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="bg-gray-500 hover:bg-gray-400 w-full rounded py-1 px-2 cursor-pointer">
          <span className="text-sm">Share something!</span>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
