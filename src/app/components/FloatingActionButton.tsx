import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { LucideIcon } from "lucide-react"
function FloatingActionButton({ onClick, icon: Icon }: { onClick: () => void, icon: LucideIcon }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild >
        <button
          onClick={onClick}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-lg hover:scale-120 transition-transform"
        >
          <Icon />
        </button>
      </TooltipTrigger>
      <TooltipContent className="bg-background fill-background text-primary shadow-lg">
        <p>Add a task</p>
      </TooltipContent>
    </Tooltip>
  )
}
export default FloatingActionButton;
