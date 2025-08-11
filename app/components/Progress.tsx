import UseTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Progress = (props: any) => {
  const { colors } = UseTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        borderRadius: 20,
        marginHorizontal: "auto",
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 3,
        borderTopColor: colors.border,
        borderRightColor: colors.border,
        borderBottomColor: colors.border,
        borderLeftColor: props.borderLeftColor,
      }}
    >
      <LinearGradient
        colors={colors.gradients.background}
        style={{
          flexDirection: "row",
          padding: 25,
          borderRadius: 20,
          width: "80%",
        }}
      >
        <LinearGradient
          colors={props.gradientIcon}
          style={{ padding: 15, borderRadius: 50, marginRight: 15 }}
        >
          <props.iconOrigin name={props.iconName} size={20} color="white" />
        </LinearGradient>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ color: colors.text, fontSize: 30, fontWeight: 700 }}>
            {props.number}
          </Text>
          <Text style={{ color: colors.textMuted }}>{props.category}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Progress;
