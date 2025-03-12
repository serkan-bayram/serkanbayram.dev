import { useState } from "react";
import { Edit2Icon, PlusCircleIcon, TrashIcon } from "lucide-react";
import { useAppForm } from "./form-elements/form-hook";
import { Dialog } from "./dialog";
import { Button } from "./button";
import { Error } from "./form-elements/error";
import { useUpdateWorkMutation } from "../lib/api/mutations";
import { cn } from "../lib/cn";
import { saveWorkSchema, WorkItem } from "../lib/schemas";
import { useAuth } from "../src/AuthProvider";
import { DeleteWork } from "./delete-work";

export function UpdateWork({
  id,
  name,
  link,
  description,
  imageSource,
  status,
  repoLinks,
}: WorkItem) {
  const [open, setOpen] = useState(false);

  const updateMutation = useUpdateWorkMutation();

  const form = useAppForm({
    defaultValues: {
      workName: name,
      workDescription: description,
      workLink: link ?? "",
      workImage: imageSource ?? "",
      workStatus: status ?? "",
      workRepos: repoLinks as string[],
    },
    validators: {
      onChange: saveWorkSchema,
    },
    onSubmit: async ({ value }) => {
      updateMutation.mutate({ work: value, workId: id });
    },
  });

  console.log(updateMutation.error);

  const { isAuthenticated } = useAuth();

  //   if (!isAuthenticated) return null;

  return (
    <>
      <Dialog
        className="h-3/4"
        open={open}
        setOpen={setOpen}
        title="Update Work"
      >
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

          <div className="flex items-center">
            <DeleteWork workId={id} />

            <form.AppForm>
              <form.Button
                className="my-6 ml-auto"
                type="submit"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? "Saving..." : "Save"}
              </form.Button>
            </form.AppForm>
          </div>
        </form>
      </Dialog>
      <button
        onClick={() => setOpen(true)}
        className="bg-text text-background w-fit cursor-pointer rounded-full p-1"
      >
        <Edit2Icon />
      </button>
    </>
  );
}
