import * as yup from "yup";

const LoginUserSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address.")
    .required("Email is required."),
  password: yup.string().required("Password is required."),
});

export default LoginUserSchema;
