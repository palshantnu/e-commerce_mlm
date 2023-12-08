import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  FlatList,
  ToastAndroid,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

import React, {useEffect, useState, useRef} from 'react';
import Stepperdown from '../components/Stepperdown';
import Entypo from 'react-native-vector-icons/Entypo';
import {Fonts} from '../theme';
import {getUserDetails} from '../utils/LocalStorage';
import {
  getNewProducts,
  // ProductImage,
  getBuyProduct,
} from '../axios/ServerRequest';
import {
  getProductItem,
  getCart,
  setCart,
  setProductItem,
} from '../utils/LocalStorage';
import Color from '../theme';
import {useNavigation} from '@react-navigation/native';
import ModalDialog from '../components/ModalDialog';
import {getData, postData, ProductImage} from '../API';
import AddressSheet from '../components/bottomsheets/AddressSheet';
import {useSelector} from 'react-redux';
import {errorToast, successToast} from '../components/toasts';
import { RadioButton } from 'react-native-paper';
const {height, width} = Dimensions.get('window');
const BuyNowScreen = ({route, navigation}) => {
  const user = useSelector(state => state.user);
  const data = route.params
  console.log('Route1=',route?.params?.params?.item);
  // const {Id} = route?.params;
  // const {productId} = route?.params;
  const [address, setAddress] = useState([]);
  const [productItem, setProductItem] = React.useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userAddress, setUserAddress] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [userCart, setUserCart] = React.useState([]);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [totalPrice, setTotalPrice] = React.useState();
  const [totalAmount, setTotalAmount] = React.useState();
  const [checked, setChecked] = React.useState('first');
  const _addressSheetRef = useRef(null);
  const productImg = `http://mlm.propertyindholera.com/public/product/images/${productItem?.product_img}`;

  useEffect(() => {
    init();
  }, [userCart]);

  const init = async () => {
    const totalPrice = userCart.reduce(
      (accumulator, current) =>
        accumulator + current.selling_price * current.quantity,
      0,
    );
    setTotalPrice(totalPrice);
    const totalAmnt = userCart.reduce(
      (accumulator, current) => accumulator + current.mrp * current.quantity,
      0,
    );
    setTotalAmount(totalAmnt);
  };

  const toggleModal = () => {
    // alert(
    //   "sdfnskdfn"
    // )
    setModalVisible(!isModalVisible);
  };

  const close = () => {
    setModalVisible(isModalVisible);
  };

  const getUserCart = async () => {
    setLoading(true);
    const res = await getData(`cartData/${user?.user_id}`);
    if (res.status) {
      setUserCart(res?.data);
      console.log('Data-->', res?.data);
    }
    // else{
    // errorToast('Something went wrong');
    // }
    setLoading(false);
  };

  const payment = () => {
    if (userAddress == null || userAddress.message == "data not found"  ) {
      errorToast('Please Add Address!', ToastAndroid.SHORT);
    }
    else {
    var options = {
      description: 'Shakumbari Big Bazzar',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_bzy5Ac2hqcHvyJ',
      amount: totalPrice * 100,
      name: 'Acme Corp',
      // order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Gaurav Kumar',
      },
      theme: {color: '#53a20e'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
        buyOnline();
      })
      .catch(error => {
        // handle failure
        // alert(`Error: ${error.code} | ${error.description}`);
      });
    }
  };

  // const fetchProductDetails = async () => {
  //   const details = await getData(`singleproduct/${Id}`);
  //   if (details?.status) {
  //     setProductItem(details?.data);
  //   }
  // };

  // useEffect(() => {
  //   fetchProductDetails();
  // }, [Id]);

  React.useEffect(
    React.useCallback(() => {
      const handleBackButton = () => {
        navigation.goBack();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', handleBackButton);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }, []),
  );

  const fetchUserAddress = async () => {
    const result = await getData(`fetchaddress/${user?.user_id}`);
    if (result?.status) {
      setUserAddress(result);

      console.log('userAddress=', userAddress);
      console.log('user=', user);
      // console.log('data[0].variant_id',data.data[0]?.variant_id);

    }
  };

  useEffect(() => {
    fetchUserAddress();
    getUserCart();
    // console.log('buyproduct');
    // console.log('data[0].variant_id',data[0]?.variant_id);
    // console.log('user_id',user_id);
    // console.log('data[0].product_id',data[0]?.product_id);
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      fetchUserAddress();
      getUserCart();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const buyProduct = async () => {   
    let body = {
      user_id: user?.user_id,
      variant_id: data.data[0]?.variant_id,
      product_id: data.data[0]?.product_id,
    };
    console.log('body',body);
    const res = await postData('buy-now', body);

    if (res?.status) {
      successToast(res?.message);
      navigation.navigate('Home1');
    }
  };


  const _renderItem = ({item, index}) => {
    return (
      <>
        <View style={styles.productdetails}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.heading}>Product Details</Text>
          </View>

          <View style={styles.contentsection}>
            <View>
              <Image
                source={{
                  uri: `${ProductImage + item.image}`,
                }}
                style={{width: 140, height: 100}}
                resizeMode='contain'
              />
            </View>

            <View style={styles.textsection}>
              <View>
                <Text style={styles.productname} numberOfLines={1}>
                  {item?.variant_name}
                </Text>
              </View>

              <View>
                <Text style={styles.description} numberOfLines={3}>
                  {item?.variant_name}{' '}
                </Text>
              </View>

              <View style={styles.pricesection}>
                <Text style={styles.discount}>₹{item?.mrp}</Text>
                <Text style={styles.price}> {item?.selling_price}</Text>
                <Text style={styles.disc}>{item?.commission_cent}% off</Text>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };


  const buyCashOnDelivery = async() =>{
    if (userAddress == null || userAddress.message == "data not found"  ) {
      errorToast('Please Add Address!', ToastAndroid.SHORT);
    }
    else {
   let body={
    user_id:user?.user_id,
    shipping_address:userAddress,
    billing_address:userAddress
   };
   const res = await postData('checkoutcart',body);
   console.log('body=',body);
   if(res?.status){
   console.log('res?.message=',res?.massege);
    successToast(res?.massege);
    navigation.navigate('Home1');
   }
  }
  }

  const buyWithWallet = async() =>{
    if (userAddress == null || userAddress.message == "data not found"  ) {
      errorToast('Please Add Address!', ToastAndroid.SHORT);
    }
    else {
   let body={
    user_id:user?.user_id,
    shipping_address:userAddress,
    billing_address:userAddress
   };
   const res = await postData('checkoutcartwallet',body);
   console.log('body=',body);
   console.log('res?.message=',res?.massege);
   if(res?.massege == "you wallet amount low")
   {
  errorToast('Insufficient Funds!', ToastAndroid.SHORT);
    // navigation.navigate('Home1');
   }
   else if(res?.massege == "order successfull")
   {
    successToast(res?.massege);
    navigation.navigate('Home1');  
   }
   else
   {
    errorToast('Something Went Wrong!', ToastAndroid.SHORT);
   }
  }
  }



 const buyOnline = async() =>{
  // if (userAddress == null ) {
  //   errorToast('Please Add Address!', ToastAndroid.SHORT);
  // }
  // else {
   let body={
    user_id:user?.user_id,
    shipping_address:userAddress,
    billing_address:userAddress
   };
   const res = await postData('checkoutcartonline',body);
   console.log('body=',body);
   if(res?.status){
   console.log('res?.message=',res?.massege);
    successToast(res?.massege);
    navigation.navigate('Home1');
   }

  // }
 }

  return (
    <View style={{flex: 1}}>
      <AddressSheet
        ref={_addressSheetRef}
        // value={lang_}
        // handleChange={lang => handleLangChange(lang)}
        onClose={() => _addressSheetRef.current.close()}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:30}}>
        <View style={{paddingTop: 5}}>
          {/* <View
            style={{backgroundColor: '#fff', paddingTop: 5, paddingBottom: 8}}>
            <Stepperdown />
          </View> */}

          <View style={styles.Address}>
            <View style={styles.topline}>
              <Text style={styles.heading}>Delivery Address</Text>

              <TouchableOpacity onPress={() => _addressSheetRef.current.open()}>
                <Text style={styles.change}>
                  <Entypo name="edit" size={12} color="#000" />
                  {address.length == 0 ? 'Add Address' : 'Change'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.user}>
              <Text style={{fontWeight: 'bold', marginLeft: 12}}>
                {userAddress?.user_name}
              </Text>

              <View
                style={{
                  paddingTop: 16,
                }}>
                <Text style={styles.summary}>
                  {userAddress?.user_area}, {userAddress?.user_state}{' '}
                  {userAddress?.user_pincode}
                </Text>
                <Text style={styles.summary}>{userAddress?.user_phone}</Text>
              </View>
            </View>
          </View>
          <View style={{}}>
            <FlatList
              key={'flatlist'}
              data={userCart}
              nestedScrollEnabled={true}
              keyExtractor={item => item.id}
              // renderItem={({item, index}) => renderCartItem(item, index)}
              renderItem={_renderItem}
              // extraData={this.state}
              // contentInset={{bottom: 150}}
              contentContainerStyle={{paddingBottom: 5}}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={styles.pricedetails}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.heading}>Price Details</Text>
            </View>

            <View style={styles.pricing}>
              <View style={styles.pricelist}>
                <Text>Price ({userCart.length} items)</Text>
                <Text>&#x20b9;{totalAmount}</Text>
              </View>

              <View style={styles.pricelist}>
                <Text>Discount</Text>
                <Text>
                  - &#x20b9;
                  {parseInt(totalAmount) - totalPrice}
                </Text>
              </View>

              <View style={styles.pricelist}>
                <Text>Shipping Charge</Text>
                <Text>
                  {shippingCharge == 0 ? 'Free Delivery' : shippingCharge}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#dfe6e9',
                height: 1,
                width: 500,
                marginTop: 12,
                justifyItems: 'center',
                marginRight: 45,
              }}></View>

            <View style={styles.pricelist}>
              <Text style={{fontWeight: 'bold'}}>Total Amount</Text>
              <Text style={{fontWeight: 'bold'}}>
                &#x20b9;{parseInt(totalPrice + shippingCharge)}
              </Text>
            </View>
          </View>

          <View
            style={{
              height: 400,
            }}>
            <ModalDialog
              open={isModalVisible}
              close={close}
              // onTouchOutside={onClosePopup}
            />
          </View>
        </View>
        <View style={styles.payment_method_box}>
        <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.heading}>Select Payment Method</Text>
            </View>
            <View>
              <View style={{flexDirection:'row',}}>
      <RadioButton
        value="first"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('first')}
      />
      <Text style={{...styles.heading,paddingTop:5}}>Online</Text>
      </View>
      <View style={{flexDirection:'row',}}>
      <RadioButton
        value="second"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('second')}
      />
      <Text style={{...styles.heading,paddingTop:5}}>Cash on Delivery</Text>
      </View>

      {
       user.mlmstatus == "TRUE" &&
        <View style={{flexDirection:'row',}}>
      <RadioButton
        value="third"
        status={ checked === 'third' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('third')}
      />
      <Text style={{...styles.heading,paddingTop:5}}>Wallet</Text>
      </View>}
    </View>

    
        </View>
        {/* <View style={{marginTop: -300}}></View> */}
      </ScrollView>

      <View style={styles.box2}>
        <View style={{width: '50%'}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('check', {
                screen: 'CheckOutScreen',
              })
            }>
            <Text style={styles.total_price}>
              {/* Total:&#x20b9; {productItem?.purchase_price} */}
              Total: {totalPrice}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{width: '50%'}}>
          <TouchableOpacity
            style={styles.checkout_container}
            onPress={() => {
             checked == 'first' ?
             payment() 
             : 
             checked == 'second' ? 
              buyCashOnDelivery()
             : buyWithWallet();
            }}>
            <Text style={styles.checkout}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  user: {
    paddingTop: 6,
    paddingLeft: 4,
  },

  summary: {
    color: '#000',
    fontSize: 13,
    paddingLeft: 10,
    top: -5,
  },
  Address: {
    backgroundColor: '#fff',
    width: width,
    height: 150,
    paddingRight: 14,
    paddingTop: 12,
  },
  product: {
    backgroundColor: '#fff',
    width: width,
    height: 150,
    paddingRight: 14,
    paddingTop: 12,
  },

  productdetails: {
    backgroundColor: '#fff',
    width: width,
    height: 170,
    paddingRight: 14,
    paddingTop: 12,
    marginTop: 5,
    paddingRight: 12,
    paddingLeft: 12,
  },
  pricedetails: {
    backgroundColor: '#fff',
    width: width,
    // height: 170,
    // height:height/4,
    paddingRight: 14,
    paddingTop: 12,
    // marginTop: 5,
    paddingRight: 12,
    paddingLeft: 12,
  },
  topline: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontFamily: Fonts.primarySemiBold,
    color: '#000',
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 12,
  },
  change: {
    borderWidth: 1,
    borderColor: '#1be6db',
    padding: 3,
    borderRadius: 5,
  },
  contentsection: {
    display: 'flex',
    flexDirection: 'row',
  },
  textsection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    // alignItems:'center'
  },
  productname: {
    fontFamily: Fonts.Questrial,
    color: '#000',
    fontSize: 14,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  description: {
    color: '#95a5a6',
    fontSize: 12,
    width: 180,
    paddingLeft: 12,
  },
  pricesection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    marginTop: 12,
    width: 150,
  },
  price: {
    fontFamily: Fonts.primarySemiBold,
    color: '#2c3e50',
    fontSize: 18,
    // marginLeft: 10,
    fontWeight: 'bold',
    marginRight: 12,
  },
  discount: {
    color: '#e74c3c',
    textDecorationLine: 'line-through',
  },
  disc: {
    backgroundColor: '#f1f2f6',
    borderRadius: 10,
    padding: 5,
  },
  pricelist: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  pricing: {
    width: width - 18,
    paddingRight: 16,
    paddingLeft: 10,
  },
  box2: {
    width: width,
    height: 50,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#1be6db',
    display: 'flex',
    // flex: 1,
  },
  total_price: {
    height: 50,
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    backgroundColor: '#1be6db',
    color: '#000',
  },
  checkout_container: {
    textAlign: 'center',
    height: 50,
    backgroundColor: '#000',
    // color:"#fff",
  },
  checkout: {
    width: '100%',
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  payment_method_box:{
    backgroundColor: '#fff',
    width: width,
    height: 200,
    paddingRight: 14,
    paddingTop: 12,
    marginTop: -395,
    paddingRight: 12,
    paddingLeft: 12,

  }
});

export default BuyNowScreen;
