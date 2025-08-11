import UseTheme from "@/hooks/useTheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Progress from "./Progress";
const ProgressCard = () => {
  const { colors } = UseTheme();
  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={{
        borderRadius: 30,
        width: "92%",
        marginHorizontal: "auto",
        paddingVertical: 15,
        marginBottom: 30,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 25,
          fontWeight: 600,
          width: "79%",
          marginHorizontal: "auto",
          marginBottom: 15,
        }}
      >
        Progress Stats
      </Text>
      <View style={{ marginBottom: 15, rowGap: 15 }}>
        <Progress
          borderLeftColor={colors.primary}
          iconOrigin={Feather}
          gradientIcon={colors.gradients.primary}
          iconName="list"
          number="4"
          category="Total Todos"
        />
        <Progress
          borderLeftColor={colors.success}
          iconOrigin={AntDesign}
          gradientIcon={colors.gradients.success}
          iconName="checkcircle"
          number="2"
          category="Completed"
        />
        <Progress
          borderLeftColor={colors.warning}
          iconOrigin={AntDesign}
          gradientIcon={colors.gradients.warning}
          iconName="clockcircle"
          number="2"
          category="Active"
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({});

export default ProgressCard;
