export const validateInputs = fields =>
  fields.every(field => field.value !== "");