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
  const { setTriggerAlertFooter } = useNavbarContext();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = (
    value: any,
    { setSubmitting }: FormikHelpers<any>
  ) => {
    setTimeout(async () => {
      setSubmitting(true);
      const response = await login(value);
      if (response) {
        const data = response.data;
        dispatch(
          setCredentials({
            accessToken: data.gqeRxt3B9mZ2i.ks23kfm,
            user: {
              userid: data.userid,
              firstname: data.firstname,
              lastname: data.lastname,
            },
          })
        );
        setSubmitting(false);
        setTriggerAlertFooter({
          trigger: "login",
          title: "Welcome back, Gamer!",
          desc: "Dive back into the action and connect with your friends!",
        });
        navigate("/");
      } else {
        setSubmitting(false);
      }
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
            {status}
            <InputField type="text" label="Email" name="email" />
            <InputField type="password" label="Password" name="password" />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex gap-x-2 items-center"
            >
              {isSubmitting && (
                <LoaderCircle size={16} className="animate-spin" />
              )}
              <span>{isSubmitting ? "Processing..." : "Login"} </span>
            </Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
