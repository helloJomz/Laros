import { useField } from "formik";
import { Input } from "../ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FC, useState } from "react";
import { capitalizeFirstLetter } from "@/utils/utils";
import { useLocation } from "react-router-dom";
import { BsBracesAsterisk } from "react-icons/bs";
import { FaCheckDouble } from "react-icons/fa";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const InputField: FC<InputFieldProps> = (props) => {
  const [field, { error, touched }] = useField(props.name!);

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  const location = useLocation();

  const isInSignup: boolean = location.pathname === "/signup";
  const isInLogin: boolean = location.pathname === "/login";

  if (props.type === "text")
    return (
      <>
        <div className="flex flex-col gap-y-2">
          <h5 className="text-sm">{capitalizeFirstLetter(props.label)}</h5>

          <Input {...field} {...props} type="text" />

          {error && touched && (
            <div className="flex gap-x-1 text-xs text-red-500 items-center">
              <BsBracesAsterisk />
              <span>{error}</span>
            </div>
          )}
        </div>
      </>
    );

  if (props.type === "password")
    return (
      <>
        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between items-center">
            <h5 className="text-sm">{capitalizeFirstLetter(props.label)}</h5>
            {props.name === "password" && !isInSignup && (
              <span className="text-xs text-sky-400 hover:underline cursor-pointer">
                Forgot password?
              </span>
            )}
          </div>

          <div className="relative">
            <Input
              {...field}
              {...props}
              type={isVisiblePassword ? "text" : "password"}
            />

            {!isVisiblePassword ? (
              <FaEye
                className="absolute top-3 right-4 text-muted-foreground cursor-pointer hover:text-white"
                onClick={() => setIsVisiblePassword(true)}
              />
            ) : (
              <FaEyeSlash
                className="absolute top-3 right-4 text-muted-foreground cursor-pointer hover:text-white"
                onClick={() => setIsVisiblePassword(false)}
              />
            )}
          </div>

          {error && touched && (
            <div className="flex gap-x-1 text-xs text-red-500 items-center">
              {isInLogin && <BsBracesAsterisk />}
              <span>{error}</span>
            </div>
          )}
        </div>
      </>
    );
};

export default InputField;
