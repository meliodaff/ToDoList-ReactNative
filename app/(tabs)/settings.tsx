import UseTheme, { ColorScheme } from "@/hooks/useTheme";
import { useState } from "react";
import SettingsHeader from "../components/SettingsHeader";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import ProgressCard from "../components/ProgressCard";

const Settings = () => {
  const { toggleDarkMode, colors } = UseTheme();
  const styles = createSettingsStyles(colors);
  return (
    <View style={{ paddingTop: 50, backgroundColor: colors.bg, flex: 1 }}>
      <SettingsHeader />
      <ProgressCard />
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text style={[styles.button]}>Dark Mode</Text>
      </TouchableOpacity>
    </View>
  );
};
const createSettingsStyles = (colors: ColorScheme) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      alignItems: "center",
      paddingTop: 100,
    },
    button: {
      marginTop: 50,
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 50,
      borderWidth: 2,
      color: colors.text,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    input: {
      margin: 12,
      borderWidth: 0.2,
      borderRadius: 50,
      width: 250,
      paddingLeft: 20,
    },
  });
  return styles;
};

export default Settings;
