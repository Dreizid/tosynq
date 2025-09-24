"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/app/components/form/DateTimePicker";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { addTask, updateTask } from "../../lib/db/dbActions";

interface DefaultFormValues {
  title?: string
  description?: string
  from?: Date
  to?: Date
}

interface EventFormDefaultValues extends DefaultFormValues {
  className?: string
  eventId?: number
}

const formSchema = z.object({
  title: z.string()
    .min(2, { message: "Title must be atleast 2 characters" })
    .max(50, { message: "Title must not exceed 50 characters" }),
  from: z.date({
    error: "Start date is required"
  }),
  to: z.date({
    error: "End date is required"
  }),
  description: z.string().max(200).optional(),
}).refine((data) => !data.from || !data.to || data.to > data.from, {
  message: "End date must be after start date",
  path: ["to"]
})

function EventForm({ title, description, from, to, eventId, className }: EventFormDefaultValues) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title ?? "",
      description: description ?? "",
      from: from ?? undefined,
      to: to ?? undefined,
    }
  })

  async function submitTask(values: z.infer<typeof formSchema>) {
    try {
      eventId ? updateTask({
        id: eventId,
        title: values.title,
        from: values.from,
        to: values.to,
        description: values.description,
        type: 'event',
        completed: false,
        createdAt: new Date(),
        source: 'manual',
        deleted: false,
        allDay: false
      }) : addTask({
        title: values.title,
        from: values.from,
        to: values.to,
        description: values.description,
        type: 'event',
        completed: false,
        createdAt: new Date(),
        source: 'manual',
        deleted: false,
        allDay: false
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={`${className} mt-4`}>
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(submitTask)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem >
                <FormLabel className="font-semibold">Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From</FormLabel>
                <FormControl>
                  <DateTimePicker initialDate={field.value} onSelect={(newDate) => { field.onChange(newDate); }} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To</FormLabel>
                <FormControl>
                  <DateTimePicker initialDate={field.value} onSelect={(newDate) => field.onChange(newDate)} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">{eventId ? "Update" : "Submit"}</Button>
        </form>
      </Form>
    </div>
  )
}

export default EventForm;
