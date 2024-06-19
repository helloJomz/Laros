import SignupForm from "../components/auth/SignupForm";
import { TypeAnimation } from "react-type-animation";

const SignupPage = () => {
  return (
    <>
      {/* TODO: Design this! */}
      <div className="w-[24rem] m-auto mt-24 flex flex-col gap-y-4 lg:gap-y-20">
        <div className="h-24 text-center text-6xl">
          <h1>Laros</h1>
        </div>
        <div className="px-8">
          <SignupForm />
        </div>
      </div>
    </>
  );
};

export default SignupPage;
