"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/app/components/DateTimePicker";
import { db } from "@/app/lib/db/dexie";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


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

function TaskForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    }
  })

  async function submitTask(values: z.infer<typeof formSchema>) {
    try {
      const id = await db.task.add({
        title: values.title,
        from: values.from,
        to: values.to,
        description: values.description,
        completed: false,
        createdAt: new Date(),
        source: 'manual',
        deleted: false,
        allDay: true
      })
      console.log(id)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitTask)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
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
            <FormItem>
              <FormLabel>Description</FormLabel>
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
                <DateTimePicker date={field.value} onSelect={field.onChange} />
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
                <DateTimePicker date={field.value} onSelect={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default TaskForm;
