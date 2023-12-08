import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
// import { BASE_URL } from '../../axios/API';
import { ServerURL } from '../../axios/API';

function Logo(props) {

  const logo = useSelector((state) => state?.home?.websitedata?.logo)
 
  console.log('Logo---',logo)


  return (
    <View style={[styles.logoContainer, props.style]}>
      <Image
        style={styles.logo}
        source={{
          uri: `http://mlm.propertyindholera.com/public/images/website/${logo}`
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default Logo;
