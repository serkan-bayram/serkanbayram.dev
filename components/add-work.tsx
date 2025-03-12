import { useState } from "react";
import { PlusCircleIcon, TrashIcon } from "lucide-react";
import { z } from "zod";
import { useAppForm } from "./form-elements/form-hook";
import { Dialog } from "./dialog";
import { Button } from "./button";
import { Error } from "./form-elements/error";
import { useSaveWorkMutation } from "../lib/api/mutations";
import { cn } from "../lib/cn";

const saveWorkSchema = z.object({
  workName: z.string(),
  workLink: z.string().url("Invalid URL"),
  workDescription: z.string(),
  workImage: z.string(),
  workStatus: z.string(),
  workRepos: z.array(z.string().url("Invalid URL")),
});

export type SaveWork = z.infer<typeof saveWorkSchema>;

export function AddWork() {
  const [open, setOpen] = useState(false);

  const saveMutation = useSaveWorkMutation();

  const form = useAppForm({
    defaultValues: {
      workName: "",
      workLink: "",
      workDescription: "",
      workImage: "",
      workStatus: "",
      workRepos: [""] as string[],
    },
    validators: {
      onChange: saveWorkSchema,
    },
    onSubmit: async ({ value }) => {
      saveMutation.mutate(value);
    },
  });

  return (
    <>
      <Dialog className="h-3/4" open={open} setOpen={setOpen}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <form.AppField
              name="workName"
              children={(field) => (
                <field.TextInput label="Name" placeholder="TypeRace" />
              )}
            />

            <form.AppField
              name="workLink"
              children={(field) => (
                <field.TextInput
                  label="Link"
                  placeholder="https://typerace.serkanbayram.dev/"
                />
              )}
            />

            <form.AppField
              name="workDescription"
              children={(field) => (
                <field.Textarea
                  containerClassName="col-span-2"
                  className="h-36"
                  label="Description"
                  placeholder="A web application that you can create rooms and race with your friends to see who types faster. ⌨️"
                />
              )}
            />

            <form.AppField
              name="workStatus"
              children={(field) => (
                <field.TextInput label="Status" placeholder="in progress" />
              )}
            />

            <form.Field name="workRepos" mode="array">
              {(field) => (
                <div className="flex flex-col gap-3">
                  {field.state.value.map((_, i) => (
                    <div key={i}>
                      <form.Field name={`workRepos[${i}]`}>
                        {(subField) => {
                          return (
                            <label className="flex flex-col gap-y-1">
                              <div>Repo Link {i + 1}</div>
                              <div className="flex items-center gap-x-2">
                                <input
                                  placeholder="https://github.com/serkan-bayram/type-race-frontend"
                                  className="bg-background text-text min-w-64 flex-1 rounded-lg p-2"
                                  value={subField.state.value}
                                  onChange={(e) =>
                                    subField.handleChange(e.target.value)
                                  }
                                />

                                <Button
                                  onClick={() => field.removeValue(i)}
                                  className="flex aspect-square h-7 items-center justify-center bg-inherit p-0 hover:bg-inherit"
                                  type="button"
                                >
                                  <TrashIcon className="h-5 w-5 text-white" />
                                </Button>
                              </div>
                            </label>
                          );
                        }}
                      </form.Field>

                      {/* TODO: Does not work properly */}
                      <form.Subscribe
                        selector={(f) => f.fieldMeta[`workRepos[${i}]`]}
                        children={(fieldMeta) => {
                          return <Error fieldMeta={fieldMeta} />;
                        }}
                      />
                    </div>
                  ))}
                  <Button
                    onClick={() => field.pushValue("")}
                    type="button"
                    className={cn(
                      "bg-background/50 hover:bg-background/30 flex w-full justify-center",
                      {
                        "mt-auto": field.state.value.length === 0,
                      },
                    )}
                  >
                    <PlusCircleIcon className="text-white" />
                  </Button>
                </div>
              )}
            </form.Field>

            <form.AppField
              name="workImage"
              children={(field) => (
                <field.FileInput
                  accept="image/*"
                  containerClassName="col-span-2"
                />
              )}
            />
          </div>

          <form.AppForm>
            <form.Button
              className="my-6 ml-auto"
              type="submit"
              disabled={saveMutation.isPending}
            >
              {saveMutation.isPending ? "Saving..." : "Save"}
            </form.Button>
          </form.AppForm>
        </form>
      </Dialog>
      <Button onClick={() => setOpen(true)}>
        <PlusCircleIcon className="h-5 w-5" /> Add Work
      </Button>
    </>
  );
}
