import { api } from "@/convex/_generated/api";
import UseTheme from "@/hooks/useTheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Progress from "./Progress";
const ProgressCard = () => {
  const { colors } = UseTheme();
  const countTasks = useQuery(api.todos.getTodos)?.length || 0;
  const completedTasksCount = useQuery(api.todos.completedTodosCount);
  const getActiveTasksCount = (): number => {
    if (!completedTasksCount) {
      return countTasks;
    }
    return countTasks - completedTasksCount;
  };
  const [activeTasksCount, setActiveTasksCount] =
    useState<number>(getActiveTasksCount); // dk if this will work because but i think it will work since its returning a number. (edited) it works
  useEffect(() => {
    console.log("Im in the use effect");
    setActiveTasksCount(() => {
      return getActiveTasksCount();
    });
  }, [countTasks, completedTasksCount]);
  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={{
        borderRadius: 30,
        width: "92%",
        marginHorizontal: "auto",
        paddingVertical: 15,
        marginBottom: 30,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 25,
          fontWeight: 600,
          width: "79%",
          marginHorizontal: "auto",
          marginBottom: 15,
        }}
      >
        Progress Stats
      </Text>
      <View style={{ marginBottom: 15, rowGap: 15 }}>
        <Progress
          borderLeftColor={colors.primary}
          iconOrigin={Feather}
          gradientIcon={colors.gradients.primary}
          iconName="list"
          number={countTasks}
          category="Total Todos"
        />
        <Progress
          borderLeftColor={colors.success}
          iconOrigin={AntDesign}
          gradientIcon={colors.gradients.success}
          iconName="checkcircle"
          number={completedTasksCount}
          category="Completed"
        />
        <Progress
          borderLeftColor={colors.warning}
          iconOrigin={AntDesign}
          gradientIcon={colors.gradients.warning}
          iconName="clockcircle"
          number={activeTasksCount}
          category="Active"
        />
      </View>
    </LinearGradient>
  );
};

export default ProgressCard;
