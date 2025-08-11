import UseTheme, { ColorScheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

const SettingsHeader = () => {
  const { colors } = UseTheme();
  const styles = createSettingsHeaderStyles(colors);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colors.gradients.primary}
        style={{ padding: 10, borderRadius: 10 }}
      >
        <Ionicons name="settings" color="white" size={30} />
      </LinearGradient>
      <Text style={styles.rightSection}>Settings</Text>
    </View>
  );
};

const createSettingsHeaderStyles = (colors: ColorScheme) => {
  const styles = {
    container: {
      width: "90%" as any,
      flexDirection: "row",
      marginHorizontal: "auto" as any,
      alignItems: "center",
      marginBottom: 20,
    },

    rightSection: {
      fontSize: 35,
      color: colors.text,
      fontWeight: 700,
      marginLeft: 20,
    },
  };
  return styles;
};
export default SettingsHeader;
