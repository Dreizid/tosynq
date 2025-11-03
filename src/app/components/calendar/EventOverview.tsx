import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Pencil, Trash } from "lucide-react";

interface EventOverviewProps {
  eventName: string;
  fromDate: Date | undefined;
  toDate: Date | undefined;
  description: string;
}

const format = {
  hour: "numeric",
  minute: "numeric",
};
function EventOverview({
  eventName,
  fromDate,
  toDate,
  description,
}: EventOverviewProps) {
  return (
    <div className="w-64 p-2">
      <div className="mb-2">
        <p className="font-bold text-lg">{eventName}</p>
        <p className="text-sm text-gray-700">
          {fromDate?.toLocaleTimeString("en-US", format)} -{" "}
          {toDate?.toLocaleTimeString("en-US", format)}
        </p>
      </div>
      <p className="break-normal text-sm text-gray-600">{description}</p>
      <div className="flex justify-between gap-2 mt-4">
        <Button className="bg-blue-400 flex-1 font-semibold">
          <Pencil className="mr-1" />
          Edit
        </Button>
        <Button className="bg-red-600 flex-1 font-semibold">
          <Trash />
          Delete
        </Button>
      </div>
    </div>
  );
}

export default EventOverview;
