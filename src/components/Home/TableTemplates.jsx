import { Card } from "@nextui-org/react";

export default function TableTemplates() {
  return (
    <div className="flex w-full h-96 my-5 space-x-4">
      <Card className="w-1/3 h-full bg-amber-400 rounded-3xl flex items-center justify-center text-center text-6xl leading-none overflow-hidden break-words">
        5 most popular templates
      </Card>
      <Card className="w-2/3 h-full bg-neutral-100 rounded-3xl flex flex-row ">
        <div class="flex flex-col items-center justify-center h-96  w-1/3  ">
          <div class="w-20 h-6 bg-amber-400 rounded-lg "></div>

          <div class="h-4"></div>

          <div class="w-20 h-6 bg-amber-400 rounded-lg"></div>

          <div class="h-4"></div>

          <div class="w-20 h-6 bg-amber-400 rounded-lg"></div>
        </div>
        <div className="w-2/3 h-full flex items-center justify-center flex-col space-y-4 ">
          {/* Top 5 popular templates */}

          <div className="text-3xl"> * Template 1</div>
          <div className="text-3xl"> * Template 2</div>
          <div className="text-3xl"> * Template 3</div>
          <div className="text-3xl"> * Template 5</div>
        </div>
      </Card>
    </div>
  );
}
