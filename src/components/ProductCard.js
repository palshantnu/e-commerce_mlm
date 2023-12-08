import React, {Component, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ToastAndroid,
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
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

const ProductCard = props => {
  const {item, navigation} = props;

  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const [count, setCount] = React.useState(props.count ? props.count : 0);
  const [cart, setItemCart] = React.useState(null);
  const [isLiked, setIsLiked] = React.useState(item?.wishexist);
  const [user, setUser] = React.useState(props?.user);

  useEffect(() => {
    // checkWishlist();
  }, []);

  const handleWishlist = async (id, variant_id, wishexist) => {
    console.log('ids==', id, variant_id, wishexist);
    if (!isLoggedIn)
      return ToastAndroid.show('Please Login', ToastAndroid.SHORT);
    if (wishexist) {
      setIsLiked(false);

      let body = {
        user_id: user?.user_id,
        variant_id: variant_id,
        product_id: id,
      };
      const res = await postData('removefromwish', body);
      console.log('Res-->', res);
    } else {
      setIsLiked(true);

      let body = {
        user_id: user?.user_id,
        variant_id: variant_id,
        product_id: id,
      };
      const res = await postData('addtowish', body);
      console.log('Res2-->', res);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={props.onPress}>
            <Image
              style={styles.productImage}
              source={{
                uri: `${ProductImage + item.image}`,
              }}
            />
            <Text style={styles.title} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.subtitle} numberOfLines={2}>
              {item.variant_name}
            </Text>

            <View style={styles.option}>
              <View style={styles.optionText}>
                <Text style={{fontFamily: Fonts.primaryRegular}}>
                  {item.currency}
                </Text>
                <Text style={styles.mrp}>{item.mrp}</Text>

                <Text style={styles.selling}>{item.selling_price}</Text>
              </View>
              {/* <View style={styles.optionText}>
                <Text style={styles.selling}>{item.selling_price}</Text>
                
              </View> */}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.box2}>
        <TouchableWithoutFeedback>
          <TouchableOpacity
            pointerEvents={'none'}
            style={styles.favoriteContainer}
            onPress={() =>
              handleWishlist(item?.id, item?.variant_id, item?.wishexist)
            }>
            <AntDesign
              name={isLiked ? 'heart' : 'hearto'}
              size={25}
              color={Color.primary}
            />
          </TouchableOpacity>
        </TouchableWithoutFeedback>

        <Text style={styles.discount}>{item.discount}% OFF</Text>
      </View>
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
    padding: 12,
    height: 280,
    width: 220,
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 10,
    elevation: 5,
    margin: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  box1: {
    padding: 12,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: 95,
    position: 'absolute',
    top: 5,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },
  favoriteContainer: {
    zIndex: 1,
  },
  title: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 12,
    color: Color.black,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  subtitle: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 12,
    color: Color.darkgrey,
    textAlign: 'center',
    position: 'relative',
  },
  counter: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 18,
    color: Color.black,
    textAlign: 'center',
    // width: 30,
    paddingHorizontal: 20,
  },
  option: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 10,
    color: Color.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // textAlign: 'center',
    marginVertical: 7,
  },
  optionText: {
    top: 10,
    width: 200,
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: Fonts.primaryRegular,
    justifyContent: 'center',
  },
  mrp: {
    fontFamily: Fonts.primaryRegular,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: Color.black,
    paddingHorizontal: 6,
  },
  selling: {
    fontFamily: Fonts.primaryBold,
    fontSize: 15,

    color: Color.primary,
    paddingHorizontal: 6,
  },
  discount: {
    color: Color.white,
    fontFamily: Fonts.primaryRegular,
    backgroundColor: Color.primary,
    padding: 3,
    fontSize: 12,
    fontWeight: 'bold',
  },
  productImage: {
    height: 120,
    width: '60%',
    resizeMode: 'contain',
    alignItems: 'center',
    marginLeft: 41,
    marginTop: 5,
  },
  addToCart: {
    backgroundColor: Color.primary,
    color: Color.white,
    textAlign: 'center',
    borderRadius: 20,
    position: 'absolute',
    top: 220,
  },
  quantity: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
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
    top: 112,
  },

  addToCartText: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    color: Color.white,
    fontFamily: Fonts.primaryRegular,
  },
  box2: {
    position: 'absolute',
    top: 10,
    right: 8,
    width: 440,
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  plusBtn: {
    padding: 0,
  },
});
export default ProductCard;
