import { Formik, Form as FormikForm, FormikProps, FormikHelpers } from "formik";
import SignupUserSchema from "../../schemas/signup";
import { createUser } from "../../api/auth";
import InputField from "./InputField";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (values: any, actions: FormikHelpers<any>) => {
    setTimeout(async () => {
      try {
        const response: any = await createUser(values);

        if (response.status === 400) {
          actions.setSubmitting(false);
          actions.setFieldError("email", response.data.error);
        } else {
          actions.setSubmitting(false);
          setTimeout(() => {
            navigate("/auth/login", { state: { success: true } });
          }, 1000);
        }
      } catch (error) {
        console.error(error);
        actions.setSubmitting(false);
      }
    }, 2000);
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
        onSubmit={handleSubmit}
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
              <span>{isSubmitting ? "Processing..." : "Sign Up"} </span>
            </Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
