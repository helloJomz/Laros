import { UserProfileObject } from "@/types/Profile";
import FavoriteGame from "./FavoriteGame";
import { useNavbarContext } from "@/context/NavbarContext";
import Bio from "./Bio";
import Genre from "./Genre";

type IntroProps = React.HTMLAttributes<HTMLDivElement> & {
  user: UserProfileObject;
};

const Intro = ({ user, className, ...rest }: IntroProps) => {
  const { userid } = user;
  const { windowWidth } = useNavbarContext();
  return (
    <>
      <div className={className} {...rest}>
        <h4 className="font-bold mb-4">Intro</h4>

        <div className="flex flex-col gap-y-4">
          <Bio />
          <Genre />
        </div>

        {windowWidth <= 1023 && <FavoriteGame userid={userid} />}
      </div>
    </>
  );
};

export default Intro;
