import { createFileRoute } from "@tanstack/react-router";
import { Dialog, DialogClose, DialogContent } from "../../components/dialog";
import { useState } from "react";
import { Button } from "../../components/button";
import { PlusCircleIcon, PlusIcon } from "lucide-react";
import { Input } from "../../components/input";
import { Label } from "../../components/label";

export const Route = createFileRoute("/_app/admin/works")({
  component: RouteComponent,
});

function RouteComponent() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open}>
        <DialogContent>
          <div className="mx-auto text-xl font-semibold">Add Work</div>

          <form>
            <div className="flex flex-col">
              <Label htmlFor="workName">Name</Label>
              <Input placeholder="TypeRace" name="workName" id="workName" />
            </div>
          </form>
        </DialogContent>

        <DialogClose>
          <Button className="ml-auto w-fit" onClick={() => setOpen(false)}>
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
