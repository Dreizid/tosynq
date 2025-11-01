"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateTimePicker } from "@/app/components/form/DateTimePicker";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { addTask, updateTask } from "../../lib/db/dbActions";
import { SourceType, TaskType } from "@/app/lib/db/dexie";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Tag, AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface DefaultFormValues {
  title?: string;
  description?: string;
  from?: Date;
  to?: Date;
}

interface EventFormDefaultValues extends DefaultFormValues {
  className?: string;
  eventId?: number;
}

const formSchema = z
  .object({
    title: z
      .string()
      .min(2, { message: "Title must be atleast 2 characters" })
      .max(50, { message: "Title must not exceed 50 characters" }),
    from: z.date({
      error: "Start date is required",
    }),
    to: z.date({
      error: "End date is required",
    }),
    description: z.string().max(200).optional(),
    allDay: z.boolean(),
  })
  .refine((data) => !data.from || !data.to || data.to > data.from, {
    message: "End date must be after start date",
    path: ["to"],
  });

function EventForm({
  title,
  description,
  from,
  to,
  eventId,
  className,
}: EventFormDefaultValues) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title ?? "",
      description: description ?? "",
      from: from ?? undefined,
      to: to ?? undefined,
      allDay: false,
    },
    mode: "onBlur",
  });

  async function submitTask(values: z.infer<typeof formSchema>) {
    try {
      const baseValues = {
        title: values.title,
        from: values.from,
        to: values.to,
        description: values.description,
        type: "event" as TaskType,
        completed: false,
        createdAt: new Date(),
        source: "manual" as SourceType,
        deleted: false,
        allDay: values.allDay,
      };
      if (eventId) {
        await updateTask({ id: eventId, ...baseValues });
      } else {
        await addTask(baseValues);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={`${className} mt-2`}>
      <form id="form-event" onSubmit={form.handleSubmit(submitTask)}>
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Title"
                    autoComplete="off"
                  />
                  <InputGroupAddon>
                    <Tag />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Description"
                    autoComplete="off"
                  />
                  <InputGroupAddon>
                    <AlignJustify />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="grid grid-cols-2 gap-2 ">
            <Controller
              name="from"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <DateTimePicker
                    initialDate={field.value}
                    onSelect={field.onChange}
                    label="From"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="to"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <DateTimePicker
                    initialDate={field.value}
                    onSelect={field.onChange}
                    label="To"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div className="ml-auto">
            <Controller
              name="allDay"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-center mr-auto">
                    <FieldLabel className="mr-2">All day</FieldLabel>
                    <Switch
                      id={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </Field>
              )}
            />
          </div>
          <Button type="submit">{eventId ? "Update" : "Submit"}</Button>
        </FieldGroup>
      </form>
    </div>
  );
}

export default EventForm;
