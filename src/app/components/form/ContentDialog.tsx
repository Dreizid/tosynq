import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

/**
 * BaseDialogProps
 *
 * A reusable model dialog that provides the common dialog structure (open, onOpenChange).
 *
 * It serves as a foundation for more specific dialogs like `SimpleDialog` or `TabDialog`.
 */
interface BaseDialogProps {
  /** Controls whether the dialog is visible. Must be provided by the parent. */
  open: boolean;
  /** Callback to update the dialog's `open` state, called with the new state (`true` = open, `false` = closed). */
  onOpenChange: (open: boolean) => void;
}

/**
 * SimpleDialogProps
 *
 * A modal dialog for displaying form contents without tabs.
 *
 * Extends `BaseDialog` for basic form props.
 */
interface SimpleDialogProps extends BaseDialogProps {
  /** Title text displayed on top of the modal. */
  title: string;
  /** Child components or JSX content to render inside the modal. */
  children: ReactNode;
  tabs?: never;
  defaultTab?: never;
}

/**
 * TabDialogProps
 *
 * A modal dialog for displaying forms that needs tabs.
 *
 * Extends `BaseDialog` for basic form props.
 */
interface TabDialogProps extends BaseDialogProps {
  /** Array of tab configurations to render. Must not be empty. */
  tabs: TabProp[];
  /** The `TabProp.value` that should be active when the dialog first opens. Must match a value in the `tabs` array. */
  defaultTab: TabProp["value"];
  title?: never;
  children?: never;
}

/**
 * TabProp
 *
 * Defines the structure of a tab inside the `ContentDialog` .
 *
 * Specifies the tab's label, unique value, title, and rendered content.
 */
interface TabProp {
  /** The label to be displayed in the list of tabs. */
  label: string;
  /** The unique identifier for the tab, used to manage tab switching. Must be a unique value among all tabs */
  value: string;
  /** The title to display in the dialog header when this tab is active. */
  contentTitle: string;
  /** The content to display when this tab is active. (e.g. JSX Element or React component) */
  content: ReactNode;
}

/** Union type for `ContentDialog` props, supporting either `SimpleDialog` or `TabDialog`*/
type ContentDialogProps = TabDialogProps | SimpleDialogProps;

/**
 * ContentDialog
 *
 * A flexible modal dialog component that supports two modes:
 * - `SimpleDialog`: Displays static content without tabs.
 * - `TabDialog`: Displays tabbed content.
 *
 * `TabDialog` is automatically inferred when `tabs` is provided, otherwise it renders `SimpleDialog`.
 * Controlled by the parent via `open` and `onOpenChange`.
 */
function ContentDialog({ open, onOpenChange, ...props }: ContentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {props.tabs ? (
          <Tabs defaultValue={props.defaultTab}>
            <TabsList>
              {props.tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {props.tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <DialogHeader>
                  <DialogTitle>{tab.contentTitle}</DialogTitle>
                </DialogHeader>
                {tab.content}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{props.title}</DialogTitle>
            </DialogHeader>
            {props.children}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ContentDialog;
