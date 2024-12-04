import { Card } from "@nextui-org/react";

export default function TableTemplates() {
  return (
    <div className="flex w-full h-96 my-5 space-x-4">
      <Card className="w-1/3 h-full bg-amber-400 rounded-3xl"></Card>
      <Card className="w-2/3 h-full bg-neutral-100 rounded-3xl"></Card>
    </div>
  );
}
