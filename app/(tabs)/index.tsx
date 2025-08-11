import UseTheme from "@/hooks/useTheme";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, Task } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import TaskCard from "../components/TaskCard";
import { LinearGradient } from "expo-linear-gradient";
import { Tasks } from "../types/Tasks";
import Header from "../components/Header";
import TaskInput from "../components/TaskInput";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ProgressBar from "../components/ProgressBar";
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
