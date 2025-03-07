import { useFieldContext } from "../lib/form";

export function FileInput() {
  const field = useFieldContext<string>();

  return (
    <input
      type="file"
      onChange={(e) => field.handleChange(e.target.value)}
      value={field.state.value}
    />
  );
}
