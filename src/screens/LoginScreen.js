import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Animated,
  StatusBar,
  Dimensions,
  ImageBackground,
  Easing,
  Keyboard,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useEffect, useFocusEffect} from 'react';

import {SwiperFlatList} from 'react-native-swiper-flatlist';
import InputField from '../components/InputField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import RegisterScreen from './RegisterScreen';

import {showToast} from '../components/Toast';

import Fonts from '../theme/Fonts';
import {postData} from '../API/index';
import {CommonActions} from '@react-navigation/native';

import {showError} from '../components/helperFunction';

import {useSelector, useDispatch} from 'react-redux';
import {errorToast, successToast} from '../components/toasts';
import {Color} from '../theme';

const LoginScreen = ({navigation}) => {
  const [isEmail, setIsEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isKBOpen, setIsKBOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [contentPadding, setContentPadding] = useState(50);
  const _sheetRef = React.useRef(null);

  const animated = new Animated.Value(600);
  const duration = 400;
    // console.log('mobile',mobile);
    // console.log('password',password);
    // console.log('email',email);


  useEffect(() => {
    Animated.timing(animated, {
      toValue: 0,
      duration: duration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  const dispatch = useDispatch();

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onBackPress = () => {
  //       BackHandler.exitApp();
  //       return true;
  //     };

  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);

  //     return () =>
  //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //   }, []),
  // );

  const signIn = async () => {
    setLoading(true);
    let body = {
      // email:'',
      phone: mobile,
      password:password,
    };
    const resp = await fetch(`https://mlm.propertyindholera.com/api/login`,{ method: 'POST',headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
      },body:JSON.stringify(body)})
  
     const response = await resp.json()
     console.log('response',response);
    if (response.status ==='1') {
      successToast('Login Successfully');

      setLoading(false);
      dispatch({
        type: 'SET_USER',
        payload: response.userdata,
      });
     
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'HomeScreen'}],
        }),
      );
    } else {
      errorToast('Invalid Credentials', 'or User not found!');
      setLoading(false);

      errorToast('Invalid Credentials');
    }
  };

  const _renderItem = ({item}) => (
    <ImageBackground
      // imageStyle={{borderRadius: 13}}
      value={item}
      key={item}
      source={item.src}
      style={{
        height: 249,
        width: Dimensions.get('window').width - 18,
        borderRadius: 13,
      }}></ImageBackground>
  );

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // or some other action
        setIsKBOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKBOpen(false);
        // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.main_container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={Color.primary}
        style="light"
      />
      {!isKBOpen && 
       <View style={{marginTop:50,alignItems:'center',marginBottom:100}}>
       <Image source={require('../assets/images/cart.png')} style={{width:150,height:150}}/>
       </View>
      }
      <Animated.View
        style={{
          paddingHorizontal: 25,
          paddingTop: 50,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: Color.primary,
          flex: 1,
          transform: [{translateY: animated}],
          opacity: animated.interpolate({
            inputRange: [0, 600],
            outputRange: [1, 0],
          }),
          // justifyContent: 'center',
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}>
          <ScrollView
          contentContainerStyle={{paddingBottom: 30}}
          showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '900',
            fontFamily: Fonts.primaryBold,
            color: Color.white,
            marginBottom: 30,
          }}>
          Welcome !
        </Text>
        {isEmail ? (
          <InputField
            label={'Email Id'}
            value={email}
            onChangeText={setEmail}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color="#fff"
                style={{marginRight: 5}}
              />
            }
            keyboardType="email-address"
          />
        ) : (
          <InputField
            label={'Mobile Number'}
            value={mobile}
            onChangeText={setMobile}
            icon={
              <MaterialIcons
                name="phone"
                size={20}
                color="#fff"
                style={{marginRight: 5}}
              />
            }
            keyboardType="numeric"
          />
        )}
        <TouchableOpacity onPress={() => setIsEmail(prev => !prev)}>
          <Text style={[styles.linkText, {fontSize: 12}]}>
            {isEmail ? 'Use phone number' : 'Use Email Instead'}
          </Text>
        </TouchableOpacity>
        <InputField
          label={'Password'}
          value={password}
          onChangeText={setPassword}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#fff"
              style={{marginRight: 5}}
            />
          }
          secure={!showPass}
          setSecure={setShowPass}
          inputType="password"
          fieldButtonLabel={'Forgot?'}
          //fieldButtonFunction={() => _sheetRef.current.open()}
        />

        <CustomButton loading={loading} label={'Login'} onPress={signIn} />

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 30,
              borderWidth: 1,
              padding: 15,
              borderRadius: 10,
              borderColor: Color.white,
            }}>
            <Text style={{color: '#fff'}}>New to the app?</Text>
            <Text
              style={{
                color: Color.white,
                fontFamily: Fonts.primaryBold,
              }}>
              {' '}
              Register
            </Text>
          </View>
        </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  slider_container: {
    height: 249,

    width: Dimensions.get('window').width - 18,
    alignSelf: 'center',
  },
  linkText: {
   // flex: 1,
    color: Color.black,
     marginTop: -20,
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    justifyContent: 'space-between',
    textAlign: 'right',
  },
});

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   Button,
//   Image,
//   KeyboardAvoidingView,
//   StatusBar,
//   Platform,
// } from 'react-native';

// import {Color, Fonts, Strings, Dimension} from '../theme';

// import Logo from '../components/Logo';
// import Card from '../components/Card';
// import UserInput from '../components/UserInput';

// import Validator from '../utils/Validator/Validator';
// import {
//   DEFAULT_RULE,
//   PHONE_RULE,
//   PASSWORD_RULE,
//   EMAIL_RULE,
// } from '../utils/Validator/rule';

// import {setUserDetails} from '../utils/LocalStorage';

// import {useDispatch,useSelector} from 'react-redux';
// import { postData } from '../axios/API';
// import { errorToast, successToast } from '../components/toasts';

// export default function LoginScreen(props) {
//   const [loading, setLoading] = useState(false);
//   const [mobile, setMobile] = useState('');
//   const [email, setEmail] = useState('');
//   const [isEmail, setIsEmail] = useState(false);
//   const [password, setPassword] = useState('');
//   const [mobileError, setMobileError] = useState(false);
//   const [mobileErrorMessage, setMobileErrorMessage] = useState('');
//   const [emailError, setEmailError] = useState(false);
//   const [emailErrorMessage, setEmailErrorMessage] = useState('');
//   const [passwordError, setPasswordError] = useState(false);
//   const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

//   const dispatch = useDispatch();

//   useEffect(() => {
//     checkInternetConnection();
//     postloginData()
//   }, []);

//   function onChangeMobile(text) {
//     resetState();
//     setMobile(text.replace(/[^0-9]/g, ''));
//   }

//   function onChangeEmail(text) {
//     resetState();
//     setEmail(text);
//   }

//    const login = () => {

//     if (!isEmail) {
//       if (!Validator(mobile, DEFAULT_RULE)) {
//         setMobileError(true);
//         setMobileErrorMessage(Strings.mobileErrorMessage);
//         return;
//       }
//       if (!Validator(mobile, PHONE_RULE)) {
//         setMobileError(true);
//         setMobileErrorMessage(Strings.mobileErrorMessage);
//         return;
//       }
//     }

//     if (isEmail) {
//       if (!Validator(email, DEFAULT_RULE)) {
//         setEmailError(true);
//         setEmailErrorMessage(Strings.emailErrorMessage);
//         return;
//       }
//       if (!Validator(email, EMAIL_RULE)) {
//         setEmailError(true);
//         setEmailErrorMessage(Strings.emailErrorMessage);
//         return;
//       }
//     }

//     if (!Validator(password, DEFAULT_RULE)) {
//       setPasswordError(true);
//       setPasswordErrorMessage(Strings.passwordErrorMessage);
//       return;
//     }
//     // if (!Validator(password, PASSWORD_RULE)) {
//     //   setPasswordError(true);
//     //   setPasswordErrorMessage(Strings.passwordErrorMessage);
//     //   return;
//     // }
//     setLoading(true);

//   postloginData()
// }

// async function  postloginData (){

//   const  body = {
//     email,
//     phone: mobile,
//     password,
//   }

//   const resp = await fetch(`http://sbbb.futurevalue.in/api/login`,{ method: 'POST',headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//     },body:JSON.stringify(body)})

//    const response = await resp.json()
//   console.log(">>>>>>login succesfully data",response)

//   if (response.status == 1) {
//     successToast('Login Successfully');
//     // dispatch({type: 'SET_USER', payload: response.userdata});
//     setUserDetails(response.userdata);
//     setLoading(false);

//     props.navigation.navigate('Home');
//   } else {
//     errorToast(response.message);
//   }

//   };

//   const resetState = () => {
//     setMobileError(false);
//     setMobileErrorMessage('');
//     setEmailError(false);
//     setEmailErrorMessage('');
//     setPasswordError(false);
//     setPasswordErrorMessage('');
//   };

//   return (
//     <View style={styles.mainContainer}>
//       <StatusBar
//         barStyle="light-content"
//         backgroundColor={Color.colorPrimary}
//       />

//       <KeyboardAvoidingView
//         behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
//         style={styles.container}>
//         <View style={styles.innerContainer}>
//           <ScrollView
//             style={{flex: 1}}
//             contentContainerStyle={styles.scrollview}
//             // onContentSizeChange={onContentSizeChange}
//             showsVerticalScrollIndicator={false}
//             keyboardShouldPersistTaps={'always'}>
//             <View>
//               {/* <View style={styles.loginLinkContainer}>
//                 <Text style={styles.activeLinkText}>Sign In</Text>
//                 <TouchableOpacity
//                   onPress={() => {
//                     // props.navigation.navigate('Register');
//                     props.navigation.navigate('Phone');
//                   }}>
//                   <Text style={styles.linkText}>{Strings.signup_text}</Text>
//                 </TouchableOpacity>
//               </View> */}
//               <View style={styles.headingContainer}>
//                 {/* <Text style={styles.heading}>{Strings.login_text1}</Text>
//                 <Text style={styles.tagline}>{Strings.login_text2}</Text> */}
//                  <Text style={styles.heading}>Login</Text>
//                 <Text style={styles.tagline}>Login</Text>
//               </View>
//               <Logo />
//               <Card style={{marginHorizontal:20, padding: 20}}>
//                 {isEmail ? (
//                   <UserInput
//                     // placeholder={Strings.emailHint}
//                     placeholder={'abc'}
//                     error={emailError}
//                     value={email}
//                     errorMessage={emailErrorMessage}
//                     onChangeText={(mail) => onChangeEmail(mail)}
//                   />
//                 ) : (
//                   <UserInput
//                     keyboardType="numeric"
//                     // placeholder={Strings.mobileHint}
//                     placeholder={'abc'}
//                     error={mobileError}
//                     value={mobile}
//                     errorMessage={mobileErrorMessage}
//                     maxLength={10}
//                     onChangeText={(mobile) => onChangeMobile(mobile)}
//                   />
//                 )}
//                 <TouchableOpacity onPress={() => setIsEmail((prev) => !prev)}>
//                   <Text style={[styles.linkText, {fontSize: 12}]}>
//                     {isEmail ? 'Use phone number' : 'Use Email Instead'}
//                   </Text>
//                 </TouchableOpacity>
//                 <UserInput
//                   placeholder={Strings.passwordHint}
//                   secureTextEntry={true}
//                  // error={passwordError}
//                   value={password}
//                  // errorMessage={passwordErrorMessage}
//                   maxLength={20}
//                   onChangeText={(password) => {
//                     setPassword(password);
//                     resetState();
//                   }}
//                 />
//                 <View
//                   style={[
//                     styles.loginLinkContainer,
//                     {marginTop: 20, justifyContent: 'space-between'},
//                   ]}>
//                   <TouchableOpacity
//                     onPress={() => {
//                       props.navigation.replace('ForgetPassword');
//                     }}>
//                     <Text style={[styles.linkText, {fontSize: 12}]}>
//                       {Strings.forgetPassword}
//                     </Text>
//                   </TouchableOpacity>
//                   <View style={styles.buttonContainer}>
//                     {/* <LoadingButton
//                       title={Strings.signin}
//                       loading={loading}
//                       onPress={() => login()}
//                     /> */}
//                   </View>

//                 </View>
//                 <View style={{paddingRight:85,paddingTop:25,display:'flex',alignItems:'center',flexDirection:'row',textAlign:'center'}}>
// <Text style={[styles.linkText, {fontSize: 12}]}>New User?</Text>
// <TouchableOpacity
//                   onPress={() => {
//                     // props.navigation.navigate('Register');
//                     props.navigation.navigate('OTP');
//                   }}>
//                   <Text style={[styles.linkText, {fontSize:14,color:Color.colorPrimary,fontWeight:"bold",}]}>{Strings.signup_text}</Text>
//                 </TouchableOpacity>

// </View>

//               </Card>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   width: Dimension.window.width * 0.25,
//                   marginTop: 10,
//                   marginLeft: 35,
//                 }}>
//                 <TouchableOpacity style={{justifyContent: 'center'}}>
//                   <Image
//                     source={require('../assets/images/facebook.png')}
//                     style={{
//                       width: 40,
//                       height: 40,
//                       resizeMode: 'contain',
//                     }}
//                   />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={{justifyContent: 'center'}}>
//                   <Image
//                     source={require('../assets/images/google.png')}
//                     style={{
//                       width: 38,
//                       height: 38,
//                       resizeMode: 'contain',
//                       shadowColor: '#000',
//                       shadowOffset: {width: 0, height: 2},
//                       shadowOpacity: 0.2,
//                     }}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </ScrollView>
//         </View>
//       </KeyboardAvoidingView>
//       {/* <View style={styles.bottomImage}>
//         <Image source={require('../assets/images/thumb1.png')} />
//       </View> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: Color.white,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scrollView: {
//     backgroundColor: Color.white,
//     flexDirection: 'column',
//     padding: 20,
//     flexGrow: 1,
//   },
//   container: {
//     flex: 1,
//     zIndex: 99999999,
//     marginTop:-15

//   },
//   loginLinkContainer: {
//     display: 'flex',

//     flexDirection: 'row',
//     width: '100%',
//   },
//   headingContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     width: '100%',
//     marginTop: 30,
//     marginBottom: 30,
//     marginLeft: 20,
//   },

//   heading: {
//     fontSize: 20,
//     fontFamily: Fonts.primarySemiBold,
//     color: Color.headingColor,
//   },

//   tagline: {
//     fontSize: 12,
//     fontFamily: Fonts.primaryRegular,
//     color: Color.taglineColor,
//   },

//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//     fontFamily: Fonts.primaryRegular,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//     fontFamily: Fonts.primaryBold,
//   },
//   linkText: {
//     flex: 1,
//     color: Color.textColor,
//     // padding: 10,
//     fontSize: 16,
//     fontFamily: Fonts.primaryRegular,
//     justifyContent: 'space-between',
//     textAlign: 'right',
//   },
//   activeLinkText: {
//     flex: 1,
//     color: Color.colorPrimaryDark,
//     padding: 10,
//     fontSize: 16,
//     fontFamily: Fonts.primaryRegular,
//     textAlign: 'left',
//   },
//   bottomImage: {
//     height: 150,
//     width: 150,
//     position: 'absolute',
//     bottom: 0,
//     right: 80,
//     zIndex: 1,
//     flex: 1,
//     justifyContent: 'flex-end',
//   },
//   buttonContainer: {},
// });
