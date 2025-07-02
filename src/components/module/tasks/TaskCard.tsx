import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  deleteTask,
  toggleCompleteState,
} from "@/redux/features/task/taskSlice";
import { useAppDispatch } from "@/redux/hook";
import type { ITask } from "@/types";
import { Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import UpdateTaskModal from "./UpdateTaskModal";

interface IProps {
  task: ITask;
}

export default function TaskCard({ task }: IProps) {
  const dispatch = useAppDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div
      onClick={() => setIsEditOpen(true)}
      className="border px-5 py-3 rounded-md hover:shadow cursor-pointer transition"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div
            className={cn("size-3 rounded-full", {
              "bg-green-500": task.priority === "low",
              "bg-yellow-500": task.priority === "medium",
              "bg-red-500": task.priority === "high",
            })}
          ></div>
          <h1 className={cn({ "line-through": task.isCompleted })}>
            {task.title}
          </h1>
        </div>
        <div
          className="flex items-center"
          onClick={(e) => e.stopPropagation()} // stop full-card click
        >
          <Button
            onClick={() => dispatch(deleteTask(task.id))}
            variant="link"
            className="p-0 text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </Button>

          <Button
            onClick={() => setIsEditOpen(true)}
            variant="link"
            className="p-0 text-blue-500 mr-3"
          >
            <Pencil className="w-4 h-4" />
          </Button>

          <Checkbox
            checked={task.isCompleted}
            onClick={() => dispatch(toggleCompleteState(task.id))}
          />
        </div>
      </div>
      <p className="mt-5 text-sm text-muted-foreground">
        {task.description}
      </p>

      {/* Edit Modal */}
      {isEditOpen && (
        <UpdateTaskModal
          task={task}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </div>
  );
}
