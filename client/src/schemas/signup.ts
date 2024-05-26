import * as yup from "yup";

const SignupUserSchema = yup.object().shape({
  firstname: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "First name can only contain letters.")
    .min(5, "First name must be at least 5 characters long.")
    .required("First name is required."),
  lastname: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "Last name can only contain letters.")
    .min(2, "Last name must be at least 2 characters long.")
    .required("Last name is required."),
  email: yup
    .string()
    .email("Invalid email address.")
    .required("Email is required."),
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
