import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  FlatList,
  Image
} from 'react-native';
import React from 'react';
import {Color} from '../theme';
import {useSelector} from 'react-redux';
import {IconButton} from 'react-native-paper';
import Fonts from '../theme';
import Fontisto from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Searchbar} from 'react-native-paper';
import {getData, ProductImage} from '../API';

const AppHeader = ({navigation}) => {
  const [showSearchBar, setShowSearchBar] = React.useState(false);
  const [searchData, setSearchData] = React.useState([]);
  const user = useSelector(state => state.user);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const onchangeSearchText = async text => {
    const res = await getData(`productSearch/${text}/${user?.user_id}`);
    console.log('Product-->',res)
    setSearchData(res);
    await navigateToNext(res);
  };

  const navigateToNext = async(res) =>{
    navigation.navigate('SearchScreen', {
     searchData: res,
    });
     setSearchData([]);
     setShowSearchBar(false);
  }
  const renderSearchProductItem = item => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={{display: 'flex', flexDirection: 'row'}}
          activeOpacity={1}
          onPress={() => {
            setShowSearchBar(false);
            setSearchData([]);
            // this.setState({searchProduct: [], showSearch: false});
            // navigateToScreen(item);
          }}>
          <View style={{width: 50, height: 50}}>
            <Image
              source={{
                uri: `${ProductImage + item.image}`,
              }}
              style={{height: 35, width: 35}}
            />
          </View>
          <Text style={{fontSize: 16}}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.top_container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={Color.primary}
        style="dark"
      />
      <View style={styles.header_container}>
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
          {/* <TouchableOpacity onPress={() => setShowSearchBar(prev => !prev)}> */}
          <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
            <EvilIcons name="search" size={30} color={Color.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => isLoggedIn ? navigation.navigate('MyWishlist') : navigation.navigate('Login')}>
          <EvilIcons name="heart" size={35} color={Color.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => isLoggedIn ? navigation.navigate('MyCart') : navigation.navigate('Login')}>
            <EvilIcons name="cart" size={35} color={Color.white} />
          </TouchableOpacity>

          {   user.mlmstatus == "TRUE" &&
            <TouchableOpacity onPress={() => isLoggedIn ? navigation.navigate('Dashboard') : navigation.navigate('Login')}>
            <MaterialIcons name="dashboard" size={30} color={Color.white} />
          </TouchableOpacity>}

        </View>
      </View>
      {showSearchBar ? (
        <View style={styles.searchContainer}>
          <Searchbar
            onChangeText={text => onchangeSearchText(text)}
            onClose={() => {
              setShowSearchBar(false);
              setSearchData([]);
            }}
            data={searchData}
          />

          <FlatList
            // key={'flatlist3'}
            data={searchData}
            renderItem={({item, index}) => renderSearchProductItem(item, index)}
            keyExtractor={item => item.id}
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default AppHeader;

const BAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  top_container: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 5,
    backgroundColor: Color.primary,
    justifyContent: 'space-between',
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
    width: '40%',
  },
  searchContainer: {
   //  marginTop: BAR_HEIGHT,
   // marginTop: 200,
    top:50,
    width: '100%',
    alignItems:'center',
   // backgroundColor: '#ffffff',
    position: 'absolute',
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
  itemContainer: {
    marginTop: 10,
  },
});
