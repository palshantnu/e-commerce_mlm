import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {Color, Fonts, Strings, Dimension} from '../../theme';
import {postData, ProductImage} from '../../API';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import {Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {successToast} from '../toasts';
import {useSelector} from 'react-redux';

const CartItem = props => {
  const isLoggedIn = useSelector(state => state?.isLoggedIn);
  const user = useSelector(state => state.user);
  const {item, navigation} = props;
  //const [count, setCount] = React.useState(props.count ? props.count : 1);
  const [count, setCount] = React.useState(item?.quantity);

  const [cart, setItemCart] = React.useState(null);
  const [totalPrice, setTotalPrice] = React.useState(0);

  const setCart = (item, id, value, price) => {
    let cart = {
      count: value,
      id: id,
      item: item,
      subTotal: parseFloat(price) * parseFloat(value),
    };
    setItemCart(cart);
    props.addToCart(cart);
  };

  const addQtyToCart = async item => {
    let body = {
      product_id: item?.product_id,
      variant_id: item?.variant_id,
      user_id: user?.user_id,
    };
    console.log('body=', body);
    const res = await postData('addqtytocart', body);
    console.log('AddRESULT=', res);
    if (res?.status) {
      successToast(res?.message);

      setCount(res?.quantity);
      props.getUserCart()
    } else {
      errorToast(res?.message);
    }
  };

  const removeQtyFromCart = async item => {
    let body = {
      product_id: item?.product_id,
      variant_id: item?.variant_id,
      user_id: user?.user_id,
    };
    console.log('body=', body);
    const res = await postData('removeqtycart', body);
    console.log('remRESULT=', res);
    if (res?.status) {
      successToast(res?.message);
      setCount(prev => prev - 1);
      props.getUserCart();
    } else {
      errorToast(res?.message);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.box2}>
          <View>
            <Image
              style={styles.productImage}
              source={{
                uri: `${ProductImage + item.image}`,
              }}
            />
          </View>
          <View style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.option}>
              <View style={styles.optionText}>
                <Text style={{fontFamily: Fonts.primaryRegular}}>
                  {item.currency}
                </Text>
                <Text style={styles.mrp}>{item.mrp}</Text>
              </View>
              <View style={styles.optionText}>
                <Text style={styles.selling}>{item.selling_price}</Text>
                <Text style={styles.discount}>{item.discount}% OFF</Text>
              </View>
            </View>
            <View style={styles.quantitContainer}>
              <TouchableOpacity
                onPress={() => {
                  // count > 1 ?   setCount(prev => prev - 1) : null;
                  setCart(item, item.id, count - 1, item.selling_price);
                  count > 1 ? removeQtyFromCart(item) : null;
                }}>
                <Icon name="minus" size={20} color={Color.red} />
              </TouchableOpacity>
              <Text style={styles.quantityCount}>
                {count +
                  '*' +
                  item.selling_price +
                  ' = ' +
                  item.currency +
                  ' ' +
                  count * item.selling_price}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  // setCount(prev => prev + 1);
                  setCart(item, item.id, count + 1, item.price);
                  addQtyToCart(item);
                }}>
                <Icon name="plus" size={20} color={Color.colorPrimary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.deleteBtn}>
          {/* <TouchableOpacity
            onPress={() => {
              setCount(0);
              // setCart(item, item.id, 0, item.selling_price) && props.deleteFromCart(item);
            props.removeFromCart();
            }}>
            <Icon name="trash-2" size={20} color={Color.red} />
          </TouchableOpacity> */}
          <Button
            mode="contained"
            onPress={() => props.removeFromCart()}
            icon={({size, color}) => (
              <MaterialCommunityIcons
                name="delete-empty"
                size={20}
                style={{color}}
              />
            )}
            labelStyle={{
              fontFamily: Fonts.primaryBold,
              fontSize: 15,
            }}
            style={{
              backgroundColor: Color.colorPrimary,
              borderRadius: 8,
              marginBottom: 8,
              width: Dimensions.get('window').width / 3,
            }}
            contentStyle={{alignItems: 'center'}}
            uppercase={false}
            // dark
          >
            Remove
          </Button>
        </View>
      </View>
    </View>
  );
};

CartItem.propTypes = {
  addToCart: PropTypes.func,
  item: PropTypes.object,
  count: PropTypes.number,
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    paddingTop: 10,
  },
  container: {
    width: '100%',
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 10,
    elevation: 2,
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 14,
    color: Color.titleColor,
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 10,
  },
  quantityCount: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 14,
    color: Color.black,
    marginLeft: 10,
    marginRight: 10,
  },
  attribute: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 14,
    color: Color.colorPrimary,
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  counter: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 16,
    color: Color.black,
    textAlign: 'center',
    width: 30,
  },
  option: {
    // fontFamily: Fonts.primarySemiBold,
    // fontSize: 10,
    color: Color.black,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // textAlign: 'center',
    marginHorizontal: 25,
  },
  optionText: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  mrp: {
    fontFamily: Fonts.primaryRegular,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: Color.red,
    paddingHorizontal: 6,
  },
  selling: {
    fontFamily: Fonts.primaryBold,
    fontSize: 15,
    color: Color.colorPrimary,
    paddingHorizontal: 6,
  },
  discount: {
    fontFamily: Fonts.primaryRegular,
  },
  productImage: {
    height: 70,
    width: 70,
  },
  addToCart: {
    backgroundColor: Color.colorPrimary,
    color: Color.white,
    textAlign: 'center',
    borderRadius: 20,
  },
  quantity: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Color.white,
    color: Color.white,
    textAlign: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 33,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  quantitContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
  },

  addToCartText: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 20,
    paddingRight: 20,
    color: Color.white,
  },
  box2: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusBtn: {
    padding: 10,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: Color.graylight,
  },
  deleteBtn: {
    // position: 'absolute',
    // bottom: 10,
    // right: 10,
    // zIndex: 999,
    // marginTop:5,
    alignItems: 'center',
  },
});
export default CartItem;
