import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  ListRenderItemInfo,
  Task,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import UseTheme, { ColorScheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { Tasks } from "../types/Tasks";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
const TaskCard = ({ tasks, setTasks }: any) => {
  const { colors } = UseTheme();
  const styles = createTaskCardStyles(colors);
  const deleteTask = useMutation(api.todos.deleteTodo);
  const completeTask = useMutation(api.todos.toggleTodo);
  const editTask = useMutation(api.todos.updateTodo);
  const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const handleDeleteTask = async (taskId: any) => {
    try {
      const response = await deleteTask({ id: taskId });
      console.log(response);
      alert("Successfully deleted the task");
    } catch (error) {
      console.log(error);
    }
  };
  const handleCompleteTask = async (taskId: Id<"todos">) => {
    try {
      const response = await completeTask({ id: taskId });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTask = (task: Tasks) => {
    setEditingId(task._id);
    setEditingText(task.text);
  };

  const handleSaveEditTask = async (
    id: Id<"todos">,
    task: string,
    currentTask: string
  ) => {
    if (!task) {
      Alert.alert("Fill out field", "please fill out the field", [
        { text: "Confirm", style: "default" },
      ]);
      return;
    }

    if (currentTask === editingText) {
      Alert.alert("New task", "please fill out the field with a new task", [
        { text: "Confirm", style: "default" },
      ]);
      return;
    }

    try {
      const response = await editTask({ id, text: task });
      console.log(response);
      setEditingId(null);
      setEditingText("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelEditTask = () => {
    setEditingId(null);
    setEditingText("");
  };
  console.log("re rendering");
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "column",
          width: "80%",
          marginHorizontal: "auto",
          gap: 10,
        }}
      >
        {tasks.length > 0 ? (
          <FlatList
            data={tasks}
            renderItem={(taskItem: ListRenderItemInfo<Tasks>) => {
              const task = taskItem.item;
              const isEditing = editingId === task._id; // the reason why when this gets triggered its because it has the state functionality where in it would re render if the state changes, in this case, the state of the editingId and the editingTask would be the key
              return (
                <LinearGradient
                  colors={colors.gradients.surface}
                  key={taskItem.index}
                  style={{
                    flexDirection: "row",
                    gap: 15,
                    marginBottom: 15,
                    paddingHorizontal: 15,
                    paddingVertical: 20,
                    borderRadius: 30,
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <View>
                    <TouchableOpacity
                      style={{ alignSelf: "flex-start" }}
                      onPress={() => {
                        handleCompleteTask(task._id);
                      }}
                      // onPress={() =>
                      //   setTasks((prev: Tasks[]) =>
                      //     prev.map((t: Tasks) =>
                      //       t._id === task._id
                      //         ? { ...t, isCompleted: !t.isCompleted }
                      //         : t
                      //     )
                      //   )
                      // }
                    >
                      {task.isCompleted ? (
                        <LinearGradient
                          colors={colors.gradients.success}
                          style={{
                            borderRadius: 50,
                          }}
                        >
                          <AntDesign
                            name="check"
                            color="white"
                            size={20}
                            style={[styles.actionButton]}
                          />
                        </LinearGradient>
                      ) : (
                        <LinearGradient
                          colors={colors.gradients.empty}
                          style={{ borderRadius: 50 }}
                        >
                          <Feather
                            name="x"
                            size={20}
                            color="white"
                            style={[styles.actionButton]}
                          />
                        </LinearGradient>
                      )}
                    </TouchableOpacity>
                  </View>
                  <View>
                    {isEditing ? (
                      <View>
                        <TextInput
                          style={[
                            styles.input,
                            isFocused && styles.focused,
                            { marginBottom: 8, fontSize: 18 },
                          ]}
                          value={editingText}
                          onChangeText={(text) => setEditingText(text)}
                          placeholderTextColor={colors.textMuted}
                          onFocus={() => setIsFocused(true)}
                        />
                        <View style={{ flexDirection: "row", gap: 15 }}>
                          <TouchableOpacity
                            onPress={() =>
                              handleSaveEditTask(
                                task._id,
                                editingText,
                                task.text
                              )
                            }
                          >
                            <LinearGradient
                              colors={colors.gradients.success}
                              style={[
                                styles.saveEditButton,
                                {
                                  borderRadius: 10,
                                  flexDirection: "row",
                                  alignItems: "center",
                                },
                              ]}
                            >
                              <AntDesign
                                name="check"
                                size={15}
                                color="white"
                                style={[{ marginRight: 10 }]}
                              />
                              <Text
                                style={{ color: colors.text, fontSize: 17 }}
                              >
                                Save
                              </Text>
                            </LinearGradient>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              handleCancelEditTask();
                            }}
                          >
                            <LinearGradient
                              colors={colors.gradients.empty}
                              style={[
                                styles.saveEditButton,
                                {
                                  borderRadius: 10,
                                  flexDirection: "row",
                                  alignItems: "center",
                                },
                              ]}
                            >
                              <Feather
                                name="x"
                                size={15}
                                color="white"
                                style={[{ marginRight: 10 }]}
                              />
                              <Text
                                style={{ color: colors.text, fontSize: 17 }}
                              >
                                Cancel
                              </Text>
                            </LinearGradient>
                            {/* <LinearGradient
                              colors={colors.gradients.empty}
                              style={{ borderRadius: 50 }}
                            >
                              <Feather
                                name="x"
                                size={20}
                                color="white"
                                style={[styles.actionButton]}
                              />
                              <Text>Cancel</Text>
                            </LinearGradient> */}
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <>
                        <Text
                          style={[
                            {
                              fontSize: 20,
                              color: colors.text,
                              marginBottom: 20,
                              marginTop: 5,
                              width: 200,
                            },
                            task.isCompleted && styles.completeTask,
                          ]}
                        >
                          {task.text}
                        </Text>
                        <View style={{ flexDirection: "row", gap: 15 }}>
                          <TouchableOpacity
                            onPress={() => handleEditTask(task)}
                          >
                            <LinearGradient
                              colors={colors.gradients.warning}
                              style={{ borderRadius: 50 }}
                            >
                              <Ionicons
                                name="pencil"
                                size={20}
                                color="white"
                                style={[styles.actionButton]}
                              />
                            </LinearGradient>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              Alert.alert(
                                "Delete task",
                                `Are you sure you want to delete task ${task.text}?`,
                                [
                                  { text: "Cancel", style: "cancel" },
                                  {
                                    text: "Delete task",
                                    style: "destructive",
                                    onPress: () => handleDeleteTask(task._id),
                                  },
                                ]
                              );
                            }}
                          >
                            <LinearGradient
                              colors={colors.gradients.danger}
                              style={{ borderRadius: 50 }}
                            >
                              <Ionicons
                                name="trash"
                                size={20}
                                color="white"
                                style={[styles.actionButton]}
                              />
                            </LinearGradient>
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                  </View>
                </LinearGradient>
              );
            }}
          />
        ) : (
          <View
            style={{
              height: 400,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 20,
                alignSelf: "center",
              }}
            >
              🎉 Yay youve finished all your tasks!🎉
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const createTaskCardStyles = (colors: ColorScheme) => {
  const styles = StyleSheet.create({
    actionButton: {
      borderRadius: 50,
      padding: 10,
      alignSelf: "flex-start",
    },
    editButton: {
      backgroundColor: colors.warning,
    },
    deleteButton: {
      backgroundColor: colors.danger,
    },
    completeTask: {
      textDecorationLine: "line-through",
      color: colors.textMuted,
    },
    input: {
      borderColor: colors.border,
      borderWidth: 2,
      paddingTop: 10,
      paddingHorizontal: 20,
      borderRadius: 12,
      width: 200,
      color: colors.text,
    },
    saveEditButton: {
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 20,
    },
    focused: {
      borderColor: colors.primary,
      borderWidth: 2,
    },
  });
  return styles;
};

export default TaskCard;

{
  /* <View>
        <TouchableOpacity
          style={{}}
          onPress={() => setIsCompleted((prev) => !prev)}
        >
          {isCompleted ? (
            <LinearGradient
              colors={colors.gradients.success}
              style={{ borderRadius: 50 }}
            >
              <AntDesign
                name="check"
                color="white"
                size={20}
                style={[styles.actionButton]}
              />
            </LinearGradient>
          ) : (
            <LinearGradient
              colors={colors.gradients.empty}
              style={{ borderRadius: 50 }}
            >
              <Feather
                name="x"
                size={20}
                color="white"
                style={[styles.actionButton]}
              />
            </LinearGradient>
          )}
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={[
            {
              fontSize: 20,
              color: colors.text,
              marginBottom: 10,
              marginTop: 5,
            },
            isCompleted && styles.completeTask,
          ]}
        >
          {props.task}
        </Text>
        <View style={{ flexDirection: "row", gap: 15 }}>
          <TouchableOpacity>
            <LinearGradient
              colors={colors.gradients.warning}
              style={{ borderRadius: 50 }}
            >
              <Ionicons
                name="pencil"
                size={20}
                color="white"
                style={[styles.actionButton]}
              />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity>
            <LinearGradient
              colors={colors.gradients.danger}
              style={{ borderRadius: 50 }}
            >
              <Ionicons
                name="trash"
                size={20}
                color="white"
                style={[styles.actionButton]}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View> */
}
