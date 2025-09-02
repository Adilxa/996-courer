import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PurpleButtonComponent = () => {
  return (
    <View style={styles.container}>
      <Text>PurpleButtonComponent Screen</Text>
    </View>
  );
};

export default PurpleButtonComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});