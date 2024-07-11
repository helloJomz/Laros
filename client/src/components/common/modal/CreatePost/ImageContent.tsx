import CloseButton from "../../CloseButton";

const ImageContent = () => {
  return (
    <>
      <div className="bg-secondary w-[90%] h-[80%] md:w-1/2 md:h-fit xl:w-[23%] rounded shadow-lg p-4 flex flex-col gap-y-4">
        <div className="flex justify-between items-center border border-b-slate-600 pb-2">
          <h1 className="text-base lg:text-lg font-semibold">Create Post</h1>
          <CloseButton />
        </div>
        <span>Hi</span>
        <div className="border border-slate-600 rounded-lg h-24">asdas</div>
      </div>
    </>
  );
};

export default ImageContent;
