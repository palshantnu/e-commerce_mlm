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
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import CustomButton from '../components/CustomButton';
  import {LOGIN_SCREEN} from '../constant/Screens';
  import {showToast} from '../components/Toast';
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
  
  const Addmember = ({navigation,route}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [referCode, setReferCode] = useState('');
    // const [loading, setLoading] = useState(false);
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
  
    const selectProfilePic = () => {
        Alert.alert(
          'Select Profile Picture from',
          '',
          [
            {
              text: 'Cancel',
              onPress: () => {},
            },
            {
              text: 'Camera',
              onPress: () => takePhotoFromCamera(),
            },
            {
              text: 'Gallery',
              onPress: () => choosePhotoFromLibrary(),
            },
          ],
          {
            cancelable: true,
          },
        );
      };
      const selectAadharfrontPic = () => {
        Alert.alert(
          'Select Profile Picture from',
          '',
          [
            {
              text: 'Cancel',
              onPress: () => {},
            },
            {
              text: 'Camera',
              onPress: () => takePhotoFromCamera1(),
            },
            {
              text: 'Gallery',
              onPress: () => choosePhotoFromLibrary1(),
            },
          ],
          {
            cancelable: true,
          },
        );
      };
      const selectAadharbackPic = () => {
        Alert.alert(
          'Select Profile Picture from',
          '',
          [
            {
              text: 'Cancel',
              onPress: () => {},
            },
            {
              text: 'Camera',
              onPress: () => takePhotoFromCamera2(),
            },
            {
              text: 'Gallery',
              onPress: () => choosePhotoFromLibrary2(),
            },
          ],
          {
            cancelable: true,
          },
        );
      };
      const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
          compressImageMaxWidth: 300,
          compressImageMaxHeight: 300,
          cropping: true,
          compressImageQuality: 0.7,
          includeBase64: true,
        }).then(image => {
            setMemberPic(image);
        });
      };
    
      const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          compressImageQuality: 0.7,
        //   includeBase64: true,
        }).then(image => {
            console.log('image',image);
            console.log('.fileName',image.fileName);
            console.log('image.mime',image.mime);
            console.log('image.path',image.path);

            setMemberPic(image);
            console.log('memberpick',memberPic);
        });
      };

      const takePhotoFromCamera1 = () => {
        ImagePicker.openCamera({
          compressImageMaxWidth: 300,
          compressImageMaxHeight: 300,
          cropping: true,
          compressImageQuality: 0.7,
          includeBase64: true,
        }).then(image => {
          setAadharfrontpick(image);
        });
      };
    
      const choosePhotoFromLibrary1 = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          compressImageQuality: 0.7,
        //   includeBase64: true,
        }).then(image => {
            console.log('image',image);
            console.log('.fileName',image.fileName);
            console.log('image.mime',image.mime);
            console.log('image.path',image.path);

            setAadharfrontpick(image);
            console.log('Aadharfrontpick',Aadharfrontpick);
        });
      };
      const takePhotoFromCamera2 = () => {
        ImagePicker.openCamera({
          compressImageMaxWidth: 300,
          compressImageMaxHeight: 300,
          cropping: true,
          compressImageQuality: 0.7,
          includeBase64: true,
        }).then(image => {
          setAadharbackpick(image);
        });
      };
    
      const choosePhotoFromLibrary2 = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          compressImageQuality: 0.7,
        //   includeBase64: true,
        }).then(image => {
            console.log('image',image);
            console.log('.fileName',image.fileName);
            console.log('image.mime',image.mime);
            console.log('image.path',image.path);

            setAadharbackpick(image);
            console.log('Aadharfrontpick',Aadharfrontpick);
        });
      };
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
      formData.append('address', referCode );
      formData.append('age', age);
      formData.append('user_id', user?.user_id);
      formData.append('referral', user?.mlmuserid);
      formData.append('image',
      {
        name: 'image.jpg',
        type: memberPic.mime,
        uri: Platform.OS === 'ios' ? file.path.replace('file://', '') : memberPic.path,
      }
      );
      formData.append('document',
      {
        name: 'aadharimage.jpg',
        type: Aadharfrontpick.mime,
        uri: Platform.OS === 'ios' ? file.path.replace('file://', '') : Aadharfrontpick.path,
      }
      );
      
  
  
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
      if (result.status==true) {
        successToast('Member added Successfully !', ToastAndroid.SHORT);
  
            
  
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'HomeScreen'}],
          }),)
  
  
  
      } else {
        errorToast('Something Went Wrong !', ToastAndroid.SHORT);
      }
      // Handle the server response as needed
    } catch (error) {
      console.error('Error uploading data:', error);
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
  
    const _validateSignup = () => {
      if (name == '' || name == null) {
        errorToast("Please enter your name");
      } else if (email == '' || email == null) {
        errorToast("Please enter your email");
      } else if (!validateEmail(email)) {
        errorToast("Please enter your valid email");
      }
       else if (age == '') {
        errorToast("Please enter your age");
      }
      else if (password == '') {
        errorToast("Please enter your password");
      }
      else if (referCode == '') {
        errorToast("Please enter your address");
      }
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
  
        {/* {!isKBOpen && 
         <View style={{marginTop:50,alignItems:'center',marginBottom:100}}>
         <Image source={require('../assets/images/cart.png')} style={{width:150,height:150}}/>
         </View>
        } */}
  
        <Animated.View
          style={{
            paddingHorizontal: 25,
            paddingTop: 50,
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
                <View style={{alignSelf: 'center'}}>
            <Avatar.Image
              size={100}
              style={{alignSelf: 'center'}}
              source={{
                uri:
                memberPic?.path
                  ? memberPic?.path
                  : 
                  'https://www.w3schools.com/w3images/avatar6.png',
              }}
            />
            <Button
              color={Color.primary}
              onPress={() => selectProfilePic()}
              style={{
                margin: 10,
                borderColor: Color.primary,
              }}
              mode="outlined">
              Add Member Pic*
            </Button>
          </View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: '900',
                fontFamily: Fonts.primaryRegular,
                color: Color.black,
                marginBottom: 20,
              }}>
              Add Member
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
              label={'Name'}
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
              label={'Email'}
              value={email}
              onChangeText={setEmail}
              icon={
                <MaterialIcons
                  name="mail"
                  size={20}
                  color="#111"
                  style={{marginRight: 5}}
                />
              }
            />
  
            <InputField1
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
            />
  
  
  
            <InputField1
              label={'Mobile No.'}
              value={phone}
              onChangeText={setPhone}
              keyboardType="number-pad"
              maxLength={10}
              icon={
                <Ionicons
                  name="call-outline"
                  size={20}
                  color="#111"
                  style={{marginRight: 5}}
                />
              }
            />
            <InputField1
              label={'Age'}
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
              maxLength={10}
              icon={
                <Ionicons
                  name="man"
                  size={20}
                  color="#111"
                  style={{marginRight: 5}}
                />
              }
            />
  
          <InputField1
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
          />
  
  <View style={{alignSelf: 'center',flexDirection:'row'}}>

    <View>
            <Image
              // size={100}
              style={{alignSelf: 'center',width:100,height:100,resizeMode:'contain'}}
              source={{
                uri:
                Aadharfrontpick?.path
                  ? Aadharfrontpick?.path
                  : 
                  'https://www.digitalindiagov.in/wp-content/uploads/2020/07/83b30f1a065cbf872c0c945602b14503.jpg',
              }}
            />
            <Button
              color={Color.primary}
              onPress={() => selectAadharfrontPic()}
              labelStyle={{
                fontSize:12
              }}
              style={{
                margin: 10,
                borderColor: Color.primary,
              }}
              mode="outlined">
              Add front Pic*
            </Button>
            </View>

<View>
            <Image
              // size={100}
              style={{alignSelf: 'center',width:100,height:100,resizeMode:'contain'}}
              // style={{alignSelf: 'center'}}
              source={{
                uri:
                    Aadharbackpick?.path
                  ? Aadharbackpick?.path
                  : 
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8iQYgGVY6dSePJFJbXJA6RD-dvulB7z58Pg&usqp=CAU',
              }}
            />
            <Button
              color={Color.primary}
              onPress={() => selectAadharbackPic()}
              labelStyle={{
                fontSize:12
              }}
              style={{
                margin: 10,
                borderColor: Color.primary,
              }}
              mode="outlined">
              Add Back Pic*
            </Button>
            </View>
          </View>
          <View style={{alignSelf: 'center'}}>
            
          </View>
  
         
           
  
            
  
  <Button
      onPress={_validateSignup}
      // loading={loading}
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
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    );
  };
  
  export default Addmember;
  
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
  
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
  });
  