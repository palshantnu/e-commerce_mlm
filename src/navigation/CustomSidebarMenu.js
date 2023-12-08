//This is an example code for Navigation Drawer with Custom Side bar//
import React, {useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';

import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-feather1s';
import Color from '../theme/Color';
import Font from '../theme/Fonts';
import {getUserDetails, logout} from '../utils/LocalStorage';
import {useDispatch, useSelector} from 'react-redux';

export default CustomSidebarMenu = (props) => {
  var items = [
    {
      navOptionThumb: 'home',
      navOptionName: 'Home',
      screenToNavigate: 'Home',
    },

    {
      navOptionThumb: 'user',
      navOptionName: 'My Profile',
      screenToNavigate: 'Profile',
    },
    {
      navOptionThumb: 'grid',
      navOptionName: 'Category',
      screenToNavigate: 'Category',
    },
  
    {
      navOptionThumb: 'gift',
      navOptionName: 'My Offers',
      screenToNavigate: 'Offers',
    },
    {
      navOptionThumb: 'command',
      navOptionName: 'New Products',
      screenToNavigate: 'NewProducts',
    },
    {
      navOptionThumb: 'codesandbox',
      navOptionName: 'Popular Products',
      screenToNavigate: 'PopularProducts',
    },

    {
      navOptionThumb: 'shopping-cart',
      navOptionName: 'My Cart',
      screenToNavigate: 'MyCart',
    },
    {
      navOptionThumb: 'file-text',
      navOptionName: 'My Order',
      screenToNavigate: 'MyOrder',
    },
  ];
  const [options, setOptions] = React.useState(items);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const user = useSelector((state) => state.user);


  const dispatch = useDispatch();

  useEffect(() => {
    fetchUser();

  }, []);

  const fetchUser = async () => {
    // let user = await getUserDetails();
    // setUser(user);
    // console.log("userdata",user)


    if (isLoggedIn) return;

    let tempState = items.map((item, key) => {
      if (item.navOptionName === 'My Profile') {
        return {...item, screenToNavigate: 'Login', navOptionName: 'Login',navOptionThumb: 'log-in',};
      }
      return item;
    });
    setOptions(tempState);
  };

  const logoutUser = () => {
    logout();
    // props.navigation.replace('Login');
    dispatch({
      type: 'LOGOUT',
    });

    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'HomeScreen'}],
      }),
    );
  };

  const getActiveRouteState = (name) => {
    let active = false;
    if (props.state !== undefined) {
      let activeIndex = props.state.index;
      let activeRouteName = props.state.routes[activeIndex].name;
      if (activeRouteName === name) {
        active = true;
      }
    }
    return active;
  };

  return (
    <View style={styles.sideMenuContainer}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/images/user.png')}
            style={styles.sideMenuProfileIcon}
          />
                     <View><Text style={styles.title}> {user.user_name}</Text>
                     <Text style={styles.title}> {user.user_mail}</Text></View> 

         
          {/* {user !== null ? (
            <Text style={styles.title}>{user.user_name}</Text>
          ) : null} */}
        </View>

        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
          }}
        />

        <View style={{width: '100%'}}>
          {options.map((item, key) => (
            <TouchableOpacity
              onPress={() => {
                global.currentScreenIndex = key;
                props.navigation.navigate(item.screenToNavigate);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 15,
                paddingBottom: 15,
                marginTop: 10,
                marginBottom: 10,
                backgroundColor: getActiveRouteState(item.screenToNavigate)
                  ? '#F7F7F7'
                  : Color.white,
              }}
              key={key}>
              <View style={{marginRight: 15, marginLeft: 20}}>
                <Icon
                  name={item.navOptionThumb}
                  size={22}
                  color={
                    getActiveRouteState(item.screenToNavigate)
                      ? Color.colorPrimary
                      : '#808080'
                  }
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: getActiveRouteState(item.screenToNavigate)
                    ? Color.colorPrimary
                    : 'black',
                }}>
                {item.navOptionName}
              </Text>
            </TouchableOpacity>
          ))}
          {isLoggedIn && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <View style={{marginRight: 10, marginLeft: 20}}>
                <Icon name="log-out" size={24} color="#808080" />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                }}
                onPress={() => {
                  logoutUser();
                }}>
                Logout
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const BAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  title: {
    fontFamily: Font.primarySemiBold,
    color: Color.black,
    fontSize: 12,
    marginLeft: 10,
  },

  profileContainer: {
    width: '100%',
    height: 80,
    marginTop: BAR_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.iconBG,
    paddingLeft: 20,
    paddingRight: 20,
  },
  bottomContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Color.colorPrimary,
    display: 'flex',
  },
});
