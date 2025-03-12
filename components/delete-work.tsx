import { useState } from "react";
import { Button } from "./button";
import { Dialog } from "./dialog";
import { useAuth } from "../src/AuthProvider";

export function DeleteWork() {
  const [open, setOpen] = useState(false);

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <div>
      <Dialog
        className="h-1/4 w-1/3"
        title={"Are you sure?"}
        open={open}
        setOpen={setOpen}
      >
        <Button className="mt-auto ml-auto">Yes</Button>
      </Dialog>

      <Button variant="danger" onClick={() => setOpen(true)}>
        Delete Work
      </Button>
    </div>
  );
}
