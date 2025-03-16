import { Dispatch, SetStateAction } from "react";
import { PlusCircleIcon, TrashIcon } from "lucide-react";
import { useAppForm } from "../form-elements/form-hook";
import { Dialog } from "../dialog";
import { Button } from "../button";
import { Error } from "../form-elements/error";
import {
  useDeleteWorkMutation,
  useSaveWorkMutation,
  useUpdateWorkMutation,
} from "../../lib/api/mutations";
import { cn } from "../../lib/cn";
import { saveWorkSchema, WorkItem } from "../../lib/schemas";
import { useStore } from "@tanstack/react-form";

// If workItem is defined, we are doing an update
export function WorkDialog({
  workItem,
  open,
  setOpen,
}: {
  workItem?: WorkItem;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { form, deleteMutation, isSavePending } = useWorkForm(
    setOpen,
    workItem,
  );

  return (
    <Dialog
      className="h-3/4"
      open={open}
      setOpen={setOpen}
      title={workItem ? "Update Work" : "Add Work"}
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

          <form.Subscribe
            selector={(state) => state.values.workImage}
            children={(workImage) => (
              <form.AppField
                name="workImage"
                children={(field) => (
                  <>
                    <field.FileInput
                      accept="image/*"
                      containerClassName="col-span-2"
                    />
                    {workImage && (
                      <Button
                        className="text-danger hover:text-danger-light"
                        variant="link"
                        onClick={() => field.setValue("")}
                      >
                        Remove Image
                      </Button>
                    )}
                  </>
                )}
              />
            )}
          />
        </div>

        <div className="flex items-center justify-between">
          {workItem && (
            <Button
              className="text-danger hover:text-danger-light"
              variant="link"
              onClick={() =>
                deleteMutation.mutate(workItem.id, {
                  onSuccess: () => {
                    setOpen(false);
                    form.reset();
                  },
                })
              }
              disabled={deleteMutation.isPending}
            >
              Delete Work
            </Button>
          )}

          <form.AppForm>
            <form.Button
              className="my-6 ml-auto"
              type="submit"
              disabled={isSavePending}
            >
              Save
            </form.Button>
          </form.AppForm>
        </div>
      </form>
    </Dialog>
  );
}

function useWorkForm(
  setOpen: Dispatch<SetStateAction<boolean>>,
  workItem?: WorkItem,
) {
  const saveMutation = useSaveWorkMutation();
  const updateMutation = useUpdateWorkMutation();
  const deleteMutation = useDeleteWorkMutation();

  const isPending = saveMutation.isPending || updateMutation.isPending;

  const form = useAppForm({
    defaultValues: getDefaultValues(workItem),
    validators: {
      onSubmit: saveWorkSchema,
      onChange: saveWorkSchema,
    },
    onSubmit: async ({ value }) => {
      if (workItem) {
        updateMutation.mutate(
          { work: value, workId: workItem.id },
          {
            onSuccess: () => {
              setOpen(false);
              form.reset();
            },
          },
        );
      } else {
        saveMutation.mutate(value, {
          onSuccess: () => {
            setOpen(false);
            form.reset();
          },
        });
      }
    },
  });

  return {
    deleteMutation: deleteMutation,
    isSavePending: isPending,
    form: form,
  };
}

function getDefaultValues(workItem?: WorkItem) {
  if (workItem) {
    {
      return {
        workName: workItem.name,
        workDescription: workItem.description,
        workLink: workItem.link ?? "",
        workImage: workItem.imageSource ?? "",
        workStatus: workItem.status ?? "",
        workRepos: workItem.repoLinks as string[],
      };
    }
  }

  return {
    workName: "",
    workDescription: "",
    workLink: "",
    workImage: "",
    workStatus: "",
    workRepos: [""] as string[],
  };
}
