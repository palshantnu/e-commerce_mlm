
import React,{ useEffect } from 'react';
import { View, Text,Image,StyleSheet,StatusBar,Dimensions } from 'react-native';
import { Color } from '../theme';
import height from '../theme/Dimension/'
import {useDispatch, useSelector} from 'react-redux';
import { getUserDetails } from '../utils/LocalStorage';
import { getData } from '../API';




const SplashScreen = ({navigation}) => {
  const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const performTimeConsumingTask = async () => {
      
        const user_id=user?.user_id;
    
        console.log('user_id===',user_id)
    
    
      //  const res = await getData(`index?user_id=${user_id}`);
       const resp = await fetch(`http://mlm.propertyindholera.com/api/index?user_id=${user?.user_id}`);
       const data = await resp.json();
        console.log("new_arrival-->", data?.new_arrivals?.data);
        if(data.status ==='1'){
          dispatch({type: 'SET_HOME', payload: data});
        // console.log(">>>>>>>>>>>>>>responsesethome",`${ServerURL}/api/index?user_id=${user_id}`)
        }
        // return new Promise((resolve) =>
        //   getIndexPage(user).then((res) => {
        //     console.log("getIndexPAge",res)
        //     dispatch({type: 'SET_HOME', payload: res});
        //     resolve(res);
        //   }),
        // );
      // let res = await getIndexPage(user)
      // console.log("ressssss",res)
      // let resss = await getData(`api/index?user_id=${user.user_id}`)
      // console.log(">>>>>>",resss)
      };

      const fetchData = async() =>{
        // Preload data from an external API
        // Preload data using AsyncStorage
        const user = await getUserDetails();
        const data = await performTimeConsumingTask();
        // console.log(data);
        if (data !== null) {
          navigation.navigate('HomeScreen');
        }
      }
    
    
      useEffect(() => {
        // getuserdata();
      // checkInternetConnection();
         fetchData();
      }, []);



    // useEffect(() => {
    //     setTimeout( () => {
    //       navigation.replace('HomeScreen'); 
    //     }, 3000);
    // },[]);
    return (
        <View style={styles.main__container}>
         <StatusBar
          barStyle="light-content"
          hidden={false}
          
          style="light"
        />
            <Image source={require('../assets/images/original-logo.png')} style={styles.img_styles}/>
        </View>
    );
};

export default SplashScreen;
const styles= StyleSheet.create({
main__container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:Color.white
},
img_styles: {
height: Dimensions.get('window').height/5 ,
width: Dimensions.get('window').width/2-50,
resizeMode: 'cover',
}
});
