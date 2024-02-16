import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navigation from "./src/navigation";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Toast from 'react-native-toast-message';

const queryClient = new QueryClient();

export default function App() {
 
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <View style={styles.container}>
          <Navigation />
        </View>
      </QueryClientProvider>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

