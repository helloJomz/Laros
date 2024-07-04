import FavoriteGame from "./FavoriteGame";
import { useNavbarContext } from "@/context/NavbarContext";
import Bio from "./Bio";
import Genre from "./Genre";
import { useProfileContext } from "@/context/ProfileContext";

type IntroProps = React.HTMLAttributes<HTMLDivElement>;

const Intro = ({ className, ...rest }: IntroProps) => {
  const { windowWidth } = useNavbarContext();
  return (
    <>
      <div className={className} {...rest}>
        <h4 className="font-bold mb-4">About</h4>

        <div className="flex flex-col gap-y-4">
          <Bio />
          <Genre />
        </div>

        {windowWidth <= 1023 && <FavoriteGame />}
      </div>
    </>
  );
};

export default Intro;
