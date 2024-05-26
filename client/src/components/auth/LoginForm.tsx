import { Formik, Form as FormikForm, FormikHelpers, FormikProps } from "formik";
import LoginUserSchema from "../../schemas/login";
import InputField from "./InputField";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { loginUser } from "../../api/auth";

const LoginForm = () => {
  const handleSubmit = (
    { email, password }: any,
    { setSubmitting, setStatus }: FormikHelpers<any>
  ) => {
    setTimeout(async () => {
      try {
        const response = await loginUser(email, password);
        console.log(response);
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }, 2000);
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginUserSchema}
        onSubmit={handleSubmit}
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
