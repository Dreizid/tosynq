import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addTask } from "../../lib/db/dbActions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "./DateTimePicker";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const taskFormSchema = z
  .object({
    title: z
      .string()
      .min(2, { message: "Title must be atleast 2 characters" })
      .max(50, { message: "Title must not exceed 50 characters" }),
    from: z
      .date({
        error: "Start date is required",
      })
      .optional(),
    to: z
      .date({
        error: "End date is required",
      })
      .optional(),
    description: z.string().max(200).optional(),
  })
  .refine((data) => !data.from || !data.to || data.to > data.from, {
    message: "End date must be after start date",
    path: ["to"],
  });

function TaskForm({ className }: { className?: string }) {
  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
  });

  async function onSubmit(values: z.infer<typeof taskFormSchema>) {
    addTask({
      title: values.title,
      description: values.description,
      from: values.from,
      to: values.to,
      type: "task",
      completed: false,
      createdAt: new Date(),
      source: "manual",
      deleted: false,
      allDay: values.from ? false : true,
    });
  }

  const [fromChecked, setFromChecked] = useState<boolean>(false);
  const [toChecked, setToChecked] = useState<boolean>(false);
  return (
    <div className={`${className} mt-4`}>
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Title</FormLabel>
                <FormControl>
                  <Input placeholder="Tiltle" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
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
                <div className="flex gap-2">
                  <Checkbox
                    id="fromEnabled"
                    checked={fromChecked}
                    onCheckedChange={(value) => setFromChecked(value === true)}
                  />
                  <FormLabel className="font-semibold">From</FormLabel>
                </div>
                {fromChecked && (
                  <FormControl>
                    <DateTimePicker
                      date={field.value}
                      onSelect={(newDate) => {
                        field.onChange(newDate);
                        console.log(newDate);
                      }}
                    />
                  </FormControl>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                  <Checkbox
                    id="toEnabled"
                    checked={toChecked}
                    onCheckedChange={(value) => setToChecked(value === true)}
                  />
                  <FormLabel className="font-semibold">To</FormLabel>
                </div>
                {toChecked && (
                  <FormControl>
                    <DateTimePicker
                      date={field.value}
                      onSelect={(newDate) => field.onChange(newDate)}
                    />
                  </FormControl>
                )}
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default TaskForm;
