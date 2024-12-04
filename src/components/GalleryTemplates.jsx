import { Card } from "@nextui-org/react";
import "../App.css";
export default function GalleryTemplates() {
  return (
    <div className=" overflow-x-auto custom-scrollbar py-4">
      <div className="flex space-x-4 w-max">
        <Card className="w-80 h-80 bg-neutral-100 rounded-3xl"></Card>
        <Card className="w-80 h-80 bg-neutral-100 rounded-3xl"></Card>
        <Card className="w-80 h-80 bg-neutral-100 rounded-3xl"></Card>
        <Card className="w-80 h-80 bg-neutral-100 rounded-3xl"></Card>
      </div>
    </div>
  );
}
