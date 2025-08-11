import UseTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

const Header = (props: any) => {
  const { colors } = UseTheme();
  return (
    <View style={[styles.header]}>
      <LinearGradient
        colors={colors.gradients.primary}
        style={{ borderRadius: 10, marginRight: 10 }}
      >
        <Ionicons
          name="flash-outline"
          size={27}
          color="white"
          style={{
            padding: 10,
            alignSelf: "flex-end",
          }}
        />
      </LinearGradient>
      <View>
        <Text style={[styles.primaryText, { color: colors.text }]}>
          Today's Tasks 👀
        </Text>

        <Text
          style={[styles.secondaryText, { marginTop: -8, color: colors.text }]}
        >
          {props.completedTaskCount} of {props.tasks.length} completed
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginHorizontal: "auto",
    alignItems: "center",
    marginBottom: 30,
  },
  primaryText: {
    fontSize: 40,
    fontWeight: 700,
  },
  secondaryText: {
    fontSize: 20,
  },
});

export default Header;
