import { Formik, Form as FormikForm, FormikHelpers, FormikProps } from "formik";
import LoginUserSchema from "../../schemas/login";
import InputField from "./InputField";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { useLoginMutation } from "@/app/features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/app/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useNavbarContext } from "@/context/NavbarContext";

const LoginForm = () => {
  const { setTriggerAlertFooter, windowWidth } = useNavbarContext();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLargerScreens = windowWidth >= 1024;

  const handleLoginSubmit = (
    value: any,
    { setSubmitting, setStatus }: FormikHelpers<any>
  ) => {
    setTimeout(async () => {
      setSubmitting(true);
      const response = await login(value);
      const errorMsg = response.error as { data: { error: string } };
      if (response.error) {
        setStatus(errorMsg.data.error);
      } else {
        const data = response.data;
        if (data) {
          dispatch(
            setCredentials({
              user: {
                userid: data._id,
                displayname: data.displayname,
                ...(data.imgURL && { imgURL: data.imgURL }),
              },
            })
          );
          setTriggerAlertFooter({
            trigger: "login",
            title: "Welcome back, Gamer!",
            desc: "Dive back into the action and connect with your friends!",
          });
          localStorage.removeItem("anonUuid");
          navigate("/");
        }
      }
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginUserSchema}
        onSubmit={handleLoginSubmit}
      >
        {({ isSubmitting, status }: FormikProps<any>) => (
          <FormikForm>
            <div
              className={`flex flex-col gap-y-5 ${
                isLargerScreens && "w-[24rem]"
              }`}
            >
              {status && (
                <div className="bg-red-200 rounded p-2 text-red-500 text-sm font-semibold text-center">
                  <span>{`${status}.`}</span>
                </div>
              )}

              <InputField name="email" type="text" label="Email" />
              <InputField name="password" type="password" label="Password" />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex gap-x-2 items-center w-full"
              >
                {isSubmitting && (
                  <LoaderCircle size={16} className="animate-spin" />
                )}
                <span>{isSubmitting ? "Logging In..." : "Log In"} </span>
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
