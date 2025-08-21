import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
function FormTabs() {
  return (
    <Tabs defaultValue="task">
      <TabsList>
        <TabsTrigger value="task"></TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default FormTabs;
