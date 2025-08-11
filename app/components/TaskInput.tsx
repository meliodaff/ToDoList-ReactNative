import UseTheme, { ColorScheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  Keyboard,
} from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import { LinearGradient } from "expo-linear-gradient";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

type NewTask = {
  text: string;
};

const TaskInput = () => {
  const { colors } = UseTheme();
  const addTask = useMutation(api.todos.createTodo);
  const [newTask, setNewTask] = useState<string>("");
  const styles = createTaskInputStyles(colors);

  const handleAddTask = async () => {
    try {
      const taskId = await addTask({ text: newTask });
      console.log(taskId);
      setNewTask("");
      alert("Successfully added a task!");
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 25,
      }}
    >
      <TextInput
        style={styles.input}
        placeholder="Task..."
        placeholderTextColor={colors.textMuted}
        value={newTask}
        onChangeText={(text) => setNewTask(text)}
      />
      <LinearGradient
        colors={
          newTask?.trim() ? colors.gradients.primary : colors.gradients.muted
        }
        style={[{ borderRadius: 50 }]}
      >
        <TouchableOpacity
          style={styles.button}
          disabled={newTask?.trim() ? false : true}
          onPress={handleAddTask}
        >
          <Fontisto name="plus-a" size={20} color="white" />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const createTaskInputStyles = (colors: ColorScheme) => {
  const styles = {
    input: {
      height: 45,
      margin: 12,
      borderColor: colors.border,
      borderWidth: 2,
      padding: 10,
      borderRadius: 20,
      width: "65%" as any,
      color: colors.text,
    },
    button: {
      padding: 15,
      borderRadius: 50,
      borderColor: colors.border,
      borderWidth: 1,
    },
    buttonEnabled: {
      backgroundColor: colors.gradients.primary,
    },
  };

  return styles;
};

export default TaskInput;
