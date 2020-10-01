import isEmail from "validator/lib/isEmail";
import isAlphanumberic from "validator/lib/isAlphanumeric";

export function email(value) {
  return value && !isEmail(value.trim()) ? "Invalid email" : null;
}

export function name(value) {
  return value && !isAlphanumberic(value.trim())
    ? "Name can only contain letters and numbers"
    : null;
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
