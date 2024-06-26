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
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { FaCheckDouble } from "react-icons/fa";
import { BsBracesAsterisk } from "react-icons/bs";
import { setCredentials } from "@/app/features/auth/authSlice";
import { useDispatch } from "react-redux";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signup] = useSignupMutation();
  const [checkIfDisplayNameExists] = useCheckIfDisplayNameExistsMutation();
  const [checkIfEmailExists] = useCheckIfEmailExistsMutation();

  const [emailValue, setEmailValue] = useState<string | null>(null);
  const [displayNameValue, setDisplayNameValue] = useState<string | null>(null);

  const { debouncedValue: debouncedEmailValue } = useDebounce(emailValue);
  const { debouncedValue: debouncedDisplayNameValue } =
    useDebounce(displayNameValue);

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

  const handleSignUp = async (values: any) => {
    try {
      const response = await signup(values);
      const data = response.data;
      dispatch(
        setCredentials({
          accessToken: data.gqeRxt3B9mZ2i.ks23kfm,
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

  useEffect(() => {
    const executeEmailChecking = async () => {
      const val: string = debouncedEmailValue!;
      const res: any = await checkIfEmailExists(val);
      if (res.error) {
        setValidationEmailError({
          error: true,
          msg: res.error.data.error,
        });
      }
    };

    if (debouncedEmailValue) executeEmailChecking();

    return () => {
      setValidationEmailError({
        error: false,
        msg: null,
      });
    };
  }, [debouncedEmailValue]);

  useEffect(() => {
    const executeDisplayNameChecking = async () => {
      const val: string = debouncedDisplayNameValue!;
      const res: any = await checkIfDisplayNameExists(val);

      if (res.error) {
        setValidationDisplayNameError({
          error: true,
          msg: res.error.data.error,
        });
      }
    };

    if (debouncedDisplayNameValue) executeDisplayNameChecking();

    return () => {
      setValidationDisplayNameError({
        error: false,
        msg: null,
      });
    };
  }, [debouncedDisplayNameValue]);

  return (
    <div>
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
            setSubmitting(true);
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
                    setEmailValue(value);
                  }}
                  className={
                    touched &&
                    !errors.email &&
                    validationEmailError.error === false &&
                    !validationEmailError.msg &&
                    emailValue
                      ? "border border-green-500"
                      : ""
                  }
                />

                {touched &&
                  validationEmailError.error === true &&
                  validationEmailError.msg && (
                    <div className="flex gap-x-1 text-xs text-red-500 items-center">
                      <BsBracesAsterisk />
                      <span>{validationEmailError.msg}</span>
                    </div>
                  )}

                {touched &&
                  !errors.email &&
                  validationEmailError.error === false &&
                  !validationEmailError.msg &&
                  emailValue && (
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
                    setDisplayNameValue(value);
                  }}
                  className={
                    touched &&
                    !errors.displayname &&
                    validationDisplayNameError.error === false &&
                    !validationDisplayNameError.msg &&
                    displayNameValue
                      ? "border border-green-500"
                      : ""
                  }
                />

                {touched &&
                  validationDisplayNameError.error === true &&
                  validationDisplayNameError.msg && (
                    <div className="flex gap-x-1 text-xs text-red-500 items-center">
                      <BsBracesAsterisk />
                      <span>{validationDisplayNameError.msg}</span>
                    </div>
                  )}

                {touched &&
                  !errors.displayname &&
                  validationDisplayNameError.error === false &&
                  !validationDisplayNameError.msg &&
                  displayNameValue && (
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
