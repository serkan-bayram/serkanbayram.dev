import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { Button } from "../button";
import { Textarea } from "./textarea";
import { FileInput } from "./file-input";
import { TextInput } from "./text-input";

export const { fieldContext, formContext, useFieldContext } =
  createFormHookContexts();

// Allow us to bind components to the form to keep type safety but reduce production boilerplate
// Define this once to have a generator of consistent form instances throughout your app
export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextInput,
    Textarea,
    FileInput,
  },
  formComponents: {
    Button,
  },

  fieldContext,
  formContext,
});
