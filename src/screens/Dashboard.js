import React, {Component, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Button,
} from 'react-native';

import {Color, Fonts, Strings, Dimension} from '../theme';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {getUserDetails, getCart, setCart} from '../utils/LocalStorage';

import Cart from '../utils/Cart';
import CartItem from '../components/CartItem';
import EmptyCart from '../assets/images/emptycart.png';
import {useDispatch, useSelector} from 'react-redux';
import {getData, postData} from '../API';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {errorToast, successToast} from '../components/toasts';
import CartPlaceholder from '../placeholders/CartPlaceholder';
import { getTotalCartCount } from '../utils/Cart';
import {getItemCount} from '../utils/Cart';
import RazorpayCheckout from 'react-native-razorpay';
import CustomButton from '../components/CustomButton';


const Dashboard = ({navigation}) => {
 
  const isLoggedIn = useSelector(state => state?.isLoggedIn)
  const [loading, setLoading] = React.useState(false);
  const [cartCount, setCartCount] = React.useState(0);
  const [cartList, setCartList] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState();
  const [userCart, setUserCart] = React.useState();
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.addListener('focus', () => {
      init();
      getUserCart();
    });
  }, []);

 useEffect(() => {
  init();
 }, [userCart])
 


  const init = async () => {
    // // let cart = await getCart();
    // // let userDetails = await getUserDetails();
    // let totalPrice = cart.reduce(
    //   (accum, item) => accum + parseFloat(item.subTotal),
    //   0,
    // );
    // setCartCount(getTotalCartCount(cart));
    // setCartList(cart);
    // setTotalPrice(totalPrice);

    const totalPrice = userCart.reduce((accumulator,current) => accumulator + current.selling_price * current.quantity, 0)
    setTotalPrice(totalPrice);
  };

  // const addToCart = async params => {
  //   // let cart = await getCart();
  //   let cartListData = Object.keys(cart).length ? cart : [];
  //   let itemIndex = Cart.isProductExist(cartListData, params);
  //   if (itemIndex === -1) {
  //     cartListData.push(params);
  //   } else {
  //     if (params.count > 0) {
  //       cartListData[itemIndex] = params;
  //     } else {
  //       let filterData = cartListData.filter(item => item.id !== params.id);
  //       cartListData = filterData;
  //     }
  //   }
  //   console.log(cartListData);
  //   let totalCount = getTotalCartCount(cartListData);
  //   let totalPrice = cartListData.reduce(
  //     (accum, item) => accum + parseInt(item.subTotal),
  //     0,
  //   );

  //   setCartCount(totalCount);
  //   setCartList(cartListData);
  //   setTotalPrice(totalPrice);

  //   dispatch({
  //     type: 'ADD_TO_CART',
  //     payload: cartListData,
  //   });
  //   // setCart(cartListData);
  //   //this.resetData();
  // };

  const addToCart = async () => {
    if (!isLoggedIn)
    return ToastAndroid.show('Please Login', ToastAndroid.SHORT);
    let body = {
      product_id: item?.product_id,
      variant_id: item?.variant_id,
      user_id: user?.user_id,
    };
    console.log('body=',body);
    const res = await postData('addtocart', body);
    console.log('RESULT=',res)
   if(res?.status){
    successToast(res?.message)
   }
   else{
    errorToast(res?.message)
   }
  };
 

  // const renderCartItem = (item) => {
  //   let count = getItemCount(cartList, item);
  //   return (
  //   //   <CartItem
  //   //     item={item}
  //   //     addToCart={addToCart}
  //   //     count={count}
  //   //     removeFromCart={() => removeFromCart(item)}
  //   //     getUserCart={() => getUserCart()}
  //   //   //  removeQuantity={() => removeQtyFromCart(item)}
  //   //   />
  //   <View style={styles.mainContainer}>
  //     <View style={styles.container1}>
  //     <View style={{flex: 1, display: 'flex', flexDirection: 'column',alignItems:'center'}}>
  //           <Text style={[styles.title,{ fontSize: 16,}]}>Wallet Amount</Text>
  //           <Text style={[styles.title,{ fontSize: 26,}]}>0</Text>
  //     </View>
  //     </View>
  //     <View style={styles.container1}>
  //     <View style={{flex: 1, display: 'flex', flexDirection: 'column',alignItems:'center'}}>
  //           <Text style={[styles.title,{ fontSize: 16,}]}>Total Spend Money</Text>
  //           <Text style={[styles.title,{ fontSize: 26,}]}>0</Text>
  //     </View>
  //     </View>
  //     <View style={styles.container1}>
  //     <View style={{flex: 1, display: 'flex', flexDirection: 'column',alignItems:'center'}}>
  //           <Text style={[styles.title,{ fontSize: 16,}]}>Total Rewards</Text>
  //           <Text style={[styles.title,{ fontSize: 26,}]}>0</Text>
  //     </View>
  //     </View>
  //     <View style={styles.container1}>
  //     <View style={{flex: 1, display: 'flex', flexDirection: 'column',alignItems:'center'}}>
  //           <Text style={[styles.title,{ fontSize: 16,}]}>Total Wishlist</Text>
  //           <Text style={[styles.title,{ fontSize: 26,}]}>0</Text>
  //     </View>
  //     </View>
  //     <View style={styles.container1}>
  //     <View style={{flex: 1, display: 'flex', flexDirection: 'column',alignItems:'center'}}>
  //           <Text style={[styles.title,{ fontSize: 16,}]}>Total Order</Text>
  //           <Text style={[styles.title,{ fontSize: 26,}]}>0</Text>
  //     </View>
  //     </View>
  //     <View style={styles.container1}>
  //     <View style={{flex: 1, display: 'flex', flexDirection: 'column',alignItems:'center'}}>
  //           <Text style={[styles.title,{ fontSize: 16,}]}>Total Pair</Text>
  //           <Text style={[styles.title,{ fontSize: 26,}]}>5</Text>
  //     </View>
  //     </View>
  //     <View style={styles.container1}>
  //     <TouchableOpacity style={{flex: 1, display: 'flex', flexDirection: 'column',alignItems:'center'}}
  //     onPress={()=>{navigation.navigate('Memberlist')}}>
  //           <Text style={[styles.title,{ fontSize: 16,}]}>Total Member</Text>
  //           <Text style={[styles.title,{ fontSize: 26,}]}>11</Text>
  //     </TouchableOpacity>
  //     </View>
  //     <View style={[styles.container1,{backgroundColor:'#1be6db'}]}>
  //     <TouchableOpacity style={{flex: 1, display: 'flex', flexDirection: 'column',alignItems:'center'}}
  //     onPress={()=>{navigation.navigate('Addmember')}}>
  //           <Text style={[styles.title,{ fontSize: 16,color:'#fff'}]}>Add Member</Text>
  //           <Text style={[styles.title,{ fontSize: 26,color:'#fff'}]}>+</Text>
  //     </TouchableOpacity>
  //     </View>
  //    </View>
  //   );
  // }

  const getUserCart = async () => {
    setLoading(true);
    const res = await getData(`mlmlist/${user?.user_id}`);
    if (res.status) {
      setUserCart(res);
      console.log('Data-->', res.star);
    }
    // else{
    // errorToast('Something went wrong');
    // }
    setLoading(false);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      getUserCart();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

 

  const removeFromCart = async item => {
    let body = {
      product_id: item?.product_id,
      variant_id: item?.variant_id,
      user_id: user?.user_id,
    };
    const res = await postData('removefromcart', body);
    console.log('delete res-->', res);
    if (res?.cartdata?.status) {
      successToast('item remove from cart successfully')
       getUserCart();
    }
  };


  const payment = () => {
    var options = {
      description: 'Shakumbari Big Bazzar',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_bzy5Ac2hqcHvyJ',
      amount:  (parseInt(productItem?.purchase_price) + parseInt(shippingCharge)) * 100,
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
        buyProduct();
      })
      .catch(error => {
        // handle failure
        // alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', padding: 20,justifyContent:'space-between',alignItems:'center',marginBottom:30}}>
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={25}
              color={Color.black}
            />
          </TouchableOpacity> */}
          <Text style={[styles.title,{marginBottom:0}]}> My Dashboard</Text>
          {/* <CustomButton loading={loading} label={'Login'} onPress={()=>{alert('hello')}} /> */}
          <TouchableOpacity style={{backgroundColor:Color.primary,padding:7,borderRadius:5}}
          onPress={()=>{navigation.navigate('WithdrawalWallet',{walletamount : userCart?.wallet})}}>
           <Text style={{fontFamily: Fonts.primarySemiBold,fontSize:14,color:'#111'}}>Withdrawal Walllet</Text>
          </TouchableOpacity>

        </View>
        
          {
            userCart?.star >=10 && userCart?.star < 60 ?
          <View style={{flexDirection: 'row', padding: 20,marginTop:-60,alignItems:'center',marginBottom:20,width:'100%'}}>
          <Text style={{fontFamily: Fonts.primarySemiBold,fontSize:16,color:'#999'}}>Hello </Text>
          <Text style={{fontFamily: Fonts.primarySemiBold,fontSize:16,color:'#111'}}> {user.user_name}</Text>
            <View>
            <Image
                  source={{
                    uri: `http://mlm.propertyindholera.com/public/images/start.png`,
                  }}
                   resizeMode='contain'
                  style={{width:30, height: 30,marginTop:-7}}
                />
            </View>
        </View>

            :
            userCart?.star >=60 && userCart?.star < 120 ?
            <>
            <View style={{flexDirection: 'row', padding: 20,marginTop:-60,alignItems:'center',marginBottom:20,width:'100%'}}>
          <Text style={{fontFamily: Fonts.primarySemiBold,fontSize:16,color:'#999'}}>Hello </Text>
          <Text style={{fontFamily: Fonts.primarySemiBold,fontSize:16,color:'#111'}}> {user.user_name}</Text>
            <View>
            <Image
                  source={{
                    uri: `http://mlm.propertyindholera.com/public/images/start.png`,
                  }}
                   resizeMode='contain'
                  style={{width:30, height: 30,marginTop:-7}}
                />
            </View>
            <View>
            <Image
                  source={{
                    uri: `http://mlm.propertyindholera.com/public/images/start.png`,
                  }}
                   resizeMode='contain'
                  style={{width:30, height: 30,marginTop:-7}}
                />
            </View>
            </View>
            </>
            :
            userCart?.star >=120 && userCart?.star < 150 ?
            <>
            <View style={{flexDirection: 'row', padding: 20,marginTop:-60,alignItems:'center',marginBottom:20,width:'100%'}}>
          <Text style={{fontFamily: Fonts.primarySemiBold,fontSize:16,color:'#999'}}>Hello </Text>
          <Text style={{fontFamily: Fonts.primarySemiBold,fontSize:16,color:'#111'}}> {user.user_name}</Text>
            <View>
            <Image
                  source={{
                    uri: `http://mlm.propertyindholera.com/public/images/start.png`,
                  }}
                   resizeMode='contain'
                  style={{width:30, height: 30,marginTop:-7}}
                />
            </View>
            <View>
            <Image
                  source={{
                    uri: `http://mlm.propertyindholera.com/public/images/start.png`,
                  }}
                   resizeMode='contain'
                  style={{width:30, height: 30,marginTop:-7}}
                />
            </View>
            <View>
            <Image
                  source={{
                    uri: `http://mlm.propertyindholera.com/public/images/start.png`,
                  }}
                   resizeMode='contain'
                  style={{width:30, height: 30,marginTop:-7}}
                />
            </View>
            </View>
            </>
            :
            userCart?.star >=150 && userCart?.star < 300 ?
            <>
            <View style={{flexDirection: 'row', padding: 20,marginTop:-60,alignItems:'center',marginBottom:20}}>
          <Text style={{fontFamily: Fonts.primarySemiBold,fontSize:16,color:'#999'}}>Hello </Text>
          <Text style={{fontFamily: Fonts.primarySemiBold,fontSize:16,color:'#111'}}> {user.user_name}</Text>
            <View>
            <Image
                  source={{
                    uri: `http://mlm.propertyindholera.com/public/images/start.png`,
                  }}
                   resizeMode='contain'
                  style={{width:30, height: 30,marginTop:-7}}
                />
            </View>
            <View>
            <Image
                  source={{
                    uri: `http://mlm.propertyindholera.com/public/images/start.png`,
                  }}
                   resizeMode='contain'
                  style={{width:30, height: 30,marginTop:-7}}
                />
            </View>
            <View>
            <Image
                  source={{
                    uri: `http://mlm.propertyindholera.com/public/images/start.png`,
                  }}
                   resizeMode='contain'
                  style={{width:30, height: 30,marginTop:-7}}
                />
            </View>
            </View>
            <View style={{marginTop:-70}}>
          <Text style={{fontFamily: Fonts.primarySemiBold,fontSize:12,color:'#111',padding:20,paddingBottom:30,marginVertical:5}}>(Super Partner)</Text>
          </View>
            </>
            :
            userCart?.star >=300 && userCart?.star < 500 ?
            <>
            <View style={{flexDirection: 'row', padding: 20,marginTop:-60,alignItems:'center',marginBottom:20}}>
          <Text style={{fontFamily: Fonts.primarySemiBold,fontSize:16,color:'#999'}}>Hello </Text>
          <Text style={{fontFamily: Fonts.primarySemiBold,fontSize:16,color:'#111'}}> {user.user_name}</Text>
            <View>
            <Image
                  source={{
                    uri: `http://mlm.propertyindholera.com/public/images/start.png`,
                  }}
                   resizeMode='contain'
                  style={{width:30, height: 30,marginTop:-7}}
                />
            </View>
            <View>
            <Image
                  source={{
                    uri: `http://mlm.propertyindholera.com/public/images/start.png`,
                  }}
                   resizeMode='contain'
                  style={{width:30, height: 30,marginTop:-7}}
                />
            </View>
            <View>
            <Image
                  source={{
                    uri: `http://mlm.propertyindholera.com/public/images/start.png`,
                  }}
                   resizeMode='contain'
                  style={{width:30, height: 30,marginTop:-7}}
                />
            </View>
            </View>
            <View style={{marginTop:-70}}>
          <Text style={{fontFamily: Fonts.primarySemiBold,fontSize:12,color:'#111',padding:20,paddingBottom:30,marginVertical:5}}>(Super Partner) + (incentive partners)</Text>
          </View>
            </>
            :
            userCart?.star >=500  ?
            <>
            <View style={{flexDirection: 'row', padding: 20,marginTop:-60,alignItems:'center',marginBottom:20}}>
          <Text style={{fontFamily: Fonts.primarySemiBold,fontSize:16,color:'#999'}}>Hello </Text>
          <Text style={{fontFamily: Fonts.primarySemiBold,fontSize:16,color:'#111'}}> {user.user_name}</Text>
            <View>
            <Image
                  source={{
                    uri: `http://mlm.propertyindholera.com/public/images/start.png`,
                  }}
                   resizeMode='contain'
                  style={{width:30, height: 30,marginTop:-7}}
                />
            </View>
            <View>
            <Image
                  source={{
                    uri: `http://mlm.propertyindholera.com/public/images/start.png`,
                  }}
                   resizeMode='contain'
                  style={{width:30, height: 30,marginTop:-7}}
                />
            </View>
            <View>
            <Image
                  source={{
                    uri: `http://mlm.propertyindholera.com/public/images/start.png`,
                  }}
                   resizeMode='contain'
                  style={{width:30, height: 30,marginTop:-7}}
                />
            </View>
            </View>
            <View style={{marginTop:-70}}>
          <Text style={{fontFamily: Fonts.primarySemiBold,fontSize:12,color:'#111',padding:20,paddingBottom:30,marginVertical:5}}>(Diamond Partner)</Text>
          </View>
            </>
            :
            <View style={{flexDirection: 'row', padding: 20,marginTop:-60,alignItems:'center',marginBottom:20,width:'100%'}}>
          <Text style={{fontFamily: Fonts.primarySemiBold,fontSize:16,color:'#999'}}>Hello </Text>
          <Text style={{fontFamily: Fonts.primarySemiBold,fontSize:16,color:'#111'}}> {user.user_name}</Text>
            <View>
            {/* <Image
                  source={{
                    uri: `http://mlm.propertyindholera.com/public/images/start.png`,
                  }}
                   resizeMode='contain'
                  style={{width:30, height: 30,marginTop:-7}}
                /> */}
            </View>
        </View>
          }
         <View style={{flexDirection: 'row', padding: 20,marginTop:-60,alignItems:'center',marginBottom:10,width:'100%'}}>
          <Text style={{fontFamily: Fonts.primarySemiBold,fontSize:16,color:'#111'}}> {user.mlmuserid}</Text>
            <View>
            </View>
        </View>

        {loading ? (
          <>
            <CartPlaceholder />
          </>
        ) : (
          <>

          <View style={styles.box1}>
            <View style={styles.mainContainer}>
      <View style={styles.container1}>
      <View style={{flex: 1, display: 'flex', flexDirection: 'column',alignItems:'center'}}>
            <Text style={[styles.title,{ fontSize: 16,}]}>Wallet Amount</Text>
            <Text style={[styles.title,{ fontSize: 26,}]}>{userCart?.wallet}</Text>
      </View>
      </View>
      <View style={styles.container1}>
      <View style={{flex: 1, display: 'flex', flexDirection: 'column',alignItems:'center'}}>
            <Text style={[styles.title,{ fontSize: 16,}]}>Total Spend Money</Text>
            <Text style={[styles.title,{ fontSize: 26,}]}>{userCart?.spendmoney}</Text>
      </View>
      </View>
      <View style={styles.container1}>
      <View style={{flex: 1, display: 'flex', flexDirection: 'column',alignItems:'center'}}>
            <Text style={[styles.title,{ fontSize: 16,}]}>Total Rewards</Text>
            <Text style={[styles.title,{ fontSize: 26,}]}>0</Text>
      </View>
      </View>
      <View style={styles.container1}>
      <View style={{flex: 1, display: 'flex', flexDirection: 'column',alignItems:'center'}}>
            <Text style={[styles.title,{ fontSize: 16,}]}>Total Wishlist</Text>
            <Text style={[styles.title,{ fontSize: 26,}]}>{userCart?.wishlist}</Text>
      </View>
      </View>
      <View style={styles.container1}>
      <View style={{flex: 1, display: 'flex', flexDirection: 'column',alignItems:'center'}}>
            <Text style={[styles.title,{ fontSize: 16,}]}>Total Order</Text>
            <Text style={[styles.title,{ fontSize: 26,}]}>{userCart?.order}</Text>
      </View>
      </View>
      <View style={styles.container1}>
      <View style={{flex: 1, display: 'flex', flexDirection: 'column',alignItems:'center'}}>
            <Text style={[styles.title,{ fontSize: 16,}]}>Total Pair</Text>
            <Text style={[styles.title,{ fontSize: 26,}]}>{userCart?.pair}</Text>
      </View>
      </View>
      <View style={styles.container1}>
      <TouchableOpacity style={{flex: 1, display: 'flex', flexDirection: 'column',alignItems:'center'}}
      onPress={()=>{navigation.navigate('Memberlist')}}>
            <Text style={[styles.title,{ fontSize: 16,}]}>Total Member</Text>
            <Text style={[styles.title,{ fontSize: 26,}]}>{userCart?.totalmember}</Text>
      </TouchableOpacity>
      </View>
      <View style={[styles.container1,{backgroundColor:'#1be6db'}]}>
      <TouchableOpacity style={{flex: 1, display: 'flex', flexDirection: 'column',alignItems:'center'}}
      onPress={()=>{navigation.navigate('Addmember')}}>
            <Text style={[styles.title,{ fontSize: 16,color:'#fff'}]}>Add Member</Text>
            <Text style={[styles.title,{ fontSize: 26,color:'#fff'}]}>+</Text>
      </TouchableOpacity>
      </View>
     </View>
            {/* <FlatList
             // key={'flatlist'}
              data={userCart}
              nestedScrollEnabled={true}
              renderItem={({item, index}) => renderCartItem(item, index)}
              keyExtractor={item => item.id}
              //extraData={this.state}
              //  contentInset={{bottom: 150}}
            //  contentContainerStyle={{paddingBottom: 150}}
              //  showsVerticalScrollIndicator={false}
            /> */}
          </View>
          </>
        )}
      </ScrollView>
      {
        // (userCart.length > 0 && loading == false) && (
        //   <View style={styles.box2}>
        //     <View style={{width: '50%'}}>
        //       <Text style={styles.total_price}>Total: {totalPrice}</Text>
        //     </View>
        //     <View style={{width: '50%'}}>
        //     <TouchableOpacity
        //           activeOpacity={1}
        //           onPress={() =>
        //             navigation.navigate('Buy',{data:userCart})
        //           }>
        //         <Text style={styles.checkout}>Buy</Text>
        //       </TouchableOpacity>
        //     </View>
        //   </View>
        // )

        // <View
        //   style={{
        //     flex: 1,
        //     flexDirection: 'column',
        //     alignItems: 'center',
        //     position:'absolute',
        //     bottom:170,
        //     right:0,
        //     left:0
        //   }}>
        //   <View style={styles.imgContainerStyle}>
        //     <Image style={styles.imageStyle} source={EmptyCart} />
        //   </View>
        //   <Text style={styles.title}>Empty Cart</Text>
        //   <Button
        //     color={Color.primary}
        //     title="Shop Now"
        //     onPress={() => {
        //       navigation.navigate('Category');
        //     }}
        //   />
        // </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
        paddingLeft: 15,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingRight: 15,
        paddingBottom: 10,
        paddingTop: 10,
        flexWrap:'wrap'
      },
      container1: {
        width: '48%',
        marginVertical:5,
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
  container: {
    flex: 1,
    // flexDirection: 'column',
  },
  box1: {
    // display: 'flex',
    // flexDirection: 'column',
    marginTop:-40
  },
  box2: {
    width: Dimension.window.width,
    height: 50,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    backgroundColor: Color.colorPrimary,
    fontFamily:Fonts.primarySemiBold
    // display: 'flex',
    // flex: 1,
  },
  total_price: {
    height: 50,
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    backgroundColor: Color.white,
    color: Color.colorPrimary,
  },
  checkout_container: {
    textAlign: 'center',
    height: 50,
    backgroundColor: Color.colorPrimary,
    color: Color.white,
  },
  checkout: {
    width: '100%',
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: Color.white,
    fontFamily:Fonts.primarySemiBold
  },
  imgContainerStyle: {
    height: 250,
    width: 250,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    resizeMode: 'center',
  },
  title: {
    color: Color.textColor,
    fontFamily: Fonts.primarySemiBold,
    fontSize: 20,
    marginBottom: 20,
  },
  btnStyle: {
    padding: 10,
    backgroundColor: Color.colorPrimaryDark,
    borderRadius: 20,
    margin: 20,
    fontSize: 16,
  },
});

export default Dashboard;
