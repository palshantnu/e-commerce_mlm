import { StyleSheet, Text, View,ImageBackground,Dimensions,Image } from 'react-native'
import React, {useState,useEffect} from 'react';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import { BLACK, PRIMARY_COLOR } from '../constant/Colors';
import Color from '../theme/Color';
import { ProductImage } from '../API';

function BannerSlider(props)  {
    
    const [imgData,setImgData]=React.useState(props.img)
  const [Banner,setBanner]=React.useState([])
  const ProductImage='http://sbbb.futurevalue.in/public/images/sliders/'
const fetchImage=(props)=>{
const Igext=Banner;

imgData && imgData.map((item)=>{
    return Igext.push(item)
    setBanner(Igext)
    })
  // 

  // console.log(">>>>>>>imgarrry",Banner)



  
}

useEffect(()=>{
    fetchImage()
      })



      const _renderItem = ({item}) => (
        <Image
          //imageStyle={{borderRadius: 13}}
          value={item}
          key={item}
        //   source={{
        //    uri:`${ProductImage+item}`
          
        //   }}
      //  source={item.img}
      source={{
        uri:`http://mlm.propertyindholera.com/public/product/images/${item}`
       
       
       }}
        resizeMode='contain'
          style={{
            height: 249,
            flex:1,
            width:Dimensions.get('window').width,
            borderRadius: 13,
          }} />
      );



    return (
    <View style={styles.slider_container}>
        
        <SwiperFlatList
          autoplay
          autoplayDelay={4}
          autoplayLoop
          index={0}
          showPagination
          paginationStyleItem={{width: 6, height: 6, marginTop: 9}}
          paginationDefaultColor={Color.black}
          paginationActiveColor={Color.primary}
          data={imgData}
          renderItem={_renderItem}
        />
      </View>
  )
}

export default BannerSlider

const styles = StyleSheet.create({
    slider_container: {
        height: 180,
    
        width: Dimensions.get('window').width - 18,
        alignSelf: 'center',
      },
})