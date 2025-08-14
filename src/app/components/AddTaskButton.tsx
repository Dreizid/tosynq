import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Plus } from "lucide-react"
export default function AddTaskButton() {
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-lg hover:scale-110 transition-transform">
            <Plus />
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent className="bg-background fill-background text-primary shadow-lg">
          <p>Add a task</p>
        </TooltipContent>
      </Tooltip>
      <form>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title" className="font-semibold">Title</Label>
              <Input id="title" name="title" placeholder={"Title"} />
            </div>
            <div>
              {/* Add Calendar Date picker here*/}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description" className="font-semibold">Description</Label>
              <Textarea placeholder="Description" />
            </div>
            <Button>Submit</Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}
