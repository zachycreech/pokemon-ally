import React from "react";
import { Text, StyleSheet, Button } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Error = ({ error, resetError }: any) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Oops! Something went wrong.</Text>
        <Text style={styles.errorMessage}>{error.message}</Text>
        <Button title="Try Again" onPress={resetError} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
  },
  errorMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default Error;
