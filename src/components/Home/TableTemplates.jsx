import { Card } from "@nextui-org/react";

export default function TableTemplates() {
  return (
    <div className="flex flex-col sm:flex-row w-full h-full sm:h-96 my-5 space-y-2 sm:space-x-4 sm:space-y-0">
      <Card className=" w-full sm:w-1/3 h-48 sm:h-full bg-amber-400 rounded-3xl flex items-center justify-center text-center text-3xl md:text-4xl lg:text-6xl leading-none overflow-hidden break-words">
        5 most popular templates
      </Card>
      <Card className="w-full sm:w-2/3 h-full bg-neutral-100 rounded-3xl flex flex-row items-center ">
        <div className="flex flex-col items-center justify-center h-full sm:h-96  w-1/3  ">
          <div className="w-20 h-6 bg-amber-400 rounded-lg "></div>

          <div className="h-4"></div>

          <div className="w-20 h-6 bg-amber-400 rounded-lg"></div>

          <div className="h-4"></div>

          <div className="w-20 h-6 bg-amber-400 rounded-lg"></div>
        </div>
        <div className="w-2/3 h-full flex items-center justify-center flex-col p-3 space-y-2 sm:space-y-4  ">
          {/* Top 5 popular templates */}

          <div className="text-base sm:text-3xl"> * Template 1</div>
          <div className="text-base sm:text-3xl"> * Template 2</div>
          <div className="text-base sm:text-3xl"> * Template 3</div>
          <div className="text-base sm:text-3xl"> * Template 5</div>
        </div>
      </Card>
    </div>
  );
}
