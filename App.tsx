import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainPage from './pages/MainPage'
import ManageTrends from './pages/ManageTrends';
import CreateTrend from './pages/CreateTrend';


const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator
      screenOptions={{
        headerShown:false,
      }}>
        <Stack.Screen name='Home' component={MainPage}/>
        <Stack.Screen name='Manage Trends' component={ManageTrends}/>
        <Stack.Screen name='Create Trend' component={CreateTrend}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;