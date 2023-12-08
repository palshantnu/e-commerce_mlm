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
    Image,
    Platform
  } from 'react-native';
  import React, {useState} from 'react';
  import {useEffect} from 'react';
  import {SwiperFlatList} from 'react-native-swiper-flatlist';
  import InputField from '../components/InputField';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import CustomButton from '../components/CustomButton';
  import {LOGIN_SCREEN} from '../constant/Screens';
  import {showToast} from '../components/Toast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

  //import OtpModal from '../components/modals/OtpModal';
  //import BannerSlider from '../components/BannerSlider';
  import Fonts from '../theme/Fonts';
  import {postData, postDataAndImage} from '../API/index';
  //import DateTimePickerModal from 'react-native-modal-datetime-picker';
  //import {RadioButton} from 'react-native-paper';
  import { errorToast, successToast} from '../components/toasts';
  import { CommonActions } from '@react-navigation/native';
  import { Color } from '../theme';
import InputField1 from '../components/InputField1';
import { Avatar, Button } from 'react-native-paper';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios, { Axios } from 'axios';
import { useSelector } from 'react-redux';
  
  const WithdrawalWallet = ({navigation,route}) => {
    const [name, setName] = useState('');
    const [account, setAccount] = useState('');
    const [IFSCcode, setIFSCcode] = useState('');
    const [amount, setAmount] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [referCode, setReferCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [memberPic, setMemberPic] = React.useState('');
    const [Aadharfrontpick, setAadharfrontpick] = React.useState('');
    const [Aadharbackpick, setAadharbackpick] = React.useState('');
    const [isKBOpen, setIsKBOpen] = useState(false);
    // const [otp, setOtp] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const animated = new Animated.Value(600);
    const duration = 300;
    const [checked, setChecked] = React.useState('Male');
    const user = useSelector(state => state.user);
    const walletamount = route.params;
    console.log('walletamount',walletamount);
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
  
    const handleWithdraw = async pass => {
      setLoading(true);
      let body = {
        user_id:user.user_id,
        name: name,
        bankaccountnumber: account,
        ifsc: IFSCcode,
        amount: amount,
      };
      
     try{
      // const response = await axios.post('https://mlm.propertyindholera.com/api/mlmstore'
      // , formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      console.log('body',body);
      // let body = {
      //   user_id:user.user_id,
      //   name: name,
      //   bankaccountnumber: account,
      //   ifsc: IFSCcode,
      //   amount: amount,
      // };
      const res = await postData('walletrequestsend', body);
      console.log('walletrequestsend res-->', res);
      // if (res?.cartdata?.status) {
      //   successToast('item remove from cart successfully')
      //    getUserCart();
      // }
        // return result;
      // console.log('Upload successful!', result);
      if (res.status==true) {
        successToast('Request Submitted Successfully !', ToastAndroid.SHORT);
  
            
       setLoading(false)
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'HomeScreen'}],
          }),)
  
  
  
      } else {
        errorToast('Something Went Wrong !', ToastAndroid.SHORT);
       setLoading(false)
      }
      // Handle the server response as needed
    } catch (error) {
      console.error('Error uploading data:', error);
      setLoading(false)
      // Handle the error appropriately
    }
  
      // const response = await postDataAndImage('mlmstore', formData);
      // console.log(">>>>>REGISTRATION",response)
  
  
  
      
    };
  
    // validateAdhar = adhar => {
    //   var re = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;
    //   return re.test(adhar);
    // };
  
    const validateEmail = email => {
      var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };
  
    const _validateWithdrawalrequest = () => {
      if (name == '' || name == null) {
        errorToast("Please enter your name");
      } else if (account == '' || account == null) {
        errorToast("Please enter your Account Number");
      } 
      // else if (!validateEmail(email)) {
      //   errorToast("Please enter your valid email");
      // }
       else if (IFSCcode == '') {
        errorToast("Please enter your IFSCcode");
      }
  
      // else if (!this.validateAdhar(adhar)) {
      //   showToast({text: 'Please enter valid Adharcard number', navBar: false});
      // }
      else if (amount == '' || amount == null) {
        errorToast("Please enter your amount");
      }
      // else if (amount > walletamount.walletamount) {
      //   errorToast("Insufficient Funds");
      // }
      //  else if (phone.length < 10) {
        
      //   errorToast("Please enter minimum 10 digit mobile number");
      // } 
      // else if(phone!==route?.params?.item){
      //   errorToast("Please enter registered mobile number");
  
      // }
      
      
     
      else {
        handleWithdraw();
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
  
        {/* {!isKBOpen && 
         <View style={{marginTop:50,alignItems:'center',marginBottom:100}}>
         <Image source={require('../assets/images/cart.png')} style={{width:150,height:150}}/>
         </View>
        } */}
  
        <Animated.View
          style={{
            paddingHorizontal: 15,
            paddingTop: 10,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            // borderTopLeftRadius: 30,
            // borderTopRightRadius: 30,
            backgroundColor: Color.white,
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
                <View style={{flexDirection: 'row', paddingVertical: 10,alignItems:'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={28}
            color={Color.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}> User Withdrawal Request</Text>
      </View>

            <Text
              style={{
                fontSize: 24,
                fontWeight: '900',
                fontFamily: Fonts.primaryRegular,
                color: Color.black,
                marginBottom: 20,
              }}>
              Add Details
            </Text>
            {/* <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                fontFamily: Fonts.primaryRegular,
                color: Color.black,
                // marginBottom: 30,
              }}>
              Open a free account now
            </Text> */}
  
            <InputField1
              label={'Enter Your Name'}
              value={name}
              onChangeText={setName}
              icon={
                <MaterialIcons
                  name="account-circle"
                  size={20}
                  color="#111"
                  style={{marginRight: 5}}
                />
              }
            />
  
            <InputField1
              label={'Enter Your Account Number'}
              value={account}
              onChangeText={setAccount}
              keyboardType="number-pad"
              maxLength={18}
              icon={
                <MaterialIcons
                  name="account-balance"
                  size={20}
                  color="#111"
                  style={{marginRight: 5}}
                />
              }
            />
  
            {/* <InputField1
              label={'Password'}
              value={password}
              onChangeText={setPassword}
              icon={
                <Ionicons
                  name="ios-lock-closed-outline"
                  size={20}
                  color="#111"
                  style={{marginRight: 5}}
                />
              }
              secure={!showPass}
              setSecure={setShowPass}
              inputType="password"
              //fieldButtonLabel={'Forgot?'}
              //fieldButtonFunction={() => _sheetRef.current.open()}
            /> */}
  
  
  
            <InputField1
              label={'Enter Your IFSC Code'}
              value={IFSCcode.toUpperCase()}
              onChangeText={setIFSCcode}
              icon={
                <MaterialCommunityIcons
                  name="piggy-bank"
                  size={20}
                  color="#111"
                  style={{marginRight: 5}}
                />
              }
            />
            <InputField1
              label={'Enter Your Amount'}
              value={amount}
              onChangeText={setAmount}
              keyboardType="number-pad"
              maxLength={10}
              icon={
                <FontAwesome
                  name="rupee"
                  size={20}
                  color="#111"
                  style={{marginRight: 5}}
                />
              }
            />
  
          {/* <InputField1
            label={'Address'}
            value={referCode}
            onChangeText={setReferCode}
            icon={
              <Ionicons
                name="location"
                size={20}
                color="#111"
                style={{marginRight: 5}}
              />
            }
          /> */}

          <View style={{alignSelf: 'center'}}>
            
          </View>
  
         
           
  
            
  
  <Button
      onPress={_validateWithdrawalrequest}
      loading={loading}
      mode="contained"
      dark
      contentStyle={{
        padding: 5,
      }}
      labelStyle={{
        fontFamily: Fonts.primaryBold,
        fontSize: 18,
        fontWeight: '800',
        color: Color.white,
      }}
      style={{
        backgroundColor: Color.primary,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 15,
        elevation: 3,
       
      }}>
        Submit
      {/* {label} */}
    </Button>
    <TouchableOpacity onPress={() => navigation.navigate('WalletWithdrawallist')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 30,
              borderWidth: 1,
              padding: 15,
              borderRadius: 10,
              borderColor: Color.primary,
            }}>
            {/* <Text style={{color: '#111'}}>New to the app?</Text> */}
            <Text
              style={{
                color: Color.primary,
                fontFamily: Fonts.primaryBold,
              }}>
              {' '}
              Withdrawal Request List
            </Text>
          </View>
        </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    );
  };
  
  export default WithdrawalWallet;
  
  const styles = StyleSheet.create({
    main_container: {
      flex: 1,
      backgroundColor: Color.black,
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
    title: {
        color: Color.black,
        fontSize: 22,
        fontFamily: Fonts.primaryBold,
      },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
  });
  