import UseTheme, { ColorScheme } from "@/hooks/useTheme";
import { ScrollView, StyleSheet, View } from "react-native";
import DangerZone from "../components/DangerZone";
import Preferences from "../components/Preferences";
import ProgressCard from "../components/ProgressCard";
import SettingsHeader from "../components/SettingsHeader";

const Settings = () => {
  const { toggleDarkMode, colors } = UseTheme();
  const styles = createSettingsStyles(colors);
  return (
    <View style={{ paddingTop: 50, backgroundColor: colors.bg, flex: 1 }}>
      <ScrollView>
        <SettingsHeader />
        <ProgressCard />
        <Preferences />
        <DangerZone />
      </ScrollView>
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
