import LoginForm from "../components/auth/LoginForm";
import { useNavbarContext } from "@/context/NavbarContext";
import RandomGiphyGif from "@/components/auth/RandomGiphyGif";
import { TypeAnimation } from "react-type-animation";
import { CircleDashed } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const LoginPage = () => {
  const { windowWidth } = useNavbarContext();
  const isLargerScreens = windowWidth >= 1024;

  return (
    <>
      <Helmet>
        <title>Laros | Login </title>
      </Helmet>

      <div className="fixed top-0">
        <div className="p-2">
          <Link
            to={"/"}
            className="flex gap-x-2 items-center text-sm p-2 rounded hover:bg-primary"
          >
            <IoMdArrowRoundBack />
            Home
          </Link>
        </div>
      </div>

      <div
        className={`flex justify-center ${
          isLargerScreens ? "h-screen" : "mt-24"
        }`}
      >
        <div
          className={`p-4 flex flex-col gap-y-10 ${
            isLargerScreens ? "w-1/2 justify-center items-center" : "w-[20rem] "
          }`}
        >
          {/* Website logo */}
          <div className="text-center h-[5rem]">
            <TypeAnimation
              sequence={["Connect", 1000, "Communicate", 1000, "Laros"]}
              wrapper="h1"
              cursor={false}
              className="text-[2.75rem] leading-10 lg:text-6xl tracking-wide"
            />

            <h5 className="text-sm lg:text-sm mt-2">
              Where the gamers connect easily!
            </h5>
          </div>

          {/* Login Form */}
          <LoginForm />

          <div className="text-sm flex gap-x-1 justify-center">
            <span>New to Laros?</span>
            <Link to={"/signup"} className="text-sky-400 hover:underline">
              Create an account
            </Link>
          </div>

          {/* Footer */}
          <div className="flex gap-x-4 justify-center items-center text-xs text-muted-foreground">
            <div
              className="flex gap-x-1 items-center cursor-pointer hover:underline hover:text-white"
              onClick={() =>
                window.open("https://github.com/helloJomz", "_blank")
              }
            >
              <FaGithub />
              <span>GitHub</span>
            </div>
            <CircleDashed size={8} />
            <div
              className="flex gap-x-1 items-center cursor-pointer hover:underline hover:text-white"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/jomarkamante/",
                  "_blank"
                )
              }
            >
              <FaLinkedin />
              <span>LinkedIn</span>
            </div>
          </div>
        </div>
        {isLargerScreens && <RandomGiphyGif />}
      </div>
    </>
  );
};

export default LoginPage;
