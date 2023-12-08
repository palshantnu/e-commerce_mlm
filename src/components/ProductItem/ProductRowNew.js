import React, {Component, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import {Color, Fonts, Strings, Dimension} from '../../theme';

import {postData, ProductImage} from '../../API';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {errorToast, successToast} from '../toasts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const ProductItem = props => {
  const {item, navigation} = props;
  console.log('props?.user==', props?.user);
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const [count, setCount] = React.useState(props.count ? props.count : 0);
  const [cart, setItemCart] = React.useState(null);
  const [isLiked, setIsLiked] = React.useState(true);
  const [user, setUser] = React.useState(props?.user);

  const setCart = (item, id, value, price) => {
    let cart = {
      count: value,
      id: id,
      item: item,
      subTotal: parseFloat(price) * value,
    };
    setItemCart(cart);
    props.addToCart(cart);
  };

  // const checkWishlist = () => {
  //   if (!isLoggedIn) return;

  //   if(props.wishlistData!==undefined){
  //     let wishData = props.wishlistData.map((item) => {
  //       return parseInt(item.product_id);
  //     });
  //   }

  //   if (wishData.includes(item.id)) {
  //     setIsLiked(true);
  //   }
  // };

  useEffect(() => {
    // checkWishlist();
  }, []);

  // const addToCart = (id, variant_id) => {
  //   if (!isLoggedIn)
  //     return ToastAndroid.show('Please Login', ToastAndroid.SHORT);
  //   setCount(prev => prev + 1);
  //   setCart(item, item.id, count + 1, parseFloat(item.selling_price));
  //   addToCartApi(user.user_id, id, variant_id)
  //     .then(res => {
  //       ToastAndroid.show('Product Added To Cart', ToastAndroid.SHORT);
  //     })
  //     .catch(err => {
  //       ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
  //     });
  // };

  const addQtyToCart = (id, variant_id) => {
    if (!isLoggedIn)
      return ToastAndroid.show('Please Login', ToastAndroid.SHORT);
    setCount(prev => prev + 1);
    setCart(item, item.id, count + 1, parseFloat(item.selling_price));
    addQtyToCartApi(user?.user_id, id, variant_id)
      .then(res => {
        ToastAndroid.show('Product Added To Cart', ToastAndroid.SHORT);
      })
      .catch(err => {
        ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
      });
  };

  const removeQtyFromCart = (id, variant_id) => {
    if (!isLoggedIn)
      return ToastAndroid.show('Please Login', ToastAndroid.SHORT);
    setCount(prev => prev - 1);
    setCart(item, item.id, count - 1, parseFloat(item.selling_price));
    if (count > 1) {
      removeQtyToCartApi(user?.user_id, id, variant_id)
        .then(res => {
          ToastAndroid.show('Product Removed From Cart', ToastAndroid.SHORT);
        })
        .catch(err => {
          ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
        });
    } else {
      removeFromCartApi(user?.user_id, id, variant_id)
        .then(res => {
          ToastAndroid.show('Product Removed From Cart', ToastAndroid.SHORT);
        })
        .catch(err => {
          ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
        });
    }
  };

  const addToCart = async (id,variant_id) => {
    if (!isLoggedIn)
    return ToastAndroid.show('Please Login', ToastAndroid.SHORT);
    let body = {
      product_id: id,
      variant_id: variant_id,
      user_id: user?.user_id,
    };
    console.log('body=',body);
    const res = await postData('addtocart', body);
    console.log('RESULT=',res)
   if(res?.status){
    successToast(res?.message);
    handleWishlist(id,variant_id);
   }
   else{
    errorToast(res?.message)
   }
   
  };

  const handleWishlist = async (product_id, variant_id) => {
    console.log('ids==', product_id, variant_id);
    let body = {
      user_id: user?.user_id,
      variant_id: variant_id,
      product_id: product_id,
    };
    const res = await postData('removefromwish', body);
    console.log('ResWL2-->', res);
    console.log('BODYWL2-->', body);
    if (res?.status == 1) {
      setIsLiked(false);
      props.fetchWishList();
    } else {
      errorToast('Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.item_top_container}>
        <View>
        <TouchableOpacity
          onPress={() => handleWishlist(item?.product_id, item?.variant_id)}
          style={styles.favoriteContainer}>
          <AntDesign
            name={isLiked ? 'heart' : 'hearto'}
            size={20}
            color={Color.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => addToCart(item?.product_id, item?.variant_id)}
          style={styles.favoriteContainer}>
          <MaterialCommunityIcons
            name={'cart'}
            size={25}
            color={Color.primary}
          />
        </TouchableOpacity>
        </View>
        <View>
        <Text style={styles.discount}>{item.discount}% OFF</Text>
        </View>
      </View>
      <TouchableOpacity onPress={props.onPress}>
        <Image
          style={styles.productImage}
          source={{
            uri: `${ProductImage + item.image}`,
          }}
        />

        <Text style={styles.title} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {item.variant_name}
        </Text>
        <View style={styles.price_container}>
          <Text style={{fontFamily: Fonts.primaryRegular}}>
            {item.currency}
          </Text>
          <Text style={styles.mrp}>{item.mrp}</Text>

          <Text style={styles.selling}>{item.selling_price}</Text>
        </View>
      </TouchableOpacity>
    
    </View>
  );
};

ProductItem.propTypes = {
  addToCart: PropTypes.func,
  item: PropTypes.object,
  count: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    width: Dimensions.get('window').width / 2 - 20,
    padding: 5,
    backgroundColor: Color.white,
    shadowColor: Color.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5,
    shadowRadius: 5,
    borderRadius: 10,
    elevation: 5,
    margin: 8,
    // alignItems:'center'
  },
  item_top_container: {
    // position:'absolute',
    top: 5,
    flexDirection: 'row',
  //  alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  discount: {
    color: Color.white,
    fontFamily: Fonts.primaryRegular,
    backgroundColor: Color.primary,
    padding: 3,
    fontSize: 8,
    fontWeight: 'bold',
  },
  productImage: {
    height: 120,
    width: '60%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 12,
    color: Color.black,

    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 12,
    color: Color.darkgrey,
    textAlign: 'center',
  },
  price_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    flex: 1,
  },
  mrp: {
    fontFamily: Fonts.primaryRegular,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: Color.black,
    // paddingHorizontal: 6,
  },
  selling: {
    fontFamily: Fonts.primaryBold,
    fontSize: 15,

    color: Color.primary,
    //  paddingHorizontal: 6,
  },
  addToCart: {
    // flexWrap: 'nowrap',
    backgroundColor: Color.primary,
    color: Color.white,
    textAlign: 'center',
    borderRadius: 8,
    width: 60,
    marginTop: 10,
    // padding: 4,
    justifyContent: 'center',
    fontWeight: 'bold',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
      marginLeft: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  addToCartText: {
    paddingTop: 7,
    paddingBottom: 7,
    // paddingLeft: 2,
    // paddingRight: 15,
    paddingHorizontal: 2,
    color: Color.white,
    fontSize: 15,
  },
});
export default ProductItem;
