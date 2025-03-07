import { createFileRoute } from "@tanstack/react-router";
import { Dialog, DialogClose, DialogContent } from "../../components/dialog";
import { useState } from "react";
import { Button } from "../../components/button";
import { PlusCircleIcon, PlusIcon, TrashIcon } from "lucide-react";
import { z } from "zod";
import { useAppForm } from "../../lib/form";

export const Route = createFileRoute("/_app/admin/works")({
  component: RouteComponent,
});

function RouteComponent() {
  const [open, setOpen] = useState(false);

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
      // Pass a schema or function to validate
      onChange: z.object({
        workName: z.string(),
        workLink: z.string().url("Invalid URL"),
        workDescription: z.string(),
        workImage: z.string(),
        workStatus: z.string(),
        workRepos: z.array(z.string().url("Invalid URL")),
      }),
    },
    onSubmit: ({ value }) => {
      // Do something with form data
      alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <div>
      <Dialog className="h-2/3" open={open}>
        <DialogContent>
          <div className="mb-4 text-xl font-semibold">Add Work</div>

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
                      <form.Field key={i} name={`workRepos[${i}]`}>
                        {(subField) => {
                          return (
                            <label className="flex flex-col gap-y-1">
                              <div>Link {i + 1}</div>
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
                                  onClick={() =>
                                    field.state.value.length > 1 &&
                                    field.removeValue(i)
                                  }
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
                    ))}
                    <Button
                      onClick={() => field.pushValue("")}
                      type="button"
                      className="bg-background/50 hover:bg-background/30 flex w-full justify-center"
                    >
                      <PlusCircleIcon className="text-white" />
                    </Button>
                  </div>
                )}
              </form.Field>

              <form.AppField
                name="workImage"
                children={(field) => <field.FileInput />}
              />
            </div>

            <form.AppForm>
              <form.Button className="mt-6" type="submit">
                Save
              </form.Button>
            </form.AppForm>
          </form>
        </DialogContent>

        <DialogClose>
          <Button className="mt-4 ml-auto w-fit" onClick={() => setOpen(false)}>
            <PlusIcon className="rotate-45" /> Close
          </Button>
        </DialogClose>
      </Dialog>

      <Button onClick={() => setOpen(true)}>
        <PlusCircleIcon className="h-5 w-5" /> Add Work
      </Button>
    </div>
  );
}
