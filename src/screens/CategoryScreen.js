import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';

import {Color, Fonts, Strings, Dimension} from '../theme';

import {TouchableOpacity} from 'react-native-gesture-handler';

import { CategoryImage } from '../API';
import {useSelector} from 'react-redux';
const CategoryScreen = ({navigation}) => {

  const productCategory =
    useSelector((state) => state?.home?.productcategory) || [];
  const serviceCategory =
    useSelector((state) => state?.home?.servicecategory) || [];


    console.log('productCategory--->',productCategory);

 const renderCategoryItem = (item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('SubCategory', {
           
            params: {item: item},
          });
        }}
        >
        {index % 2 === 0 ? (
          <View style={styles.categoryItem}>
            <Image
              source={{
                uri: `${CategoryImage + item.cat_img}`,
              }}
              style={styles.imageStyles}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.cat_name}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.categoryItem}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.cat_name}</Text>
            </View>
            <Image
              source={{
                uri: `${CategoryImage + item.cat_img}`,
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
      <FlatList
        data={productCategory}
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
  padding:15
  },
  imageStyles: {
    height: '100%',
    width: '60%',
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    resizeMode: 'cover',
    // zIndex: -1,
    backgroundColor:Color.white
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
    color:Color.black
  },
});
export default CategoryScreen;
