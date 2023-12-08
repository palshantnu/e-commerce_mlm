import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';

import {Color, Fonts, Strings, Dimension} from '../theme';

import {TouchableOpacity} from 'react-native-gesture-handler';

import { CategoryImage, getData,ProductImages,SubCategoryImage } from '../API';
import {useSelector} from 'react-redux';
import { errorToast } from '../components/toasts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const SubCategoryScreen = ({navigation,route}) => {


    const [subCategories,setSubCategories] = React.useState([])

  const getSubcategoryList = async() =>{
  
    let res = await getData(`Allcategory/${route?.params?.params?.item?.cat_name}`)

    console.log('Res--->',res)

    if(res.status == '1'){

    setSubCategories(res?.data);
}

else{
    errorToast('Something went wrong')
}
  }

  React.useEffect(() => {
    getSubcategoryList();
  }, [])
  
console.log('himanshu===>',route?.params?.params?.item?.cat_name);
 const renderCategoryItem = (item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('Products', {
           
         subCategory:item,
          });
        }}
        >
        {index % 2 === 0 ? (
          <View style={styles.categoryItem}>
            <Image
              source={{
                uri: `${SubCategoryImage + item.section_img}`,
              }}
              style={styles.imageStyles}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.section_name}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.categoryItem}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.section_name}</Text>
            </View>
            <Image
              source={{
                uri: `${SubCategoryImage + item.section_img}`,
              }}
              style={{
                ...styles.imageStyles,
                borderBottomRightRadius: 15,
                borderTopRightRadius: 15,
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
              }}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
         <View style={{flexDirection: 'row', padding: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={25}
            color={Color.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}> {route?.params?.params?.item?.cat_name}</Text>
      </View>
      <FlatList
        data={subCategories}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => renderCategoryItem(item, index)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    flexDirection: 'column',
  },
  scrollView: {
    flex: 1,
    backgroundColor: Color.white,
    flexDirection: 'column',
    padding: 20,
  },
  categoryItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    height: Dimension.window.height * 0.15,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
    backgroundColor: Color.white,
    borderRadius: 15,
    // padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  imageStyles: {
    height: '100%',
    width: '60%',
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    resizeMode: 'contain',
    // zIndex: -1,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    // flexWrap: 'wrap',
  },
  title: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 16,
    // padding: 40,
  },
});
export default SubCategoryScreen;
