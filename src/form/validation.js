import isEmail from "validator/lib/isEmail";
import isAlphanumberic from "validator/lib/isAlphanumeric";
import isLength from "validator/lib/isLength";

export function email(value) {
  return value && !isEmail(value.trim()) ? "Invalid email" : null;
}

export function name(value) {
  if (value && !isAlphanumberic(value.trim()))
    return "Name can only contain letters and numbers.";
  else if (value && !isLength(value, { min: 6, max: undefined }))
    return "Name must be longer than 4 characters";
  else return null;
}

export function password(value) {
  if (value && !isAlphanumberic(value.trim()))
    return "Password can only contain letters and numbers.";
  else if (value && !isLength(value, { min: 6, max: undefined }))
    return "Password must be longer than 6 digits";
  else return null;
}

function isDirty(value) {
  return value || value === 0;
}

export function required(requiredFields, values) {
  return requiredFields.reduce(
    (fields, field) => ({
      ...fields,
      ...(isDirty(values[field]) ? undefined : { [field]: "Required" }),
    }),
    {}
  );
}
