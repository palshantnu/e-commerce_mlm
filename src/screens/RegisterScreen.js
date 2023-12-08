import {
  StyleSheet,
  Text,
  View,
  Animated,
  StatusBar,
  Dimensions,
  ImageBackground,
  Easing,
  Keyboard,
  alert,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image
} from 'react-native';
import React, {useState} from 'react';
import {useEffect} from 'react';


import {SwiperFlatList} from 'react-native-swiper-flatlist';
import InputField from '../components/InputField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../components/CustomButton';
import {LOGIN_SCREEN} from '../constant/Screens';
import {showToast} from '../components/Toast';
//import OtpModal from '../components/modals/OtpModal';
//import BannerSlider from '../components/BannerSlider';
import Fonts from '../theme/Fonts';
import {postData} from '../API/index';
//import DateTimePickerModal from 'react-native-modal-datetime-picker';
//import {RadioButton} from 'react-native-paper';
import { errorToast, successToast} from '../components/toasts';
import { CommonActions } from '@react-navigation/native';
import { Color } from '../theme';

const RegisterScreen = ({navigation,route}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(route?.params?.item);
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [referCode, setReferCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [isKBOpen, setIsKBOpen] = useState(false);
  // const [otp, setOtp] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const animated = new Animated.Value(600);
  const duration = 300;
  const [checked, setChecked] = React.useState('Male');

  useEffect(() => {
    Animated.timing(animated, {
      toValue: 0,
      duration: duration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

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
        showMessage = () => {
          alert('keyboardup');
        };
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

  const handleOTP = async () => {
    setLoading(true);
    // const response = await postData('api/getCheckemail', {
    //   email,
    //   mobile: phone,
    // });
    // if (response.success) {
    //   ToastAndroid.show(
    //     'User Already Exist ! Please Login',
    //     ToastAndroid.SHORT,
    //   );
    //   setLoading(false);
    //   navigation.goBack();
    // } else {
    let otp = Math.floor(1000 + Math.random() * 9000);
    setOtp(otp);
    console.log(otp);
    ToastAndroid.show('OTP Sent Successfully!', ToastAndroid.SHORT);
    //showToast({text: 'OTP Sent Successfully!', navBar: false});
    setLoading(false);
    setModalVisible(true);
    // }
  };

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  FormatDate = async data => {
    let dateTimeString =
      data.getFullYear() +
      '-' +
      (data.getMonth() + 1) +
      '-' +
      data.getDate() +
      ' ';

    await hideDatePicker();
    await setDOB(dateTimeString);
    console.log('dob--', dob);

    return dateTimeString; // It will look something like this 3-5-2021 16:23
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleCardNumber = text => {
    let formattedText = text.split(' ').join('');
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    setAdhar(formattedText);
    console.log('adhr', adhar);
    return formattedText;
  };


  // const handleRegister = async pass => {
  //   setLoading(true);
  //   let body = {
  //     name: name,
  //     email: email,
  //     // adhar_no: adhar,
  //     phonenumber: phone,
  //     // age: age,
  //     gender: checked,
  //     // dob: dob,
  //     // address: address,
  //     referral: referCode
  //   };




  //   console.log(">>>>>REGISTRATION",body)


  //   const response = await postData('mlmstore', body);
  //   console.log(">>>>>REGISTRATION",response)



  //   if (response.status==true) {
  //     successToast('Register Successful !', ToastAndroid.SHORT);



  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 1,
  //         routes: [{name: 'HomeScreen'}],
  //       }),)



  //   } else {
  //     errorToast('Something Went Wrong !', ToastAndroid.SHORT);
  //   }
  // };
  const handleRegister = async pass => {
    // setLoading(true);
  //   let body = {
  //     name: name,
  //     email: email,
  //     adhar_no: adhar,
  //     phonenumber: phone,
  //     age: age,
  //     gender: checked,
  //     dob: dob,
  //     address: address,
  //   };
    
   try{
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', phone);
    formData.append('password', password);
    formData.append('address', '' );
    formData.append('referral', referCode);
    // formData.append('user_id', user?.user_id);
    // formData.append('image',
    // {
    //   name: 'image.jpg',
    //   type: memberPic.mime,
    //   uri: Platform.OS === 'ios' ? file.path.replace('file://', '') : memberPic.path,
    // }
    // );

    


    console.log(">>>>>REGISTRATION",formData)

    // const response = await axios.post('https://mlm.propertyindholera.com/api/mlmstore'
    // , formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    const response = await fetch(`https://mlm.propertyindholera.com/api/mlmstore`, {
      method: 'POST',
      // headers: {'Content-Type': 'application/json;charset=utf-8'},
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
    const result = await response.json();
      // return result;
    console.log('Upload successful!', result);
    if (result.message=='Mlm User Create Successfully') {
      successToast('MLM User Registered Successfully !', ToastAndroid.SHORT);

          

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Login'}],
        }),)



    } else if (result.message=='Mobile already exists') {
      errorToast('User Already Exists!', ToastAndroid.SHORT);
    }
    else if (result.message=='New User Create Successfully')
    {
      successToast('Registered Successfully !', ToastAndroid.SHORT);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Login'}],
        }),)
    }
    // Handle the server response as needed
  } catch (error) {
    console.error('Error uploading data:', error);
    // Handle the error appropriately
  }

    // const response = await postDataAndImage('mlmstore', formData);
    // console.log(">>>>>REGISTRATION",response)
    
  };

  validateAdhar = adhar => {
    var re = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;
    return re.test(adhar);
  };

  const validateEmail = email => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const _validateSignup = () => {
    if (name == '' || name == null) {
      errorToast("Please enter your name");
    } else if (email == '' || email == null) {
      errorToast("Please enter your email");
    } else if (!validateEmail(email)) {
      errorToast("Please enter your valid email");
    } 
    // else if (adhar == '') {
    //   errorToast("Please enter your adhar number");
    // }

    // else if (!this.validateAdhar(adhar)) {
    //   showToast({text: 'Please enter valid Adharcard number', navBar: false});
    // }
    else if (phone == '' || phone == null) {
      errorToast("Please enter your phone number");
    } else if (phone.length < 10) {
      
      errorToast("Please enter minimum 10 digit mobile number");
    } 
    // else if(phone!==route?.params?.item){
    //   errorToast("Please enter registered mobile number");

    // }
    
    
   
    else {
      handleRegister();
    }
  };

  return (
    <SafeAreaView style={styles.main_container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={Color.primary}
        style="light"
      />
      {/* <OtpModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        phone={phone}
        otp={otp}
        setPassword={setPassword}
        handleRegister={pass => handleRegister(pass)}
      /> */}

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
              fontFamily: Fonts.primaryRegular,
              color: Color.white,
            }}>
            Join Us !
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              fontFamily: Fonts.primaryRegular,
              color: Color.white,
              marginBottom: 30,
            }}>
            Open a free account now
          </Text>

          <InputField
            label={'Name'}
            value={name}
            onChangeText={setName}
            icon={
              <MaterialIcons
                name="account-circle"
                size={20}
                color="#fff"
                style={{marginRight: 5}}
              />
            }
          />

          <InputField
            label={'Email'}
            value={email}
            onChangeText={setEmail}
            icon={
              <MaterialIcons
                name="mail"
                size={20}
                color="#fff"
                style={{marginRight: 5}}
              />
            }
          />

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
            //fieldButtonLabel={'Forgot?'}
            //fieldButtonFunction={() => _sheetRef.current.open()}
          />



          <InputField
            label={'Mobile No.'}
            value={phone}
            onChangeText={setPhone}
            keyboardType="number-pad"
            maxLength={10}
            icon={
              <Ionicons
                name="call-outline"
                size={20}
                color="#fff"
                style={{marginRight: 5}}
              />
            }
          />

<InputField
          label={'Referal Code'}
          value={referCode}
          onChangeText={setReferCode}
          icon={
            <Ionicons
              name="code"
              size={20}
              color="#fff"
              style={{marginRight: 5}}
            />
          }
        />

          
        

       
         

          

          <CustomButton
            loading={loading}
            label={'Proceed'}
            // onPress={() => handleOTP()}
            onPress={() => _validateSignup()}
          />
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
  gender_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -15,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
