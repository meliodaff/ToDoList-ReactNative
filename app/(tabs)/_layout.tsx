import { Tabs } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "@/hooks/useTheme";

const Layout = () => {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 100,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: 600,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Todos",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="flash-outline" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="settings" // this is connected to the name of the component
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="settings-outline" size={size} color={color} />
            );
          },
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({});

export default Layout;
