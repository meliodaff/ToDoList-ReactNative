import UseTheme from "@/hooks/useTheme";
import { createHomeStyles } from "@/styles/home.styles";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

const ProgressBar = ({
  progressPercentage,
}: {
  progressPercentage: number;
}) => {
  const { colors } = UseTheme();
  const homeStyles = createHomeStyles(colors);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: "auto",
        marginBottom: 20,
        width: "80%",
      }}
    >
      <View style={[homeStyles.progressContainer, { width: "85%" }]}>
        <View style={[homeStyles.progressBarContainer]}>
          <View style={homeStyles.progressBar}>
            <LinearGradient
              colors={colors.gradients.success}
              style={[
                homeStyles.progressFill,
                { width: `${progressPercentage}%` },
              ]}
            ></LinearGradient>
          </View>
        </View>
      </View>
      <Text
        style={{
          color: colors.success,
          fontSize: 20,
          fontWeight: 700,
          width: 65,
          paddingLeft: 20,
        }}
      >
        {progressPercentage}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProgressBar;
