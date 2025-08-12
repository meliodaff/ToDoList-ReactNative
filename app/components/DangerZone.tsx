import { api } from "@/convex/_generated/api";
import UseTheme, { ColorScheme } from "@/hooks/useTheme";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DangerZone = () => {
  const { colors } = UseTheme();
  const styles = createDangerZoneStyles(colors);
  const deleteAllTasks = useMutation(api.todos.clearAllTodos);

  const handleConfirmationDelete = () => {
    Alert.alert(
      "Reset App",
      "⚠️ This will DELETE all your todos permanently. This action cannot be undone.",
      [
        { style: "cancel", text: "cancel" },
        {
          style: "destructive",
          text: "Delete all",
          onPress: async () => {
            try {
              const response = await deleteAllTasks();
              Alert.alert("App reset", "The app has now been reset", [
                { style: "default", text: "Confirm" },
              ]);
              console.log(response);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  return (
    <LinearGradient colors={colors.gradients.surface} style={styles.container}>
      <Text style={styles.primaryText}>Danger Zone</Text>
      <TouchableOpacity
        onPress={handleConfirmationDelete}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <LinearGradient
            colors={colors.gradients.danger}
            style={{ padding: 10, borderRadius: 5, marginRight: 15 }}
          >
            <Fontisto name="trash" size={15} color="white" />
          </LinearGradient>
          <Text style={{ color: colors.danger, fontSize: 20, fontWeight: 600 }}>
            Reset App
          </Text>
        </View>
        <FontAwesome name="angle-right" size={20} color={colors.text} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const createDangerZoneStyles = (colors: ColorScheme) => {
  const styles = StyleSheet.create({
    container: {
      width: "92%" as any,
      marginHorizontal: "auto" as "auto",
      padding: 30,
      borderRadius: 30,
      marginBottom: 30,
    },

    primaryText: {
      color: colors.danger,
      fontSize: 25,
      fontWeight: 600,
      marginBottom: 35,
    },
  });
  return styles;
};

export default DangerZone;
