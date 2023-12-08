import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
   <Stack.Navigator initialRouteName='SplashScreen'>
    <Stack.Screen 
    name='SplashScreen'
    component={SplashScreen}
    options={{header: () => null}}
    />
    <Stack.Screen 
     name='Login'
     component={LoginScreen}
     options={{header: () => null}}
    />
    <Stack.Screen 
     name='Register'
     component={RegisterScreen}
     options={{header: () => null}}
    />
        
   
   </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})