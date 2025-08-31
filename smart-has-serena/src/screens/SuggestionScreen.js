import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SuggestionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Sugestão de Bem-Estar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 }
});

export default SuggestionScreen;