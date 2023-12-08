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
import {getData, getData1, postData} from '../API';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {errorToast, successToast} from '../components/toasts';
import CartPlaceholder from '../placeholders/CartPlaceholder';
import { getTotalCartCount } from '../utils/Cart';
import {getItemCount} from '../utils/Cart';
import RazorpayCheckout from 'react-native-razorpay';
import { DataTable } from 'react-native-paper';


const Memberlist = ({navigation}) => {
 
  const isLoggedIn = useSelector(state => state?.isLoggedIn)
  const [loading, setLoading] = React.useState(false);
  const [cartCount, setCartCount] = React.useState(0);
  const [cartList, setCartList] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState();
  const [userCart, setUserCart] = React.useState([]);
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

  const ListHeader = () => {
    //View to set in Header
    return (
      <View horizontal style={styles.container1}>
      <View style={styles.row}>
            <Text style={[styles.cell,{ fontSize: 16,paddingHorizontal:10}]}>MEMBERID</Text>
            <Text style={[styles.cell,{ fontSize: 16,paddingHorizontal:10}]}>NAME</Text>
            <Text style={[styles.cell,{ fontSize: 16,paddingHorizontal:10}]}>EMAIL</Text>
            <Text style={[styles.cell,{ fontSize: 16,paddingHorizontal:10,color:'#1be6db'}]}>ACTIVE/UNACTIVE</Text>
            <Text style={[styles.cell,{ fontSize: 16,paddingHorizontal:10,color:'#1be6db'}]}>PHONE</Text>
            <Text style={[styles.cell,{ fontSize: 16,}]}>ADDRESS</Text>
      </View>
      </View>
    );
  };

 

  const renderCartItem = (item) => {
    let count = getItemCount(cartList, item);
    return (
    //   <CartItem
    //     item={item}
    //     addToCart={addToCart}
    //     count={count}
    //     removeFromCart={() => removeFromCart(item)}
    //     getUserCart={() => getUserCart()}
    //   //  removeQuantity={() => removeQtyFromCart(item)}
    //   />
    <ScrollView>
      <View style={styles.row}>
            <Text style={[styles.cell,{color:'#444'}]}>{item.mlmpairuniqueid} {item.position == 0 ? 'LEFT':'RIGHT'}</Text>
            <Text style={[styles.cell,{}]}>{item.name}</Text>
            <Text style={[styles.cell,{}]}>{item.email}</Text>
            <Text style={[styles.cell,{color:'#1be6db'}]}>{item.activate == 1 ? 'ACTIVE':'UNACTIVE'}</Text>
            <Text style={[styles.cell,{color:'#1be6db'}]}>{item.phone}</Text>
            <Text style={[styles.cell,{}]}>{item.address}</Text>

         </View>
      {/* <ScrollView horizontal>
     <View style={styles.mainContainer}>
     <View style={styles.table}>
         <View style={styles.row}>
            <Text style={styles.cell}>Header 1</Text>
            <Text style={styles.cell}>Header 2</Text>
            <Text style={styles.cell}>Header 3</Text>
            <Text style={styles.cell}>Header 4</Text>

         </View>
         <View style={styles.row}>
            <Text style={styles.cell}>Row 1, Cell 1</Text>
            <Text style={styles.cell}>Row 1, Cell 2</Text>
            <Text style={styles.cell}>Row 1, Cell 3</Text>
            <Text style={styles.cell}>Row 1, Cell 3</Text>

         </View>
         <View style={styles.row}>
            <Text style={styles.cell}>Row 2, Cell 1</Text>
            <Text style={styles.cell}>Row 2, Cell 2</Text>
            <Text style={styles.cell}>Row 2, Cell 3</Text>
            <Text style={styles.cell}>Row 2, Cell 3</Text>
         </View>
      </View>
      </View>
     </ScrollView> */}
    {/* <View style={styles.mainContainer}> */}
    {/* <ScrollView style={styles.container1}> */}
      {/* <View style={{ display: 'flex',flexDirection:'row',alignItems:'center'}}>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>MEMBERID</Text>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>NAME</Text>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>EMAIL</Text>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>ACTIVE/UNACTIVE</Text>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>PHONE</Text>
            <Text style={[styles.title,{ fontSize: 16,}]}>ADDRESS</Text>
      </View> */}
      {/* <View style={{ display: 'flex',flexDirection:'row',alignItems:'center'}}>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>{item.name}</Text>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>{item.name}</Text>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>{item.email}</Text>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>{'active'}</Text>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>{item.phone}</Text>
            <Text style={[styles.title,{ fontSize: 16,}]}>{item.address}</Text>
      </View> */}
      

      {/* <View style={{ display: 'flex',flexDirection:'row',alignItems:'center'}}>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>MEMBERID</Text>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>NAME</Text>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>EMAIL</Text>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>ACTIVE/UNACTIVE</Text>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>PHONE</Text>
            <Text style={[styles.title,{ fontSize: 16,}]}>ADDRESS</Text>
      </View>
      <View style={{ display: 'flex',flexDirection:'row',alignItems:'center'}}>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>MEMBERID</Text>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>NAME</Text>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>EMAIL</Text>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>ACTIVE/UNACTIVE</Text>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>PHONE</Text>
            <Text style={[styles.title,{ fontSize: 16,}]}>ADDRESS</Text>
      </View>
      <View style={{ display: 'flex',flexDirection:'row',alignItems:'center'}}>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>MEMBERID</Text>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>NAME</Text>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>EMAIL</Text>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>ACTIVE/UNACTIVE</Text>
            <Text style={[styles.title,{ fontSize: 16,paddingHorizontal:10}]}>PHONE</Text>
            <Text style={[styles.title,{ fontSize: 16,}]}>ADDRESS</Text>
      </View> */}
      {/* <View style={{ display: 'flex',flexDirection:'row'}}>
            <Text style={[styles.title,{ fontSize: 16,}]}>Wallet Amount</Text>
            <Text style={[styles.title,{ fontSize: 26,}]}>0</Text>
      </View> */}
      {/* </ScrollView> */}
      {/* <View style={styles.container1}>
      <View style={{flex: 1, display: 'flex', flexDirection: 'column',alignItems:'center'}}>
            <Text style={[styles.title,{ fontSize: 16,}]}>Total Spend Money</Text>
            <Text style={[styles.title,{ fontSize: 26,}]}>0</Text>
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
            <Text style={[styles.title,{ fontSize: 26,}]}>0</Text>
      </View>
      </View> */}
        {/* <ScrollView horizontal> */}
     {/* <DataTable>
      <DataTable.Header>
      <DataTable.Title numeric>MEMBERID</DataTable.Title>
        <DataTable.Title>NAME</DataTable.Title>
        <DataTable.Title>EMAIL</DataTable.Title>
        <DataTable.Title>ACTIVE/UNACTIVE</DataTable.Title>
        <DataTable.Title>PHONE</DataTable.Title>
        <DataTable.Title numeric>ADDRESS</DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.key}>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
          <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable> */}
    {/* </ScrollView> */}
     {/* </View> */}
     </ScrollView>
    );
  }

  const getUserCart = async () => {
    setLoading(true);
    const res = await getData1(`mlmlist/${user?.user_id}`);
    if (res.status) {
      setUserCart(res?.data);
      console.log('Dataghfthth-->', res?.data);
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
        <View style={{flexDirection: 'row', padding: 20}}>
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={25}
              color={Color.black}
            />
          </TouchableOpacity> */}
          <Text style={styles.title}>My MemberList</Text>
        </View>



        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.mainContainer}>
    <View horizontal style={styles.container1}>
      <View style={styles.row}>
            <Text style={[styles.cell,{width:150, fontSize: 16,paddingHorizontal:10}]}>MEMBERID</Text>
            <Text style={[styles.cell,{width:150, fontSize: 16,paddingHorizontal:10}]}>NAME</Text>
            <Text style={[styles.cell,{width:150, fontSize: 16,paddingHorizontal:10}]}>EMAIL</Text>
            <Text style={[styles.cell,{width:150, fontSize: 16,paddingHorizontal:10,color:'#1be6db'}]}>ACTIVE/UNACTIVE</Text>
            <Text style={[styles.cell,{width:150, fontSize: 16,paddingHorizontal:10,color:'#1be6db'}]}>PHONE</Text>
            <Text style={[styles.cell,{width:250, fontSize: 16,}]}>ADDRESS</Text>
      </View>
      </View>

     </View>
     
     </ScrollView> */}


     {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
     <View style={styles.mainContainer}>
     <View style={styles.table}>
         <View style={styles.row}>
            <Text style={styles.cell}>Header 1</Text>
            <Text style={styles.cell}>Header 2</Text>
            <Text style={styles.cell}>Header 3</Text>
            <Text style={styles.cell}>Header 3</Text>

         </View>
         <View style={styles.row}>
            <Text style={styles.cell}>Row 1, Cell 1</Text>
            <Text style={styles.cell}>Row 1, Cell 2</Text>
            <Text style={styles.cell}>Row 1, Cell 3</Text>
            <Text style={styles.cell}>Row 1, Cell 3</Text>

         </View>
      </View>
      </View>
     </ScrollView> */}

        {loading ? (
          <>
            <CartPlaceholder />
          </>
        ) : (
          <>
          {userCart.length > 0 ?
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop:-10}}>
            {/* <View style={styles.row}>
            <Text style={[styles.cell,{ fontSize: 16,paddingHorizontal:10}]}>MEMBERID</Text>
            <Text style={[styles.cell,{ fontSize: 16,paddingHorizontal:10}]}>NAME</Text>
            <Text style={[styles.cell,{ fontSize: 16,paddingHorizontal:10}]}>EMAIL</Text>
            <Text style={[styles.cell,{ fontSize: 16,paddingHorizontal:10}]}>ACTIVE/UNACTIVE</Text>
            <Text style={[styles.cell,{ fontSize: 16,paddingHorizontal:10}]}>PHONE</Text>
            <Text style={[styles.cell,{ fontSize: 16,}]}>ADDRESS</Text>
           </View> */}
           {/* <View style={styles.box1}> */}
            <FlatList
             // key={'flatlist'}
            //  horizontal
              data={userCart}
              nestedScrollEnabled={true}
              ListHeaderComponent={ListHeader}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => 
              renderCartItem(item, index)}
              //extraData={this.state}
              //  contentInset={{bottom: 150}}
            //  contentContainerStyle={{paddingBottom: 150}}
              //  showsVerticalScrollIndicator={false}
            />
            {/* {
              userCart?.map(item => {
                return(
                  <ScrollView>
                <View style={styles.row}>
                <Text style={[styles.cell,{color:'#444'}]}>{item.mlmpairuniqueid}</Text>
                <Text style={styles.cell}>{item.name}</Text>
                <Text style={styles.cell}>{item.email}</Text>
                <Text style={styles.cell}>{item.activate == 1 ? 'ACTIVE':'UNACTIVE'}</Text>
                <Text style={styles.cell}>{item.phone}</Text>
                <Text style={styles.cell}>{item.address}</Text>
    
             </View>
             </ScrollView>
                )
                })
            } */}
           {/* </View> */}
           </ScrollView>
          :
           <View
          style={{
            // flex: 1,
            // flexDirection: 'column',
            // alignItems: 'center',
            // position:'absolute',
            // bottom:170,
            // right:0,
            // left:0
            marginTop:50,
            paddingHorizontal:50,
            alignItems:'center'
          }}>
          {/* <View style={styles.imgContainerStyle}>
            <Image style={styles.imageStyle} source={EmptyCart} />
          </View> */}
          <Text style={styles.title}>Members Not Found!</Text>
          {/* <Button
            color={Color.primary}
            title="Shop Now"
            onPress={() => {
              navigation.navigate('Category');
            }}
          /> */}
        </View>
          }
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
        width: '100%',
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
        // display: 'flex',
        flexDirection: 'row',
      },
  container: {
    flex: 1,
    // flexDirection: 'column',
  },
  table: {
    // borderWidth: 1,
    // borderColor: "black",
    // marginBottom: 10,
    marginTop: 30,
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
 },
 row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
 },
 cell: {
    flex: 1,
    padding: 10,
    color: Color.textColor,
    fontFamily: Fonts.primarySemiBold,
    // fontSize: 20,
    // marginBottom: 20,
    // borderWidth: 1,
    width: 200,
    // height: 200,
    textAlign: "center",
    fontSize: 16,
    color: "black",
    borderColor: "black",
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

export default Memberlist;
