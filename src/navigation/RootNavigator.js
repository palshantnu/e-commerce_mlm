import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {DrawerContent} from './DrawerContent';
import HomeStack from './HomeStack';
import AppHeader from './AppHeader';
import NewProductScreen from '../screens/NewProductScreen';
import PopularProductScreen from '../screens/PopularProductScreen';
import BuyNowScreen from '../screens/BuyNowScreen';
import TodayDealProductScreen from '../screens/TodayDealProductScreen';
import FeatureProductScreen from '../screens/FeatureProductScreen';
import MyCartScreen from '../screens/MyCartScreen';
import ProductScreen from '../screens/ProductScreen';
import MyWishlistScreen from '../screens/MyWishlistScreen';
import MyOrderScreen from '../screens/MyOrderScreen';
import SearchScreen from '../screens/SearchScreen';
import Dashboard from '../screens/Dashboard';
import Memberlist from '../screens/Memberlist';
import Addmember from '../screens/Addmember';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WithdrawalWallet from '../screens/WithdrawalWallet';
import WalletWithdrawallist from '../screens/WalletWithdrawallist';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="DrawerNavigator"
          
          component={HomeStack}
          options={{
          header: props => <AppHeader {...props} />,
        
          }}
          
        />
         <Drawer.Screen
          name="NewProduct"
          component={NewProductScreen}
          options={{
         // header: props => <AppHeader {...props} />,
        headerShown:false
          }}
        />
         <Drawer.Screen
          name="MyCart"
          component={MyCartScreen}
          options={{
          header: props => <AppHeader {...props} />,
         // headerShown:false
          }}
        />
          <Drawer.Screen
          name="MyWishlist"
          component={MyWishlistScreen}
          options={{
         // header: props => <AppHeader {...props} />,
          headerShown:false
          }}
        />
         <Drawer.Screen
          name="PopularProduct"
          component={PopularProductScreen}
          options={{
         // header: props => <AppHeader {...props} />,
          headerShown:false
          }}
        />
            <Drawer.Screen
          name="TodayProduct"
          component={TodayDealProductScreen}
          options={{
         // header: props => <AppHeader {...props} />,
          headerShown:false
          }}
        />
          <Drawer.Screen
          name="FeatureProduct"
          component={FeatureProductScreen}
          options={{
          //header: props => <AppHeader {...props} />,
          headerShown:false
          }}
        />
        <Drawer.Screen
          name="Products"
          component={ProductScreen}
          options={{
          //header: props => <AppHeader {...props} />,
          headerShown:false
          }}
        />
          <Drawer.Screen
          name="Buy"
          component={BuyNowScreen}
          options={{
          //header: props => <AppHeader {...props} />,
          headerShown:false
          }}
        />
         <Drawer.Screen
          name="MyOrder"
          component={MyOrderScreen}
          options={{
          header: props => <AppHeader {...props} />,
          //headerShown:false
          }}
        />
         <Drawer.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
          header: props => <AppHeader {...props} />,
          //headerShown:false
          }}
        />
        <Drawer.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
          header: props => <AppHeader {...props} />,
          //headerShown:false
          }}
        />
        <Drawer.Screen
          name="Memberlist"
          component={Memberlist}
          options={{
          header: props => <AppHeader {...props} />,
          //headerShown:false
          }}
        />
        <Drawer.Screen
          name="Addmember"
          component={Addmember}
          options={{
          header: props => <AppHeader {...props} />,
          //headerShown:false
          }}
        />
        <Drawer.Screen
          name="WithdrawalWallet"
          component={WithdrawalWallet}
          options={{
          // header: props => <AppHeader {...props} />,
          headerShown:false
          }}
        />
        <Drawer.Screen
          name="WalletWithdrawallist"
          component={WalletWithdrawallist}
          options={{
          // header: props => <AppHeader {...props} />,
          headerShown:false
          }}
        />
        <Drawer.Screen
          name="Auth"
          component={AuthStack}
          options={{
          // header: props => <AppHeader {...props} />,
          //headerShown:false
          }}
        />
      </Drawer.Navigator>
    );
  }



const RootNavigator = () => {
  return (
  <NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen
    name='Auth'
    component={AuthStack}
    options={{headerShown:false}}
     />
     <Stack.Screen
    name='HomeScreen'
    component={DrawerNavigator}
    options={{headerShown:false}}
     />
  </Stack.Navigator>
  </NavigationContainer>
  )
}

export default RootNavigator

