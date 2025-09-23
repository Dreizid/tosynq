import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { LucideIcon } from "lucide-react"

/**
 * Props for the FloatingActionButton.
 */
interface FloatingActionButtonProps {
  /** Callback when the button is clicked. */
  onClick: () => void
  /** The Lucide icon component to render inside the button. */
  icon: LucideIcon
  /** Text shown in a tooltip when hovering over the button. */
  tooltip?: string
}

/**
 * FloatingActionButton
 *
 * A reusable component that displays a floating button that has an icon and an optional tooltip. 
 */
function FloatingActionButton({ onClick, icon: Icon, tooltip }: FloatingActionButtonProps) {
  const button = (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-lg hover:scale-120 transition-transform"
    >
      <Icon />
    </button>
  )
  return (
    tooltip ? (
      <Tooltip>
        <TooltipTrigger asChild >
          {button}
        </TooltipTrigger>
        <TooltipContent className="bg-background fill-background text-primary shadow-lg">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip >
    ) : (button)
  )
}
export default FloatingActionButton;
