import { StyleSheet, Text, View,FlatList,TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react'
import { getCart,getToken,setCart } from '../utils/LocalStorage';
import Cart from '../utils/Cart';
import { getData, postData } from '../API';
import { Color, Fonts } from '../theme';
import ProductItem from '../components/ProductItem';
import ProductRow from '../components/ProductItem/ProductRow';
import ProductRowNew from '../components/ProductItem/ProductRowNew';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView } from 'react-native-gesture-handler';
import ProductPlaceholder from '../placeholders/ProductPlaceholder';
import { useSelector } from 'react-redux';
import { errorToast } from '../components/toasts';
import { getItemCount } from '../utils/Cart';

const MyWishlistScreen = ({navigation}) => {
    const user = useSelector(state => state.user);
const [categoryData,setcategoryData] = React.useState([]);
const [popularProduct,setPopularProduct] = React.useState([]);
const [newProduct,setNewProduct] = React.useState([]);
const [selected,setSelected] = React.useState(false);
const [cartCount,setCartCount] = React.useState(0);
const [cartList,setCartList] = React.useState([]);
const [loading,setLoading] = React.useState(false);
const [wishList,setWishList] = React.useState([]);
const isLoggedIn = useSelector(state => state?.isLoggedIn);
const getWishlist = async() =>{
  setLoading(true);
const res = await getData(`wishlistData/${user?.user_id}`)
if(res.status === true)
{
setWishList(res?.data);
console.log('wishlistData=',res?.data);
}
// else{
//   errorToast('Something went wrong');
// }
setLoading(false);
}

const init = async () => {

  let cart = await getCart();

  // this.setState({
  //   cartList: await getCart(),
  //   cartCount: Cart.getTotalCartCount(cart),
  // });
  setCartList(await getCart())
  setCartCount(Cart.getTotalCartCount(cart))
};


// const addToCart = async params => {
//   let cart = await getCart();
//   let cartListData = cart !== null ? cart : [];
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
//   let totalCount = Cart.getTotalCartCount(cartListData);
 
//   setCartCount(totalCount);
//   setCartList(cartListData)
//   setSelected(!selected)
//   setCart(cartListData);
//   //this.resetData();
// };

const addToCart = async () => {
  if (!isLoggedIn)
  return ToastAndroid.show('Please Login', ToastAndroid.SHORT);
  let body = {
    product_id: route?.params?.params?.item?.id,
    variant_id: route?.params?.params?.item?.variant_id,
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
const resetData = () => {
  
  setNewProduct(newProduct)
};

const navigateToScreen = item => {
  navigation.navigate('Product', {
    screen: 'ProductView',
    params: {item: item},
  });
};

const renderProductItem =(item)=> {
  let cart = getItemCount(cartList, item);
  return (
    <ProductRowNew
      item={item}
      addToCart={addToCart}
      fetchWishList={() => getWishlist()}
      count={cart}
      user={user}
      onPress={() => {
        navigateToScreen(item);
      }}
    />
  );
}

React.useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    // The screen is focused
    // Call any action
    init();
    getWishlist();
  });

  // Return the function to unsubscribe from the event so it gets removed on unmount
  return unsubscribe;
}, [navigation]);

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={{paddingBottom:30}} showsVerticalScrollIndicator={false}>
      <View style={{flexDirection: 'row', padding: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={25}
            color={Color.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}> My Wishlist</Text>
      </View>
      {loading ? 
      <>
      <ProductPlaceholder />
      <ProductPlaceholder />
      </>
   : <View style={{alignSelf:'center',justifyContent:'space-between'}}>
      <FlatList
        showsVerticalScrollIndicator={false}
       
        
        //key={'flatlist1'}
        data={wishList}
        numColumns={2}
        renderItem={({item, index}) => renderProductItem(item, index)}
        keyExtractor={item => item.id}
       // extraData={this.state}
      />
    </View>
}
  
    </ScrollView>
  </View>
  )
}

export default MyWishlistScreen

const styles = StyleSheet.create({
  title: {
    color: Color.black,
    fontSize: 17,
    fontFamily: Fonts.primaryBold,
  },
  mainContainer: {
   // flex: 1,
   // backgroundColor: Color.white,
   // flexDirection: 'column',
  },

})