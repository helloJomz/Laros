import { Formik, Form as FormikForm, FormikProps } from "formik";
import SignupUserSchema from "../../schemas/signup";
import InputField from "./InputField";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useSignupMutation,
  useCheckIfDisplayNameExistsMutation,
  useCheckIfEmailExistsMutation,
} from "../../app/features/auth/authApiSlice";
import { useState } from "react";
import { FaCheckDouble } from "react-icons/fa";
import { BsBracesAsterisk } from "react-icons/bs";
import { setCredentials } from "@/app/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signup] = useSignupMutation();
  const [checkIfDisplayNameExists] = useCheckIfDisplayNameExistsMutation();
  const [checkIfEmailExists] = useCheckIfEmailExistsMutation();

  const [validationEmailError, setValidationEmailError] = useState<{
    error: boolean;
    msg?: string | null;
  }>({
    error: false,
  });

  const [validationDisplayNameError, setValidationDisplayNameError] = useState<{
    error: boolean;
    msg?: string | null;
  }>({
    error: false,
  });

  const [notify, setNotify] = useState<boolean>(false);

  const handleSignUp = async (values: any) => {
    try {
      const response = await signup(values);
      const data = response.data;
      dispatch(
        setCredentials({
          user: {
            userid: data.userObj._id,
            displayname: data.userObj.displayname,
            imgURL: data.userObj.imgURL,
          },
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const debounceEmailCheck = useDebouncedCallback(
    async (value: string) => {
      const { error } = await checkIfEmailExists(value);
      if (error) {
        setValidationEmailError({
          error: true,
          msg: "Email is already taken.",
        });
      } else {
        setValidationEmailError({ error: false });
      }
    },

    400
  );

  const debounceDisplaynameCheck = useDebouncedCallback(
    async (value: string) => {
      const { error } = await checkIfDisplayNameExists(value);
      if (error) {
        setValidationDisplayNameError({
          error: true,
          msg: "Displayname is already taken.",
        });
      } else {
        setValidationDisplayNameError({
          error: false,
        });
      }
    },
    400
  );

  return (
    <div className="px-6 flex flex-col gap-y-2">
      {notify && (
        <div className="bg-red-200 p-2 rounded text-red-500 text-sm text-center mb-4">
          <span>Check for errors, and please try again.</span>
        </div>
      )}

      <Formik
        initialValues={{
          displayname: "",
          email: "",
          password: "",
          cpassword: "",
        }}
        validationSchema={SignupUserSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(async () => {
            setNotify(false);
            setSubmitting(true);
            if (
              validationDisplayNameError.error ||
              validationEmailError.error
            ) {
              setNotify(true);
              setSubmitting(false);
              return;
            }
            await handleSignUp(values);
            resetForm();

            setSubmitting(false);
            navigate("/upload/avatar", {
              state: { from: "/signup", isNew: true },
            });
          }, 2000);
        }}
      >
        {({
          isSubmitting,
          setFieldValue,
          errors,
          touched,
          values,
        }: FormikProps<any>) => (
          <FormikForm>
            <div className="flex flex-col gap-y-5 ">
              <div className="relative flex flex-col gap-y-2">
                <InputField
                  name="email"
                  type="text"
                  label="Enter your Email."
                  placeholder="e.g. example@gmail.com"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFieldValue("email", value);
                    debounceEmailCheck(value);
                  }}
                  className={
                    validationEmailError.error === false &&
                    values.email &&
                    !errors.email
                      ? "border border-green-500"
                      : ""
                  }
                />

                {values.email &&
                  validationEmailError.error === true &&
                  !errors.email && (
                    <div className="flex gap-x-1 text-xs text-red-500 items-center">
                      <BsBracesAsterisk />
                      <span>{validationEmailError.msg}</span>
                    </div>
                  )}

                {values.email &&
                  validationEmailError.error === false &&
                  !errors.email && (
                    <div className="absolute top-10 right-3 text-green-500">
                      <FaCheckDouble />
                    </div>
                  )}
              </div>

              <div className="relative flex flex-col gap-y-2">
                <InputField
                  name="displayname"
                  type="text"
                  label="Create your Display Name"
                  placeholder="e.g. laros"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFieldValue("displayname", value);
                    debounceDisplaynameCheck(value);
                  }}
                  className={
                    validationDisplayNameError.error === false &&
                    values.displayname &&
                    !errors.displayname
                      ? "border border-green-500"
                      : ""
                  }
                />

                {values.displayname &&
                  validationDisplayNameError.error === true &&
                  !errors.displayname && (
                    <div className="flex gap-x-1 text-xs text-red-500 items-center">
                      <BsBracesAsterisk />
                      <span>{validationEmailError.msg}</span>
                    </div>
                  )}

                {values.displayname &&
                  validationDisplayNameError.error === false &&
                  !errors.displayname && (
                    <div className="absolute top-10 right-3 text-green-500">
                      <FaCheckDouble />
                    </div>
                  )}
              </div>

              <InputField
                name="password"
                type="password"
                label="Password"
                className={
                  touched && !errors.password && values.password
                    ? "border border-green-500"
                    : ""
                }
              />
              <InputField
                name="cpassword"
                type="password"
                label="Confirm Password"
                className={
                  touched && !errors.cpassword && values.cpassword
                    ? "border border-green-500"
                    : ""
                }
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
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
