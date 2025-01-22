import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FC, ReactElement, useState } from "react";
import { Task } from "@/interface/task";
import { priority } from "@/enums/priority";
import { useRandomId } from "@/hooks/random-id";
import { useTasks } from "@/context/Task-context";

const formSchema = z.object({
  taskname: z.string().min(2, {
    message: "Taskname must be at least 2 characters.",
  }),
  priority: z.nativeEnum(priority, {
    required_error: "You need to select a notification type.",
  }),
  pomodoros: z.coerce.number().min(1),
  note: z.string(),
});

const TaskDialog: FC = (): ReactElement => {
  const { taskDialogOpen, addTask } = useTasks();
  const [open = false, setOpen] = useState(taskDialogOpen);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskname: "",
      priority: priority.LOW,
      pomodoros: 1,
      note: "",
    },
  });

  const toggleDialog = () => {
    form.reset();
    setOpen(!open);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newTask: Task = {
      id: useRandomId(),
      name: values.taskname,
      priority: values.priority,
      completedPomodoros: 0,
      pomodoros: values.pomodoros,
      note: values.note,
    };
    addTask(newTask);

    toggleDialog();
  };

  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Add a new task here. Click 'Add' when you are done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="taskname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Name</FormLabel>
                  <FormControl>
                    <Input placeholder="What are you working on?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={priority.LOW} defaultChecked />
                        </FormControl>
                        <FormLabel className="font-normal">Low</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={priority.MEDIUM} />
                        </FormControl>
                        <FormLabel className="font-normal">Medium</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={priority.HIGH} />
                        </FormControl>
                        <FormLabel className="font-normal">High</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pomodoros"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pomodoros</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Pomodoros" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What are the important things to consider here?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
