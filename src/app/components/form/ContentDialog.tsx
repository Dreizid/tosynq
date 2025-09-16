import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

interface BaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
interface SimpleDialogProps extends BaseDialogProps {
  title: string;
  children: ReactNode;
  tabs?: never;
  defaultTab?: never;
interface TabDialogProps extends BaseDialogProps {
  tabs: TabProp[];
  defaultTab: TabProp["value"];
  title?: never;
  children?: never;
interface TabProp {
  label: string;
  value: string;
  contentTitle: string;
  content: ReactNode;
type ContentDialogProps = TabDialogProps | SimpleDialogProps;
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
