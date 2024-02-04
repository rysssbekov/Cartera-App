import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navigation from "./src/navigation";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
 
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Navigation />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

