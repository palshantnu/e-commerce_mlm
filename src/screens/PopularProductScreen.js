import { StyleSheet, Text, View,FlatList,TouchableOpacity } from 'react-native'
import React from 'react'
import { getCart,getToken,setCart } from '../utils/LocalStorage';
import Cart from '../utils/Cart';
import { getData, postData } from '../API';
import { Color, Fonts } from '../theme';
import ProductItem from '../components/ProductItem';
import ProductRow from '../components/ProductItem/ProductRow';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView } from 'react-native-gesture-handler';
import ProductPlaceholder from '../placeholders/ProductPlaceholder';
import { useSelector } from 'react-redux';
import { getItemCount } from '../utils/Cart';

const PopularProductScreen = ({navigation}) => {
  const user = useSelector((state) => state?.user) || {};
const [categoryData,setcategoryData] = React.useState([]);
const [popularProduct,setPopularProduct] = React.useState([]);
const [newProduct,setNewProduct] = React.useState([]);
const [selected,setSelected] = React.useState(false);
const [cartCount,setCartCount] = React.useState(0);
const [cartList,setCartList] = React.useState([]);
const [loading,setLoading] = React.useState(false)

const init = async () => {
  fetchPopularProducts();
  let cart = await getCart();

  // this.setState({
  //   cartList: await getCart(),
  //   cartCount: Cart.getTotalCartCount(cart),
  // });
  setCartList(await getCart())
  setCartCount(Cart.getTotalCartCount(cart))
};

const fetchPopularProducts = async() => {
setLoading(true)




const resp = await fetch(`http://mlm.propertyindholera.com/api/viewallbestProduct/${user.user_id}`);
const data = await resp.json();
 console.log("outputttt-->", data);
 console.log("output2-->", data?.data);

  setNewProduct(data)

setLoading(false)
}
const addToCart = async params => {
  let cart = await getCart();
  let cartListData = cart !== null ? cart : [];
  let itemIndex = Cart.isProductExist(cartListData, params);
  if (itemIndex === -1) {
    cartListData.push(params);
  } else {
    if (params.count > 0) {
      cartListData[itemIndex] = params;
    } else {
      let filterData = cartListData.filter(item => item.id !== params.id);
      cartListData = filterData;
    }
  }
  console.log(cartListData);
  let totalCount = Cart.getTotalCartCount(cartListData);
 
  setCartCount(totalCount);
  setCartList(cartListData)
  setSelected(!selected)
  setCart(cartListData);
  //this.resetData();
};


const resetData = () => {
  
  setPopularProduct(popularProduct)
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
    <ProductRow
      item={item}
      addToCart={addToCart}
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
        <Text style={styles.title}> Popular Products</Text>
      </View>
      {loading ? 
      <>
      <ProductPlaceholder />
      <ProductPlaceholder />
      </>
    :<View style={{alignSelf:'center',justifyContent:'space-between'}}>
      <FlatList
        showsVerticalScrollIndicator={false}
       
        
        //key={'flatlist1'}
        data={newProduct}
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

export default PopularProductScreen

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