import { Field, ErrorMessage } from "formik";

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  as,
  children,
}) => {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">{label}</label>

      <Field
        className="form-control"
        name={name}
        type={type}
        placeholder={placeholder}
        as={as}
      >
        {children}
      </Field>

      <ErrorMessage
        name={name}
        component="div"
        className="text-danger small mt-1"
      />
    </div>
  );
};

export default InputField;