import { Helmet } from "react-helmet-async";
import SignupForm from "../components/auth/SignupForm";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <>
      <Helmet>
        <title>Laros | Create an Account </title>
      </Helmet>

      <div className="w-full h-screen md:w-[24rem] m-auto  flex flex-col justify-center gap-y-4   ">
        <div className="h-12 md:h-24 text-center text-4xl md:text-6xl">
          <h1>Laros</h1>
        </div>

        <SignupForm />

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
