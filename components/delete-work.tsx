import { useState } from "react";
import { Button } from "./button";
import { Dialog } from "./dialog";
import { useDeleteWorkMutation } from "../lib/api/mutations";
import { WorkItem } from "../lib/schemas";

export function DeleteWork({ workId }: { workId: WorkItem["id"] }) {
  const [open, setOpen] = useState(false);

  const deleteWorkMutation = useDeleteWorkMutation();

  return (
    <div>
      <Dialog
        className="h-1/4 w-1/3"
        title={"Are you sure?"}
        open={open}
        setOpen={setOpen}
      >
        <Button
          onClick={() => deleteWorkMutation.mutate(workId)}
          disabled={deleteWorkMutation.isPending}
          className="mt-auto ml-auto"
        >
          {deleteWorkMutation.isPending ? "Loading..." : "Yes"}
        </Button>
      </Dialog>

      <Button variant="danger" onClick={() => setOpen(true)}>
        Delete Work
      </Button>
    </div>
  );
}
