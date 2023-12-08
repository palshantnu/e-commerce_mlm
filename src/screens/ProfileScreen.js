import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {Color} from '../theme';
import {getUserDetails, getCart} from '../utils/LocalStorage';
import Cart from '../utils/Cart';
import Logo from '../components/Logo';

const ProfileScreen = (props) => {

  const [cartCount, setCartCount] = React.useState(0);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    let reRenderSomething = props.navigation.addListener('focus', () => {
      init();
    });
  }, []);

  const init = async () => {
    let cart = await getCart();
    let userDetails = await getUserDetails();
    setCartCount(Cart.getTotalCartCount(cart));
    setUser(userDetails);
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.scrollview}>
        <View style={{marginTop: '10%', marginBottom: '5%'}}>
          <Logo />
        </View>
        <View style={styles.userRow}>
          <Text>Name : </Text>
          <Text>{user ? user.user_name : null}</Text>
        </View>
        <View style={styles.border} />
        <View style={styles.userRow}>
          <Text>Mobile : </Text>
          <Text>{user ? user.user_phone : null}</Text>
        </View>
        <View style={styles.border} />
        <View style={styles.userRow}>
          <Text>Address : </Text>
          <Text>
            {user
              ? ` ${user.address},  ${user.city},  ${user.state}- ${user.zip}`
              : null}
          </Text>
        </View>
        <View style={styles.border} />
      </ScrollView>
      <View style={styles.bottomImage}>
        <Image source={require('../assets/images/thumb1.png')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    flexDirection: 'column',
  },
  scrollView: {
    backgroundColor: Color.white,
    flexDirection: 'column',
    padding: 20,
    flexGrow: 1,
  },
  bottomImage: {
    height: 150,
    width: 150,
    position: 'absolute',
    bottom: 0,
    right: 80,
    zIndex: 1,
    flex: 1,
    opacity: 0.5,
    justifyContent: 'flex-end',
  },
  userRow: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 10,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: Color.graylight,
    margin: 10,
  },
});

export default ProfileScreen;
