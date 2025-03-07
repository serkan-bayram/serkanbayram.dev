import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { TextInput } from "../components/text-input";
import { Button } from "../components/button";
import { Textarea } from "../components/textarea";
import { FileInput } from "../components/file-input";

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
