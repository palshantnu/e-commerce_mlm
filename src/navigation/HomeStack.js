import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ProductView from '../screens/ProductView';
import SubCategoryScreen from '../screens/SubCategoryScreen';
// import ProductView1 from '../screens/ProductView1';
const HomeStack = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName='Home1'>
    <Stack.Screen
    name='Home1'
    component={HomeScreen}
    options={{headerShown:false}}

    />
    <Stack.Screen
    name='Category'
    component={CategoryScreen}
    options={{headerShown:false}}
    />

   <Stack.Screen
    name='SubCategory'
    component={SubCategoryScreen}
    options={{headerShown:false}}
    />

<Stack.Screen
    name='Product'
    component={ProductView}
    options={{headerShown:false}}
    />
{/* 
<Stack.Screen
    name='Product1'
    component={ProductView1}
    options={{headerShown:false}}
    /> */}

    </Stack.Navigator>
  )
}

export default HomeStack

