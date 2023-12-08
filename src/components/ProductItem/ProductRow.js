

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
// import {
//   addQtyToCartApi,
//   addToCartApi,
//   addToWishlist,
//   ProductImage,
//   removeFromCartApi,
//   removeFromWishlist,
//   removeQtyToCartApi,
// } from '../../axios/ServerRequest';
import {postData, ProductImage} from '../../API';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import { errorToast } from '../toasts';

const ProductItem = props => {
  const {item, navigation} = props;
  console.log('props?.user==',props?.user);
  console.log('props?.item==',item);

  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const [count, setCount] = React.useState(props.count ? props.count : 0);
  const [cart, setItemCart] = React.useState(null);
  const [isLiked, setIsLiked] = React.useState(item?.wishexist);
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

 
  useEffect(() => {
    // checkWishlist();
  }, []);





  const handleWishlist = async (id, variant_id,wishexist) => {
    console.log('ids==', id, variant_id,wishexist);
    if (!isLoggedIn)
      return ToastAndroid.show('Please Login', ToastAndroid.SHORT);
    if (isLiked) {
     

      let body = {
        user_id: user?.user_id,
        variant_id: variant_id,
        product_id: id,
      };
      const res = await postData('removefromwish', body);
      console.log('Res-->', res);
      if (res?.status == 1){
        setIsLiked(false);
      
      }
      else{
        errorToast('Something went wrong')
      }
    } else {
    

      let body = {
        user_id: user?.user_id,
        variant_id: variant_id,
        product_id: id,
      };
      const res = await postData('addtowish', body);
      console.log('Res2-->', res);
      if (res?.status == 1){
        setIsLiked(true);
      }
      else{
        errorToast('Something went wrong')
      }
    }
  };

 

  return (
   
    <View style={styles.container}>
      <View style={styles.item_top_container}>
        <TouchableOpacity
          onPress={() => handleWishlist(item?.id,item?.variant_id,item?.wishexist)}
          style={styles.favoriteContainer}>
          <AntDesign
            name={isLiked ? 'heart' : 'hearto'}
            size={20}
            color={Color.primary}
          />
        </TouchableOpacity>

        <Text style={styles.discount}>{item.discount}% OFF</Text>
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
        <Text style={{fontFamily: Fonts.primaryRegular}}>{item.currency}</Text>
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
    alignItems: 'center',
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
});
export default ProductItem;
