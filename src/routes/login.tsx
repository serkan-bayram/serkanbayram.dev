import { createFileRoute } from "@tanstack/react-router";
import { useAppForm } from "../../components/form-elements/form-hook";
import { z } from "zod";
import { useLoginMutation } from "../../lib/api/mutations";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const mutation = useLoginMutation();

  const form = useAppForm({
    defaultValues: {
      password: "",
    },
    validators: {
      onChange: z.object({
        password: z.string().min(1),
      }),
    },
    onSubmit: ({ value }) => {
      mutation.mutate(value.password);
    },
  });

  return (
    <div className="flex min-h-[100dvh] items-center justify-center">
      <form
        className="flex w-1/4 flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.AppField
          name="password"
          children={(field) => (
            <>
              <field.TextInput
                className="bg-background-light"
                label="Password"
                type="password"
              />
            </>
          )}
        />

        <form.AppForm>
          <form.Button disabled={mutation.isPending}>Login</form.Button>
        </form.AppForm>
      </form>
    </div>
  );
}
