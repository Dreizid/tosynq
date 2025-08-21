import { DialogHeader, Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

interface BaseFormDialogProps {
  open: boolean,
  onOpenChange: () => void,
}

interface ContentFormDialogProps extends BaseFormDialogProps {
  title: string,
  children: ReactNode
}

interface TabFormDialogProps extends BaseFormDialogProps {
  tabs: TabProp[],
  defaultTab: string,
}

interface TabProp {
  title: string,
  value: string,
  contentTitle: string,
  content: ReactNode
}

function ContentFormDialog({ open, onOpenChange, title, children }: ContentFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

function TabFormDialog({ open, onOpenChange, tabs, defaultTab }: TabFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <Tabs defaultValue={defaultTab}>
          <TabsList>
            {tabs.map(tab => <TabsTrigger key={tab.value} value={tab.value}>{tab.title}</TabsTrigger>)}
          </TabsList>
          {tabs.map(tab => (
            <TabsContent key={tab.value} value={tab.value}>
              <DialogHeader>
                <DialogTitle>{tab.contentTitle}</DialogTitle>
              </DialogHeader>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

function FormDialog(props: ContentFormDialogProps | TabFormDialogProps) {
  if ('tabs' in props) {
    return <TabFormDialog {...props} />
  }
  return <ContentFormDialog {...props} />
}

export default FormDialog;
