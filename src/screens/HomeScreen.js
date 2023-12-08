import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Color, Fonts} from '../theme';
import {IconButton} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MyBannerSlider from '../components/MyBannerSlider';
import {useSelector, useDispatch} from 'react-redux';
import {CategoryImage} from '../API';
import Cart from '../utils/Cart';
import ProductItem from '../components/ProductItem';
import {Dimension} from '../theme';
import {BannerImage} from '../API';
import {Searchbar} from 'react-native-paper';
import {getItemCount} from '../utils/Cart';
import {getTotalCartCount} from '../utils/Cart';

const HomeScreen = ({navigation}) => {
  const user = useSelector(state => state?.user) || {};
  const home = useSelector(state => state?.home?.new_arrivals?.data);
  const topBanner = useSelector(state => state?.home?.topbanners) || [];
  const productCategory =
    useSelector(state => state?.home?.productcategory) || [];
  const newProduct =
    useSelector(state => state?.home?.new_arrivals?.data) || [];
  const userWishlist = useSelector(state => state?.home?.wishdata) || [];
  const todayDealProduct =
    useSelector(state => state?.home?.todaydeal_product) || [];
  const bestProduct = useSelector(state => state?.home?.best_product) || [];

  const cart = useSelector(state => state?.cart) || [];

  console.log('New-->', newProduct);

  /////bottom Banner/////
  const BottomBanner = useSelector(state => state?.home?.bottombanners) || [];

  const loading = React.useRef(true);
  const [selected, setSelected] = React.useState(false);
  const [cartCount, setCartCount] = React.useState(0);
  const [cartList, setCartList] = React.useState([]);
  console.log('productCategory-->', productCategory);
  const centerBanner = useSelector(state => state?.home?.centerbanners) || [];
  const bottomBanner = useSelector(state => state?.home?.bottombanners) || [];
  const featureProduct =
    useSelector(state => state?.home?.feature_product) || [];
  const [showSearchBar, setShowSearchBar] = React.useState(false);
  console.log('bottomBanner--->', bottomBanner);
  // const [bottomBanner,setBottomBanner]=React.useState(((state) => state?.home?.bottombanners) || [])
  const [cBanner, setCBanner] = React.useState([]);
  const dispatch = useDispatch();

  // const BannerImage='http://mlm.propertyindholera.com/public/images/sliders/'
  const fetchImage = props => {
    let cb = Object.values(centerBanner);

    const Igext = cBanner;
    cb.map(item => {
      return Igext.push(item);
    });

    setCBanner(Igext);
  };

  const _renderItem = ({item}) => (
    <TouchableOpacity
      style={{alignItems: 'center', width: 80}}
      onPress={() => {
        navigation.navigate('SubCategory', {
          params: {item: item},
        });
      }}>
      <Image
        source={{
          uri: `${CategoryImage + item.cat_img}`,
        }}
        style={{
          height: 40,

          width: 40,
          borderRadius: 20,
          borderColor: Color.primary,
          borderWidth: 2,
        }}
      />
      <Text style={styles.category_style}>{item.cat_name}</Text>
    </TouchableOpacity>
  );

  const init = async () => {
    // let cart = await getCart();
    // console.log(cart);
    // let userDetails = await getUserDetails();
    // setUser(userDetails);
    setCartList(cart);
    setCartCount(getTotalCartCount(cart));
  };

  const addToCart = async params => {
    // let cart = await getCart();
    let cartListData = Object.keys(cart).length ? cart : [];
    console.log('cartListData===', cartListData);
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
    let totalCount = Cart.getTotalCartCount(cartListData);
    setCartList(cartListData);
    setCartCount(totalCount);
    setSelected(!selected);
    dispatch({
      type: 'ADD_TO_CART',
      payload: cartListData,
    });
    // setCart(cartListData); //adding to async storage
  };

  const navigateToScreen = item => {
    console.log('senddata=',item)
    navigation.navigate('Product', {
      screen: 'ProductView',
      params: {item: item},
    });
  };

  const renderProductItem = item => {
    console.log('item---->', item);
    let cart = getItemCount(cartList, item);
    return (
      <ProductItem
        item={item}
        addToCart={addToCart}
        count={cart}
        wishlistData={userWishlist}
        user={user}
        onPress={() => navigateToScreen(item)}
      />
    );
  };

  React.useEffect(() => {
    fetchImage();
    // fetchBottom();
    // console.log("homedat>>>>>>",topBanner)
    // let reRenderSomething = navigation.addListener('focus', () => init());
    init();
  }, []);

  return (
    <SafeAreaView style={styles.main_container}>
      {showSearchBar && (
        <Searchbar
          placeholder={'Search Products'}
          editable={false}
          style={{
            fontFamily: 'Poppins-Bold',
            borderColor: '#557297',
            borderWidth: 2,
          }}
          placeholderTextColor={Color.black}
        />
      )}
      {/* <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={Color.primary}
        style="light"
      /> */}
      {/* <View style={styles.header_container}>
        <View>
          <IconButton
            icon="menu"
            onPress={() => navigation.openDrawer()}
            size={30}
            iconColor={Color.white}
            style={styles.menuIcon}
          />
          </View>
          <View style={styles.header_icon_container}>
          <EvilIcons
          name='search'
          size={30}
          color={Color.white}
          />
           <EvilIcons
          name='heart'
          size={35}
          color={Color.white}
          />
          <TouchableOpacity onPress={()=>navigation.navigate('MyCart')}>
          <EvilIcons
          name='cart'
          size={35}
          color={Color.white}
          />
          </TouchableOpacity>
          </View>
      </View> */}
      <MyBannerSlider img={topBanner} />

      <ScrollView
        contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.category_list_container}>
          <Text style={styles.category_heading1}>All Categories</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Category');
            }}>
            <Text style={styles.category_heading2}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.category_container}>
          <FlatList
            data={productCategory}
          showsHorizontalScrollIndicator={false}
            horizontal={true}
            nestedScrollEnabled={true}
            renderItem={_renderItem}
          />
        </View>

        <View style={styles.category_list_container}>
          <Text style={styles.category_heading1}>New Arrival</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('NewProduct');
            }}>
            <Text style={styles.category_heading2}>View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
          horizontal={true}
          key={'flatlist'}
          data={newProduct}
          renderItem={({item, index}) => renderProductItem(item, index)}
          keyExtractor={item => item.id}
          // extraData={this.state}
        />

        <View style={styles.category_list_container}>
          <Text style={styles.category_heading1}>Today Deal Product</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TodayProduct');
            }}>
            <Text style={styles.category_heading2}>View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
          horizontal={true}
          key={'flatlist'}
          data={todayDealProduct}
          renderItem={({item, index}) => renderProductItem(item, index)}
          keyExtractor={item => item.id}
          // extraData={this.state}
        />

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View
            style={{
              width: 730,
              display: 'flex',
              flexDirection: 'row',
              paddingTop: 15,
              marginLeft: 13,
            }}>
            <Image
              source={{
                uri: `${BannerImage + cBanner[0]}`,
              }}
              style={{
                width: Dimension.window.width - 40,
                height: (Dimension.window.width - 70) * 0.5,

                resizeMode: 'cover',
                borderRadius: 10,
              }}
            />
            <Image
              source={{
                uri: `${BannerImage + cBanner[1]}`,
              }}
              style={{
                width: Dimension.window.width - 70,
                height: (Dimension.window.width - 70) * 0.5,
                resizeMode: 'cover',
                marginLeft: 20,
                borderRadius: 10,
                marginLeft: 33,
              }}
            />
            <Image
              source={{
                uri: `${BannerImage + cBanner[2]}`,
              }}
              style={{
                width: Dimension.window.width - 70,
                height: (Dimension.window.width - 70) * 0.5,
                resizeMode: 'cover',
                marginLeft: 20,
                borderRadius: 10,
                marginLeft: 33,
              }}
            />
          </View>
        </ScrollView>

        <View style={styles.category_list_container}>
          <Text style={styles.category_heading1}>Featured Products</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('FeatureProduct');
            }}>
            <Text style={styles.category_heading2}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
          horizontal={true}
          key={'flatlist1'}
          data={featureProduct}
          renderItem={({item, index}) => renderProductItem(item, index)}
          keyExtractor={item => item.id}
          // extraData={this.state}
        />

        <View style={styles.category_list_container}>
          <Text style={styles.category_heading1}>Best Product</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PopularProduct');
            }}>
            <Text style={styles.category_heading2}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
          horizontal={true}
          key={'flatlist1'}
          data={bestProduct}
          renderItem={({item, index}) => renderProductItem(item, index)}
          keyExtractor={item => item.id}
          // extraData={this.state}
        />

        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

  {bottomBanner && bottomBanner.map((item) =>{
  
return(
  <View
  style={{
    width: 730,
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 15,
    marginLeft: 13,
  }}>
  <Image
    source={{
      uri:`${BannerImage + item}`
    }}
    style={{
      width: Dimension.window.width - 40,
      height: (Dimension.window.width - 70) * 0.5,
      
      resizeMode: 'cover',
      borderRadius: 10,
    }}
  />
  
</View>

)

  })}
      

        </ScrollView> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  header_container: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Color.primary,
  },
  header_icon_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
  },
  category_list_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  category_heading1: {
    color: Color.black,
    fontSize: 17,
    fontFamily: Fonts.primaryBold,
  },
  category_heading2: {
    color: Color.gray,
    fontSize: 15,
    lineHeight: 27,
    fontFamily: Fonts.primarySemiBold,
  },
  category_style: {
    color: Color.black,
    fontFamily: Fonts.primaryRegular,
    fontSize: 12,
    textAlign: 'center',
    paddingTop: 10,
  },
  category_container: {
    marginTop: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Color.graylights,
  },
  category_list_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  category_heading1: {
    color: Color.black,
    fontSize: 17,
    fontFamily: Fonts.primaryBold,
  },
  category_heading2: {
    color: Color.gray,
    fontSize: 15,
    lineHeight: 27,
    fontFamily: Fonts.primarySemiBold,
  },
});
