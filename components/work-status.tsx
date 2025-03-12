export function WorkStatus({ status }: { status: string }) {
  return (
    <div className="bg-background-light w-fit rounded-md px-3 py-1 text-xs">
      {status}
    </div>
  );
}
