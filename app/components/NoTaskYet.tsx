import UseTheme, { ColorScheme } from "@/hooks/useTheme";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const NoTaskYet = () => {
  const { colors } = UseTheme();
  const styles = createNoTaskYetStyles(colors);
  return (
    <View style={styles.container}>
      <Feather name="clipboard" size={150} color={colors.textMuted} />

      <Text style={{ color: colors.text, fontSize: 25 }}>No todos yet!</Text>
      <Text style={{ color: colors.textMuted, fontSize: 20 }}>Add a to do</Text>
    </View>
  );
};

const createNoTaskYetStyles = (colors: ColorScheme) => {
  const styles = StyleSheet.create({
    container: {
      width: "92%" as any,
      flexDirection: "column",
      alignItems: "center",
      rowGap: 15,
    },
  });
  return styles;
};

export default NoTaskYet;
