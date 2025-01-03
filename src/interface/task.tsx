import { priority } from "@/enums/priority";

export interface Task {
  id: string;
  name: string;
  priority: keyof typeof priority;
  completedPomodoros: number;
  pomodoros: number;
  note?: string;
}
