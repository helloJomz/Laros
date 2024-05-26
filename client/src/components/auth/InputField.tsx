import { useField } from "formik";
import { Input } from "../ui/input";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

const InputField = ({ label, ...props }: InputFieldProps) => {
  const [field, { error, touched }] = useField(props);

  return (
    <>
      <div>
        <h5>{label}</h5>
        <Input {...field} {...props} />
        {error && touched && (
          <span className="text-red-500 text-xs">{error}</span>
        )}
      </div>
    </>
  );
};

export default InputField;
