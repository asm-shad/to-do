import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { updateTask } from "@/redux/features/task/taskSlice";
import { useAppDispatch } from "@/redux/hook";
import type { ITask } from "@/types";

type UpdateTaskFormValues = Omit<ITask, "dueDate"> & { dueDate: Date };

export default function UpdateTaskModal({
  task,
  onClose,
}: {
  task: ITask;
  onClose: () => void;
}) {
  const form = useForm<UpdateTaskFormValues>({
    defaultValues: {
      ...task,
      dueDate: new Date(task.dueDate),
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = (values: UpdateTaskFormValues) => {
    dispatch(
      updateTask({
        ...values,
        dueDate: values.dueDate.toISOString(),
      })
    );
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        <DialogDescription className="sr-only">
        Fill out the form to update your task.
        </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input {...form.register("title")} placeholder="Title" />
          <Textarea {...form.register("description")} placeholder="Description" />
          <Select
            defaultValue={form.getValues("priority")}
            onValueChange={(val) => form.setValue("priority", val as "low" | "medium" | "high")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Calendar
            selected={form.watch("dueDate")}
            onSelect={(date) => date && form.setValue("dueDate", date)}
            mode="single"
          />
          <DialogFooter>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
