import { Formik, Form as FormikForm, FormikProps, FormikHelpers } from "formik";
import SignupUserSchema from "../../schemas/signup";
import InputField from "./InputField";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCreateNewUserMutation } from "@/app/features/users/userAPI";
import { useSignupMutation } from "../../app/features/auth/authApiSlice";

const SignupForm = () => {
  const navigate = useNavigate();
  // const [createNewUser] = useCreateNewUserMutation();
  const [signup, { data }] = useSignupMutation();

  const handleSignUp = async (values: any, actions: FormikHelpers<any>) => {
    try {
      const response: any = await signup(values);

      console.log(response, values);

      // if (response.error && response.error.status === 400) {
      //   actions.setSubmitting(false);
      //   actions.setFieldError("email", response.error.data.error);
      //   return;
      // }

      // setTimeout(() => {
      //   actions.setSubmitting(false);
      //   navigate("/auth/login", { state: { success: true } });
      // }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          cpassword: "",
        }}
        validationSchema={SignupUserSchema}
        onSubmit={handleSignUp}
      >
        {({ isSubmitting }: FormikProps<any>) => (
          <FormikForm>
            <InputField name="firstname" type="text" label="First name" />
            <InputField name="lastname" type="text" label="Last name" />
            <InputField name="email" type="text" label="Email" />
            <InputField name="password" type="password" label="Password" />
            <InputField
              name="cpassword"
              type="password"
              label="Confirm Password"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex gap-x-2 items-center"
            >
              {isSubmitting && (
                <LoaderCircle size={16} className="animate-spin" />
              )}
              <span>{isSubmitting ? "Signing up..." : "Sign Up"} </span>
            </Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
