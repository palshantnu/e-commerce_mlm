import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {getCart, getToken, setCart} from '../utils/LocalStorage';
import Cart from '../utils/Cart';
import {getData, postData} from '../API';
import {Color, Fonts} from '../theme';
import ProductItem from '../components/ProductItem';
import ProductRow from '../components/ProductItem/ProductRow';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
import ProductPlaceholder from '../placeholders/ProductPlaceholder';
import {errorToast} from '../components/toasts';
import ProductRowNew from '../components/ProductRowNew';

const ProductScreen = ({navigation, route}) => {
  console.log('param-->', route?.params?.subCategory?.section_slug);

  // console.log ('Slug==',route?.params?.params?.item?.section_slug);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [slug, setSlug] = React.useState(
    route?.params?.subCategory?.section_slug || '',
  );
  //console.log ('Slug==',slug);

  // const init = async () => {
  //   fetchSubCategoryProducts();
  //   let cart = await getCart();

  //   // this.setState({
  //   //   cartList: await getCart(),
  //   //   cartCount: Cart.getTotalCartCount(cart),
  //   // });
  //   setCartList(await getCart())
  //   setCartCount(Cart.getTotalCartCount(cart))
  // };

  // const fetchSubCategoryProducts = async() => {
  // setLoading(true)

  // const resp = await fetch('http://mlm.propertyindholera.com/api/viewallnewArrival');
  // const data = await resp.json();
  //  console.log("output-->", data);
  //  console.log("output2-->", data?.data);

  //   setNewProduct(data?.data)

  // setLoading(false)
  // }

  const getSubcategoryProducts = async () => {
    setLoading(true);
    setProducts([]);
    const res = await getData(
      `Allproduct/${route?.params?.subCategory?.section_slug}`,
    );
    console.log('pro Res-->', res);
    if (res?.status === true) {
      setProducts(res?.data);
    } else {
      setProducts([]);
      errorToast('Something went wrong');
    }
    setLoading(false);
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
  // const resetData = () => {

  //   setNewProduct(newProduct)
  // };

  const navigateToScreen = item => {
    navigation.navigate('Product', {
      screen: 'ProductView',
      params: {item: item},
    });
  };

  const renderProductItem = item => {
    // let cart = Cart.getItemCount(cartList, item);
    return (
      <ProductRow
        item={item}
        // addToCart={addToCart}
        // count={cart}
        onPress={() => {
          navigateToScreen(item);
        }}
      />
    );
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      // init();
      getSubcategoryProducts();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    setTimeout(() => {
      getSubcategoryProducts();
    }, 1000);
  }, [route?.params?.subCategory?.section_slug]);

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 30}}
        showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', padding: 20}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={25}
              color={Color.black}
            />
          </TouchableOpacity>
          <Text style={styles.title}>
            {route?.params?.subCategory?.section_slug}
          </Text>
        </View>
        {loading ? (
          <>
            <ProductPlaceholder />
            <ProductPlaceholder />
          </>
        ) : (
          <>
            {products && products.length > 0 ? (
              <View
                style={{alignSelf: 'center', justifyContent: 'space-between'}}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  //key={'flatlist1'}
                  data={products}
                  numColumns={2}
                  renderItem={({item, index}) => renderProductItem(item, index)}
                  keyExtractor={item => item.id}
                  // extraData={this.state}
                />
              </View>
            ) : (
              <View
                style={{
                  //flex: 1,
                  alignItems: 'center',

                  marginTop: Dimensions.get('window').height / 2 - 100,
                }}>
                <Text
                  style={{
                    color: Color.grey,
                    fontSize: 16,
                    fontFamily: Fonts.primarySemiBold,
                  }}>
                  No Data Found
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default ProductScreen;

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
});
