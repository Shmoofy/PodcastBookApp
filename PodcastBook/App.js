import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import SignInScreen from './src/screens/SignInScreen';

const App = () => {
  return (
    <View style={styles.root}>
      <SignInScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'lightblue'
  },
});

export default App;