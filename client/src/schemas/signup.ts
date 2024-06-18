import * as yup from "yup";

const SignupUserSchema = yup.object().shape({
  displayname: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "Display name can only contain letters.")
    .min(5, "Display name must be at least 5 characters long.")
    .required("Display name is required."),
  email: yup
    .string()
    .email("Invalid email address.")
    .required("Email is required.")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address."
    ),
  password: yup
    .string()
    .required("Password is required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character."
    ),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.")
    .required("Confirm password is required."),
});

export default SignupUserSchema;
