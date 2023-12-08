import React, {Component, useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import CoupanCard from '../components/ViewSlider/CoupanCard';
import UseraddScreen from './UseraddScreen';
import {getItemCount} from '../utils/Cart';
import {getTotalCartCount} from '../utils/Cart';
import {isProductExist} from '../utils/Cart';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  BackHandler,
} from 'react-native';

import {Color, Fonts, Strings} from '../theme';

import Icon from 'react-native-vector-icons/AntDesign';

import Cart from '../utils/Cart';
import {useSelector} from 'react-redux';
// import {
//   getNewProducts,
//   ProductImage,
//   getProductview,
// } from '../axios/ServerRequest';
import {
  getProductItem,
  getCart,
  setCart,
  setProductItem,
  getUserDetails,
} from '../utils/LocalStorage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductItem from '../components/ProductItem';
//import Slider from '../components/NewImageSlider/Slider';
import MyBannerSlider from '../components/MyBannerSlider';
import BannerSlider from '../components/BannerSlider';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {postData} from '../API';
import {errorToast, successToast} from '../components/toasts';

export default function ProductView({navigation, route}) {
  console.log('NewItem=', route?.params?.params?.item);
  const user = useSelector(state => state?.user) || {};
  const isLoggedIn = useSelector(state => state?.isLoggedIn);
  const [cartCount, setCartCount] = React.useState(0);
  const [productItem, setProductItem] = React.useState(null);
  const [count, setCount] = React.useState(0);
  const [cart, setCart] = React.useState(null);
  const [itemIndex, setItemIndex] = React.useState(-1);
  const [newProduct, setNewProduct] = React.useState([]);
  const [product, setProduct] = React.useState([]);
  const [productImg, setProductImg] = React.useState(null);
  const [attribute, setAttribute] = React.useState([]);
  const [Img, setImg] = React.useState([]);
  const [Coupan, setCoupan] = React.useState([]);
  const [similarity, setSimilarity] = React.useState([]);
  const [userid, setUserid] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);

  const {width, height} = Dimensions.get('window');

  var item = null;

  const fetchData = async () => {
    // let cart = await getCart();
    // console.log('getCart()==>', cart);
    let user = getUserDetails();

    // console.log(">>>>>>>>>user",user)
    // console.log(">>>>>>>>>>itemdataproductview",this.props.route.params.item)

    if (route.params !== undefined) {
      // console.log(">>>>>>>>>>>item",route?.params?.params?.item)
      item = route?.params?.params?.item;

      console.log('>>>>>>>>>>>item', item);
    }

    // let cartCount = getTotalCartCount(cart);
    // let productIndex = isProductExist(cart, item);
    // console.log('>>>>>>>>>>>item2', productIndex);
    // let count = getItemCount(cart, item);
    // console.log('>>>>>>>>>>>count', count);
    // setCartCount(cartCount);
    // setItemIndex(productIndex);
    // setCart(cart);
    // setCount(count);
    // setNewProduct(item);
    // setRefresh(true);

    fetchNewProducts(item);
  };

  useEffect(() => {
    fetchData();

    // const timer = setTimeout(() => {
    //   fetchNewProducts(item);
    // }, 1000);

    // return () => clearTimeout(timer);
  }, []);

  ////////////fetch data through API//////////
  const fetchNewProducts = async item => {
    let variant_id = item.variant_id;
    // let user_id = userid;
    // loading.current.show();
    // getNewProducts(user_id,variant_id)
    console.log('variant_id-->', variant_id, user?.user_id);
    const resp = await fetch(
      `http://mlm.propertyindholera.com/api/productdetails?variant_id=${variant_id}&user_id=${user?.user_id}`,
    );
    const data = await resp.json();
    console.log('output--', data);

    if (data.status == 1) {
      const productimg = data?.product_images;
      const Images = Object.values(productimg);
      console.log('productimg111---', Images);
      setSimilarity(data.similar_product);
      setCoupan(data.coupans);
      setProductItem(data.product);

      setProductImg(Images);

      setAttribute(data.attribute);
      setRefresh(true);

      console.log('discount---', data?.product?.discount);
      console.log('productimg222---', route?.params?.params?.item?.product_id);
    } else {
      // console.log('error in productview>');
      errorToast(data?.message);
    }
  };

  //////////////add to cart//////////////////
  const setToCart = (item, id, value, price) => {
    console.log('items-->', item, id, value, price);
    let cart = {
      count: value,
      id: id,
      item: item,
      subTotal: parseFloat(price) * value,
    };
    // addToCart(item,id);
  };

  const navigateToScreen = item => {
    navigation.push('Product', {
      screen: 'ProductView',
      params: {item: item},
    });
  };

  const renderProductItem = item => {
    let cart = getItemCount(cart, item);
    console.log('jihuk');
    return (
      <ProductItem
        item={item}
        //  addToCart={addToCart()}
        count={count}
        user={user}
        onPress={() => navigateToScreen(item)}
      />
    );
  };

  const renderCoupan = item => {
    // let cart = Cart.getItemCount(cartList, item);
    return (
      <CoupanCard
        data={item}
        // onPress={() => navigateToScreen(item)}
      />
    );
  };

  const _renderItem = ({item}) => (
    <Image
      //imageStyle={{borderRadius: 13}}
      value={item}
      key={item}
      //   source={{
      //    uri:`${ProductImage+item}`

      //   }}
      //  source={item.img}
      source={{
        uri: `http://mlm.propertyindholera.com/public/product/images/${item}`,
      }}
      resizeMode="contain"
      style={{
        height: 249,
        flex: 1,
        width: Dimensions.get('window').width,
        borderRadius: 13,
      }}
    />
  );

  const addToCart = async () => {
    if (!isLoggedIn)
      return ToastAndroid.show('Please Login', ToastAndroid.SHORT);
    let body = {
      product_id: route?.params?.params?.item?.id,
      variant_id: route?.params?.params?.item?.variant_id,
      user_id: user?.user_id,
    };
    if (route?.params?.params?.item?.id == undefined) {
      body.product_id = route?.params?.params?.item?.product_id;
    }
    console.log('body=', body);
    const res = await postData('addtocart', body);
    console.log('RESULT=', res);
    if (res?.status) {
      successToast(res?.message);
    } else {
      errorToast(res?.message);
    }
  };

  React.useEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.goBack();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* <Text style={{color:Color.black,fontFamily:Fonts.primaryBold}}>Slidermll,llnjkhkjhkhjkhbkkhj</Text> */}
        {productItem !== undefined && productItem !== null ? (
          <>
            <View style={styles.imageContainer}>
              {/* <Slider img={productImg} att={attribute} /> */}
              {/* <BannerSlider img={productImg} /> */}
              {/* <View style={styles.GridImg}>
                  
               {this.gridImg()}
                </View> */}
              {/* <Image source={{uri:'http://mlm.propertyindholera.com/public/images/sliders/731666288037.jpg'}}  style={{height:100,width:100}}/> */}

              <SwiperFlatList
                autoplay
                autoplayDelay={4}
                autoplayLoop
                index={0}
                showPagination
                paginationStyleItem={{width: 6, height: 6, marginTop: 9}}
                paginationDefaultColor={Color.black}
                paginationActiveColor={Color.primary}
                data={productImg}
                renderItem={_renderItem}
              />
            </View>

            <View style={styles.box2}>
              <TouchableOpacity style={styles.favoriteContainer}>
                <Icon name="heart" size={27} color={Color.primary} />
              </TouchableOpacity>

              <Text style={styles.discount}>
                {Math.round(productItem?.discount)}% OFF
              </Text>
            </View>

            <View style={styles.contentContainer}>
              <Text style={styles.subtitle}>{productItem.variant_name}</Text>

              {/* <Text style={{
                    color:productItem.stock==0?'#e74c3c':'#2ecc71'

                   }}>
                   inStock: {productItem.stock}
                     </Text> */}

              <View style={styles.option}>
                <View style={styles.optionText}>
                  <Text style={{fontFamily: Fonts.primaryRegular}}>
                    {/* {productItem.currency} */}₹
                  </Text>
                  <Text style={styles.mrp}>{productItem.mrp}</Text>
                </View>
                <View style={styles.optionText}>
                  <Text style={styles.selling}>
                    {productItem.selling_price}
                  </Text>
                </View>
              </View>

              {productItem.descriptions !== null ? (
                <View
                  style={{backgroundColor: '#000', width: width, height: 95}}>
                  <WebView
                    originWhitelist={['*']}
                    source={{html: productItem.descriptions}}
                  />
                </View>
              ) : null}
              {console.log('productItem', productItem)}
              <Text
                style={{
                  ...styles.catTitle,
                  color: Color.black,
                  // alignSelf: 'center',
                  paddingBottom:10
                }}>
                {'Select Size'}
              </Text>
              <ScrollView horizontal={true}>
                {attribute.map(item => {
                  return (
                    <TouchableOpacity
                      onPress={() => fetchNewProducts(item)}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginBottom: 12,
                        paddingHorizontal: 20,
                        borderWidth: 0.5,
                        borderColor:
                          item.active_attribute == 1
                            ? Color.primary
                            : Color.black,
                        marginHorizontal: 10,
                        padding: 5,
                        borderRadius: 5,
                      }}>
                      <Text
                        style={{
                          ...styles.catTitle,
                          color:
                            item.active_attribute == 1
                              ? Color.primary
                              : Color.black,
                        }}>
                        {item.attribute_value}
                      </Text>
                      {/* <Text style={styles.catTitle}>{Coupan.length}</Text> */}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              {Coupan !== null ? (
                <View
                  style={{
                    width: 360,
                    height: 180,
                    marginRight: 1,
                    marginTop: 19,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginBottom: 12,
                      paddingHorizontal: 20,
                    }}>
                    <Text style={styles.catTitle}>
                      Available Offers ({Coupan.length})
                    </Text>
                    {/* <Text style={styles.catTitle}>{Coupan.length}</Text> */}
                  </View>

                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    // key={'flatlist2'}
                    data={Coupan}
                    renderItem={({item, index}) => renderCoupan(item, index)}
                    keyExtractor={item => item.id}
                    // extraData={this.state}
                  />
                </View>
              ) : null}

              {count > 0 ? (
                <View style={styles.quantity}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.plusBtn}
                    onPress={() => {
                      setCount(count - 1);
                      setToCart(
                        productItem,
                        productItem.id,
                        count - 1,
                        productItem.selling_price,
                      );
                    }}>
                    <Icon name="minus" size={20} color={Color.red} />
                  </TouchableOpacity>
                  <Text style={styles.counter}>{count}</Text>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.plusBtn}
                    onPress={() => {
                      setCount(count + 1);

                      setToCart(
                        productItem,
                        productItem.id,
                        count + 1,
                        productItem.selling_price,
                      );
                    }}>
                    <Icon name="plus" size={18} color={Color.colorPrimary} />
                  </TouchableOpacity>
                </View>
              ) : (
                // <View style={{
                //   display:'flex',
                //   flexDirection:'row',
                //   width:"100%",
                //   paddingLeft:22,
                //   paddingRight:22,
                //   justifyContent:'space-between'
                // }}>
                <View style={styles.addToCart}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      // setCount(count+1)

                      // setToCart(
                      //   productItem,
                      //   productItem.id,
                      //   count + 1,
                      //   productItem.selling_price,
                      // );
                      addToCart();
                      //  && navigation.navigate('MyCart');
                    }}>
                    <Text style={styles.addToCartText}>
                      {' '}
                      <MaterialCommunityIcons
                        name="shopping"
                        size={20}
                        color="#ffffff"
                      />{' '}
                      Add To Cart
                    </Text>
                  </TouchableOpacity>
                </View>

                // </View>
              )}

              {/* <View>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() =>
                    navigation.navigate('Buy', {
                      screen: 'BuyNowScreen',
                      Id: route?.params?.params?.item?.variant_id,
                      productId: route?.params?.params?.item?.id,
                      
                    })
                  }>
                  <View style={styles.buy}>
                    <Text style={styles.addToCartText}>
                      <MaterialCommunityIcons
                        name="flash"
                        size={20}
                        color="#ffffff"
                      />
                      Buy Now
                    </Text>
                  </View>
                </TouchableOpacity>
              </View> */}

              {similarity !== null ? (
                <View
                  style={{
                    paddingTop: 45,
                    width: 360,
                    height: 380,
                    marginRight: 1,
                    //       marginTop:19
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginBottom: 12,
                    }}>
                    <Text style={styles.catTitle}>Similar Products</Text>
                  </View>

                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    // key={'flatlist2'}
                    data={similarity}
                    renderItem={({item, index}) =>
                      renderProductItem(item, index)
                    }
                    keyExtractor={item => item.id}
                    // extraData={this.state}
                  />
                </View>
              ) : null}

              <View>
                <Text>{attribute.size}</Text>
              </View>
              <Text style={styles.title}>{productItem.name}</Text>
              <Text style={styles.description}>{productItem.description}</Text>
            </View>
          </>
        ) : null}

        {/* <View style={{marginLeft: 10}}>
            <View style={styles.categoryHeaderContainer}>
              <Text style={styles.catTitle}>New Products</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Category');
                }}>
                <Text style={styles.subtitle}>View All</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            style={{marginLeft: 10, marginBottom: 20}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            key={'flatlist'}
            data={this.state.newProduct}
            renderItem={({item, index}) => this.renderProductItem(item, index)}
            keyExtractor={(item) => item.id}
            // extraData={this.state}
          />
          <View style={{marginLeft: 10}}>
            <View style={styles.categoryHeaderContainer}>
              <Text style={styles.catTitle}>New Products</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Category');
                }}>
                <Text style={styles.subtitle}>View All</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            style={{marginLeft: 10}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            key={'flatlist2'}
            data={this.state.newProduct}
            renderItem={({item, index}) => this.renderProductItem(item, index)}
            keyExtractor={(item) => item.id}
            // extraData={this.state}
          /> */}

        <View style={styles.box}>{/* <UseraddScreen/> */}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    flexDirection: 'column',
  },
  scrollView: {
    // flex: 1,
    backgroundColor: Color.backgroundColor,
    flexDirection: 'column',
  },
  title: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 16,
  },
  imageContainer: {
    marginTop: 1,
    // display: 'flex',
    flex: 1,
    height: 250,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: Color.white,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
  },
  box: {
    // height:500,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 5,
    backgroundColor: Color.white,
    paddingLeft: 15,
    paddingRight: 12,
    paddingTop: 12,
  },

  box2: {
    position: 'absolute',
    top: 10,
    // right: 10,
    flex: 1,
    height: 20,
    width: 360,
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: Color.white,
    paddingHorizontal: 50,
    alignSelf: 'center',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: Color.white,
  },
  favoriteContainer: {
    // backgroundColor:'#b2bec3',
  },
  categoryHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  catTitle: {
    fontFamily: Fonts.primarySemiBold,
    color: Color.black,
    fontSize: 14,
    marginLeft: 0,
  },
  subtitle: {
    fontFamily: Fonts.primarySemiBold,
    color: Color.gray,
    fontSize: 12,
    marginLeft: 8,
    padding: 10,
    paddingRight: 16,
    paddingTop: 18,
  },
  title: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 16,
    color: Color.gray,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    marginTop: 20,
  },
  description: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 14,
    color: Color.gray,
    textAlign: 'center',
    marginTop: 20,
  },
  counter: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 16,
    color: Color.black,
    textAlign: 'center',
    width: 30,
  },
  option: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 10,
    color: Color.black,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // textAlign: 'center',
    marginVertical: 6,
    width: 150,
    // padding:8,
    // paddingLeft:14,
    // paddingRight:14,
    top: -12,
    // backgroundColor:'black',
    // marginLeft:95
  },
  optionText: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginLeft: 0,
    fontFamily: Fonts.primaryRegular,
  },
  avlstock: {
    paddingLeft: 15,
    fontFamily: Fonts.primaryRegular,
    // backgroundColor: Color.primary,
    padding: 8,
    borderRadius: 5,
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
    fontSize: 20,
    color: Color.primary,
    paddingHorizontal: 6,
  },

  discount: {
    color: Color.white,
    fontFamily: Fonts.primaryRegular,
    backgroundColor: Color.primary,
    padding: 5,
    fontSize: 13,
    width: 45,
    paddingLeft: 8,
  },

  addToCartText: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 2,
    paddingRight: 15,
    color: Color.white,
    fontSize: 15,
  },
  plusBtn: {
    padding: 10,
  },
  buy: {
    backgroundColor: '#00cec9',
    color: Color.white,
    textAlign: 'center',
    borderRadius: 20,
    width: 150,
    marginTop: 10,
    padding: 4,
    justifyContent: 'center',
    fontWeight: 'bold',
    paddingLeft: 16,
    paddingRight: 10,

    // marginLeft:12,
    alignContent: 'center',
  },
  addToCart: {
    flexWrap: 'nowrap',
    backgroundColor: Color.primary,
    color: Color.white,
    textAlign: 'center',
    borderRadius: 20,
    // width: 160,
    marginTop: 10,
    padding: 4,
    justifyContent: 'center',
    fontWeight: 'bold',
    paddingLeft: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
      marginLeft: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
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
    height: 45,
    width: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginTop: 20,
  },
  GridImg: {
    flexDirection: 'row',
    height: 82,
    width: 400,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 5,
  },
  moreStyles: {
    width: 55,
    height: 52,
    borderWidth: 1,
    borderColor: '#1be6db',
  },
});
