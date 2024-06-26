import { Button } from "../ui/button";

const Intro = () => {
  return (
    <>
      <div className="bg-secondary rounded px-2 pt-2 pb-4 md:w-[30%] h-fit">
        <h4 className="font-bold mb-4">Intro</h4>

        <div className="flex flex-col gap-y-4">
          <Button className="w-full">Add Bio</Button>
          <Button className="w-full">Add Genre</Button>
        </div>
      </div>
    </>
  );
};

export default Intro;
