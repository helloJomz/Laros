import SignupForm from "../components/auth/SignupForm";
import { TypeAnimation } from "react-type-animation";

const SignupPage = () => {
  return (
    <>
      <div className="w-[24rem] m-auto mt-24 flex flex-col gap-y-20">
        <div className="h-24">
          <TypeAnimation
            sequence={["Hello there Gamer.", 500, "Welcome to Laros!"]}
            wrapper="h1"
            cursor={false}
            className="text-3xl leading-10 lg:text-6xl tracking-wide text-center"
          />
        </div>
        {/* TODO: Implement Upload Image */}
        <SignupForm />
      </div>
    </>
  );
};

export default SignupPage;
