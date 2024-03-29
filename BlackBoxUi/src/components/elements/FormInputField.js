import { TextField } from "@mui/material";

const FormInputField = ({
  label,
  type,
  fullWidth,
  onChange,
  name,
  value,
  error,
  required,
}) => {
  return (
    <div>
      <TextField
        label={label}
        type={type}
        fullWidth={fullWidth}
        name={name}
        value={value}
        required={required}
        onChange={(e) => {
          if (type === "file") {
            return onChange(name, e.target.files[0]);
          }
          if (type === "tel") {
            return onChange({
              ...e,
              target: {
                ...e.target,
                value: e.target.value.replace(/[^0-9]/g, ``),
                name: e.target.name,
              },
            });
          }
          return onChange(e);
        }}
        error={error}
        helperText={Boolean(error) && error}
      />
    </div>
  );
};
export default FormInputField;
