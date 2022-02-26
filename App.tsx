import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import RootStackNavigator from './src/navigation/RootStackNavigator';
import store from './src/redux/store/store'
export default function App() {
  return (
    <Provider store={store}>
    
     <RootStackNavigator/>
     </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});
