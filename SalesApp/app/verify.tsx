import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import VerificationCard from "@/components/VerificationCard";

export default function VerifyScreen() {
  const { email } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: "Verify Email" }} />

      <Text style={styles.infoText}>
        We sent a code to: {email}
      </Text>

      <VerificationCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  infoText: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
    color: "gray",
  },
});
