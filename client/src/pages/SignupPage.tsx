import { Helmet } from "react-helmet-async";
import SignupForm from "../components/auth/SignupForm";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const SignupPage = () => {
  return (
    <>
      <Helmet>
        <title>Laros | Create an Account </title>
      </Helmet>

      <div className="w-[24rem] m-auto mt-24 flex flex-col gap-y-4 lg:gap-y-20 ">
        <div className="h-24 text-center text-6xl">
          <h1>Laros</h1>
        </div>
        <div className="px-8">
          <SignupForm />
        </div>

        <div className="flex gap-x-1 text-xs md:text-sm justify-center">
          <span>Already have an account?</span>
          <Link to={"/login"} className="text-sky-400 hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
