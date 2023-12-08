import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Switch} from 'react-native';
import {
  useTheme,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Avatar,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getData, ServerURL} from '../API';
import {Color} from '../theme';
import {CommonActions} from '@react-navigation/native';
import {logout} from '../utils/LocalStorage';

export function DrawerContent(props) {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const user = useSelector(state => state.user);

  console.log('user-->', user);
  console.log('isLoggedIn-->', isLoggedIn);

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
        return {
          ...item,
          screenToNavigate: 'Login',
          navOptionName: 'Login',
          navOptionThumb: 'log-in',
        };
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
        routes: [{name: 'WithdrawalWallet'}],
      }),
    );
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                marginTop: 15,
                alignItems: 'center',
                backgroundColor: Color.primary,
                padding: 15,
                borderBottomRightRadius: 35,
              }}>
              <Avatar.Image
                // title={user?.name.substr(0, 1)}
                // rounded
                // source={{
                //   uri: profileData?.profileimage
                //     ? profileData?.profileimage.length > 20
                //       ? `data:image/png;base64,${profileData?.profileimage}`
                //       : `https://rapidhealth.me/assets/doctor/${profileData?.profileimage}`
                //     : 'https://www.w3schools.com/w3images/avatar6.png',
                // }}

                source={{
                  uri: 'https://www.w3schools.com/w3images/avatar6.png',
                }}
                size={100}
              />
              <View
                style={{marginTop: 10, marginLeft: 5, flexDirection: 'column'}}>
                <Title style={styles.title}>{user?.user_name}</Title>
                {/* <Title style={styles.title}>Kaushal</Title> */}
                <Caption style={styles.caption}>{user?.user_mail}</Caption>
              </View>
            </View>
          </View>

          {/* <Drawer.Section style={styles.drawerSection}> */}
          {/* <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="home" size={size} color={color} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home1');
              }}
            /> */}

          <View style={{marginTop: 20}}>
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium', color: Color.primary}}
              icon={({color, size}) => (
                <Icon name="home" size={size} color={Color.primary} />
              )}
              label={'Home'}
              onPress={() => {
                props.navigation.navigate('Home1');
              }}
            />
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium', color: Color.primary}}
              icon={({color, size}) => (
                <Icon name="view-grid" size={size} color={Color.primary} />
              )}
              label={'Category'}
              onPress={() => {
                props.navigation.navigate('Category');
              }}
            />
             {
              user.mlmstatus == "TRUE" &&
              <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium', color: Color.primary}}
              icon={({color, size}) => (
                <MaterialIcons name="dashboard" size={size} color={Color.primary} />
              )}
              label={'Dashboard'}
              onPress={() => {
                props.navigation.navigate('Dashboard');
              }}
            />}
            {  user.mlmstatus == "TRUE" && 
              <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium', color: Color.primary}}
              icon={({color, size}) => (
                <FontAwesome name="users" size={size} color={Color.primary} />
              )}
              label={'Memberlist'}
              onPress={() => {
                props.navigation.navigate('Memberlist');
              }}
            />}
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium', color: Color.primary}}
              icon={({color, size}) => (
                <Icon name="purse" size={size} color={Color.primary} />
              )}
              label={'My Orders'}
              onPress={() => {
                props.navigation.navigate('MyOrder');
              }}
            />
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium', color: Color.primary}}
              icon={({color, size}) => (
                <Icon name="storefront" size={size} color={Color.primary} />
              )}
              label={'NewProduct'}
              onPress={() => {
                props.navigation.navigate('NewProduct');
              }}
            />
             <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium', color: Color.primary}}
              icon={({color, size}) => (
                <Icon name="storefront" size={size} color={Color.primary} />
              )}
              label={'TodayDealProduct'}
              onPress={() => {
                props.navigation.navigate('TodayProduct');
              }}
            />
              <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium', color: Color.primary}}
              icon={({color, size}) => (
                <Icon name="storefront" size={size} color={Color.primary} />
              )}
              label={'FeatureProduct'}
              onPress={() => {
                props.navigation.navigate('FeatureProduct');
              }}
            />
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium', color: Color.primary}}
              icon={({color, size}) => (
                <Icon name="storefront" size={size} color={Color.primary} />
              )}
              label={'BestProduct'}
              onPress={() => {
                props.navigation.navigate('PopularProduct');
              }}
            />
          </View>
          {/* <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="account-heart" size={size} color={color} />
              )}
              label={'Login'}
              onPress={() => {
                props.navigation.navigate('Login');
              }}
            /> */}
          {/* <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="text-box-search" size={size} color={color} />
              )}
              label={t('searchPatient.screenTitle')}
              onPress={() => {
                props.navigation.navigate('SearchPatient');
              }}
            />
             <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="stethoscope" size={size} color={color} />
              )}
              label={t('todayAppointment.screenTitle')}
              onPress={() => {
                props.navigation.navigate('Today');
              }}
            />
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="book-open" size={size} color={color} />
              )}
              label={t('doctorHome.schedule')}
              onPress={() => {
                props.navigation.navigate('Schedule');
              }}
            />
             <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="calendar-month" size={size} color={color} />
              )}
              // label={t('doctorHome.schedule')}
              label={t('disableAppointments.screenTitle')}
              onPress={() => {
                props.navigation.navigate('DisableAppointments');
              }}
            />
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Ionicons
                  name="ios-volume-high-sharp"
                  size={size}
                  color={color}
                />
              )}
              label={t('doctorHome.announcements')}
              onPress={() => {
                props.navigation.navigate('Flash');
              }}
            />
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Ionicons name="receipt" color={color} size={size} />
              )}
              label={t('doctorHome.manageAssistant')}
              onPress={() => {
                props.navigation.navigate('AssistantDashboard');
              }}
            /> */}
          {/* <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="briefcase-search" size={size} />
              )}
              label="Search Jobs"
              onPress={() => {
                props.navigation.navigate('Support');
              }}
            /> */}
          {/* <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => <Icon name="wallet" size={size} />}
              label="My Wallet"
              onPress={() => {
                props.navigation.navigate('Support');
              }}
            /> */}
          {/* <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="account" color={color} size={size} />
              )}
              label={t('doctorHome.feedback')}
              onPress={() => {
                props.navigation.navigate('Feedback');
              }}
            />
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Ionicons name="notifications" color={color} size={size} />
              )}
              label={t('doctorHome.payment')}
              onPress={() => {
                props.navigation.navigate('PaymentHistory');
              }}
            /> */}

          {/* <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text
                  style={{
                    color: Color.black,
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Dark Theme
                </Text>
                <View pointerEvents="none">
                  <Switch value={'s'} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection} {...props}>
        {isLoggedIn ? (
          <DrawerItem
            labelStyle={{fontFamily: 'Poppins-Medium', color: Color.primary}}
            icon={({color, size}) => (
              <Icon name="exit-to-app" color={Color.primary} size={size} />
            )}
            // label={t('doctorHome.signOut')}
            label={'SignOut'}
            onPress={() => {
              logoutUser();
            }}
          />
        ) : (
          <DrawerItem
            labelStyle={{fontFamily: 'Poppins-Medium', color: Color.primary}}
            icon={({color, size}) => (
              <Icon name="account-heart" size={size} color={Color.primary} />
            )}
            label={'Login'}
            onPress={() => {
              props.navigation.navigate('Login');
            }}
          />
        )}
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    // paddingLeft: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    marginTop: 3,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  caption: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 25,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
