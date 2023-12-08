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

import Fontisto from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Searchbar} from 'react-native-paper';


const SearchScreen = ({navigation,route}) => {
  const user = useSelector((state) => state?.user) || {};
 // console.log('SData=',route?.params?.searchData);
  const [searchData, setSearchData] = React.useState([]);
  
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const onchangeSearchText = async text => {
    const res = await getData(`productSearch/${text}/${user?.user_id}`);
    console.log('Product-->',res)
    setSearchData(res);
    
  };
 



const navigateToScreen = item => {
  navigation.navigate('Product', {
    screen: 'ProductView',
    params: {item: item},
  });
  setSearchData([]);
 
};

const renderProductItem =(item)=> {

  return (
    <ProductRow
      item={item}
    //  addToCart={addToCart}
    //  count={cart}
      user={user}
      onPress={() => {
        navigateToScreen(item);
      }}
    />
  );
}

React.useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
 
  });
  //onchangeSearchText('');
  
  // Return the function to unsubscribe from the event so it gets removed on unmount
  return unsubscribe;
}, [navigation]);

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={{paddingBottom:30}} showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
          <Searchbar
            onChangeText={text => onchangeSearchText(text)}
            onClose={() => {
             // setShowSearchBar(false);
              setSearchData([]);
            }}
            style={{borderColor:Color.primary,borderWidth:2,height:50}}
            data={searchData}
          />
          </View>
     
    {  searchData.length > 0 ?
    <View style={{alignSelf:'center',justifyContent:'space-between',marginTop:20}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={searchData}
        numColumns={2}
        renderItem={({item, index}) => renderProductItem(item, index)}
        keyExtractor={item => item.id}
       // extraData={this.state}
      />
    </View> : null}
   
    
    </ScrollView>
  </View>
  )
}

export default SearchScreen

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

  searchContainer: {
    //  marginTop: BAR_HEIGHT,
    marginTop: 30,
   //  top:50,
     width: '100%',
     alignItems:'center',
    // backgroundColor: '#ffffff',
    //  position: 'absolute',
     display: 'flex',
     flexDirection: 'column',
     flex:1,
     paddingHorizontal: 20,
     shadowColor: '#000',
     shadowOffset: {
       width: 0,
       height: 2,
     },
     shadowOpacity: 0.25,
     shadowRadius: 3.84,
 
     elevation: 5,
   },

  header_icon_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
  },

})