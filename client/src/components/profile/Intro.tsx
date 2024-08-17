import FavoriteGame from "./FavoriteGame";
import { useNavbarContext } from "@/context/NavbarContext";
import Bio from "./Bio";
import Genre from "./Genre";

type IntroProps = React.HTMLAttributes<HTMLDivElement>;

const Intro = ({ className, ...rest }: IntroProps) => {
  const { windowWidth } = useNavbarContext();

  return (
    <>
      <div className={className} {...rest}>
        <div className="flex flex-col gap-y-4">
          <h4 className={`font-bold`}>About</h4>
          <Bio />
          <Genre />
        </div>

        {windowWidth <= 1023 && <FavoriteGame />}
      </div>
    </>
  );
};

export default Intro;
