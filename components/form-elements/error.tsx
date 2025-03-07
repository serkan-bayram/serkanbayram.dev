import { AnyFieldMeta } from "@tanstack/react-form";

export function Error({ fieldMeta }: { fieldMeta: AnyFieldMeta }) {
  if (!fieldMeta) return null;

  return fieldMeta.errors.length > 0 && fieldMeta.isTouched ? (
    <em className="text-red-600" role="alert">
      {fieldMeta.errors[0]?.message}
    </em>
  ) : null;
}
