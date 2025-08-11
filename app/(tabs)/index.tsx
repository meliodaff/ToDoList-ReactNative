import { api } from "@/convex/_generated/api";
import UseTheme from "@/hooks/useTheme";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import TaskCard from "../components/TaskCard";
import TaskInput from "../components/TaskInput";
import { Tasks } from "../types/Tasks";
export default function Index() {
  const { colors } = UseTheme();
  const listOfTasks = useQuery(api.todos.getTodos);
  const [tasks, setTasks] = useState<Tasks[] | []>(() => {
    if (!listOfTasks) {
      return [];
    }
    return listOfTasks;
  });

  const [completedTaskCount, setCompletedTaskCount] = useState<number>(() => {
    return tasks.filter((task) => task.isCompleted).length;
  });

  useEffect(() => {
    setCompletedTaskCount(() => {
      return tasks.filter((task) => task.isCompleted).length;
    });
  }, [tasks]);

  useEffect(() => {
    if (listOfTasks) {
      setTasks(listOfTasks);
    }
    console.log("re rendering");
  }, [listOfTasks]);

  const [percentage, setPercentage] = useState<number>(() => {
    return completedTaskCount * 100 || 0;
  });

  useEffect(() => {
    if (tasks.length === 0) {
      setPercentage(0);
      return;
    }
    setPercentage((prev) => {
      return Number((completedTaskCount / tasks.length).toFixed(2)) * 100;
    });
  }, [listOfTasks, completedTaskCount, tasks]);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={{ paddingTop: 50, flex: 1 }}
    >
      <Header completedTaskCount={completedTaskCount} tasks={tasks} />
      <ProgressBar progressPercentage={percentage} />
      <TaskInput />
      <TaskCard tasks={tasks} setTasks={setTasks} />
    </LinearGradient>
  );
}
