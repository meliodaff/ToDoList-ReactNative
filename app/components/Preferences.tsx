import UseTheme, { ColorScheme } from "@/hooks/useTheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
const Preferences = () => {
  const Divider = () => {
    return (
      <View
        style={{
          width: "95%" as any,
          borderColor: colors.border,
          borderWidth: 1,
          marginHorizontal: "auto",
          borderRadius: 10,
          marginVertical: 20,
        }}
      ></View>
    );
  };

  const { isDarkMode, toggleDarkMode, colors } = UseTheme();
  const styles = createPreferencesStyles(colors);
  return (
    <LinearGradient colors={colors.gradients.surface} style={styles.container}>
      <Text style={styles.primaryText}>Preferences</Text>
      <View>
        <View style={styles.switchesContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <LinearGradient
              colors={colors.gradients.primary}
              style={{ borderRadius: 5, padding: 10, marginRight: 15 }}
            >
              <Ionicons name="moon" size={15} color="white" />
            </LinearGradient>
            <Text style={styles.switchesText}>Dark Mode</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            thumbColor={"white"}
            trackColor={{ false: colors.border, true: colors.primary }}
            style={styles.switchesSize}
          />
        </View>
      </View>
      <View>
        <Divider />
        <View style={styles.switchesContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <LinearGradient
              colors={colors.gradients.warning}
              style={{ borderRadius: 5, padding: 10, marginRight: 15 }}
            >
              <FontAwesome name="bell" size={15} color="white" />
            </LinearGradient>
            <Text style={styles.switchesText}>Notifications</Text>
          </View>
          <Switch
            // value={}
            // onValueChange={}
            thumbColor={"white"}
            trackColor={{ false: colors.border, true: colors.warning }}
            style={styles.switchesSize}
          />
        </View>
      </View>
      <View>
        <Divider />

        <View style={styles.switchesContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <LinearGradient
              colors={colors.gradients.success}
              style={{ borderRadius: 5, padding: 10, marginRight: 15 }}
            >
              <AntDesign name="sync" size={15} color="white" />
            </LinearGradient>
            <Text style={styles.switchesText}>Auto Sync</Text>
          </View>
          <Switch
            // value={}
            // onValueChange={}
            thumbColor={"white"}
            trackColor={{ false: colors.border, true: colors.success }}
            style={styles.switchesSize}
          />
        </View>
      </View>

      {/* DANGER ZONE */}

      <View></View>
    </LinearGradient>
  );
};

const createPreferencesStyles = (colors: ColorScheme) => {
  const styles = StyleSheet.create({
    container: {
      width: "92%" as any,
      marginHorizontal: "auto" as "auto",
      borderRadius: 30,
      paddingHorizontal: 10,
      paddingVertical: 20,
      marginBottom: 30,
    },
    primaryText: {
      fontSize: 25,
      fontWeight: 700,
      paddingLeft: 20,
      color: colors.text,
      marginBottom: 30,
    },
    switchesContainer: {
      marginHorizontal: "auto" as "auto",
      width: "90%" as any,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    switchesText: {
      fontSize: 20,
      fontWeight: 600,
      color: colors.text,
    },
    switchesSize: {
      transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
    },
  });
  return styles;
};

export default Preferences;

{
  /* <Switch
  value={isDarkMode}
  onValueChange={toggleDarkMode}
  thumbColor={"fff"}
  trackColor={{ false: colors.border, true: colors.primary }}
/> */
}
