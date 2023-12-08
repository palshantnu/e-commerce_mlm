import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Color, Dimension, Fonts} from '../../theme';
import {RadioButton, TextInput, Button} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { postData } from '../../API';
import { useSelector } from 'react-redux';
import { successToast } from '../toasts';
import { getData } from '../../API';
export default AddressSheet = React.forwardRef((props, ref) => {

  const user = useSelector(state => state.user)
  const theme = {colors: {text: '#000', background: '#aaaaaa50'}}; // for text input
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [landmark, setLandmark] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [pincode,setPincode] = React.useState('');
  const [countryList, setCountryList] = React.useState(['India']);
  const [country, setCountry] = React.useState('');
  const [selectedCountry, setSelectedCountry] = React.useState('');
  const [state, setState] = React.useState('');
  const [index, setIndex] = React.useState('');
  const [selectedState, setSelectedState] = React.useState('');
  const [category2, setCategory2] = React.useState([]);
  const [data2, setData2] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [selectedCity, setSelectedCity] = React.useState('');

  const Get_State = async () => {
    // console.log('hxjbqjhx', user.result[0].id);
    var headers = new Headers();
    headers.append(
      'X-CSCAPI-KEY',
      'anY4YzE3RTk3ZlgzNnJsalJYSWFZRDhxZTdaSE5SN1NISDFiWFpNZQ==',
    );

    var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    };
    try {
      const response = await fetch(
        'https://api.countrystatecity.in/v1/countries/IN/states',
        requestOptions,
      );
      const result = await response.json();

      console.log('response Profile', result);
      setData2(result);
      setCategory2(result.map(item => item.name));
      console.log(category2);

      return result;
    } catch (e) {
      console.log('error', e);
      return null;
    }
  };

  const Get_City = async () => {
    var headers = new Headers();
    headers.append(
      'X-CSCAPI-KEY',
      'anY4YzE3RTk3ZlgzNnJsalJYSWFZRDhxZTdaSE5SN1NISDFiWFpNZQ==',
    );

    var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    };

    try {
      const response = await fetch(
        `https://api.countrystatecity.in/v1/countries/IN/states/${data2[index]?.iso2}/cities`,
        requestOptions,
      );
      const result = await response.json();

      console.log(
        'response Profile',
        result.map(item => item.name),
      );

      setCity(result.map(item => item.name));
      return result;
    } catch (e) {
      console.log('error', e);
      return null;
    }
  };
  React.useEffect(() => {
    Get_State();
    Get_City();
  }, [index]);


 


  const createAddress = async() =>{
    setLoading(true);
    let body = {
      user_id:user?.user_id,
      user_name: name,
      user_phone: mobile,
      user_mail: email,
      user_country: selectedCountry,
      user_pincode: pincode,
      user_state: selectedState,
      user_city: selectedCity,
      user_area: address,
      user_landmark: landmark,
     }

     const res = await postData('delivery-address',body);
     console.log('Result==',res);
    if(res?.status == 1){
      successToast(res?.message);
    }

     setLoading(false)
  }
 
 
    


  return (
    <RBSheet
      ref={ref}
      //   openDuration={100}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
        },
        draggableIcon: {
          // backgroundColor: textColor,
        },
        container: {
          // backgroundColor: '#fff',
          // borderTopLeftRadius: 25,
          // borderTopRightRadius: 25,
          // alignItems: 'center',
          paddingHorizontal: 20,
          paddingBottom: 20,
          height: Dimensions.get('window').height,
        },
      }}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 30}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.main_container}>
          <View style={{marginTop: 15}}>
            <TextInput
              placeholder="Name"
              theme={theme}
              dense
              style={{height: 50, backgroundColor: Color.white}}
              onChangeText={text => setName(text)}
              value={name}
              mode="outlined"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
          </View>
          <View style={{marginTop: 8}}>
            <TextInput
              placeholder="Mobile"
              theme={theme}
              dense
              keyboardType="phone-pad"
              style={{height: 50, backgroundColor: Color.white}}
              onChangeText={text => setMobile(text)}
              value={mobile}
              mode="outlined"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
          </View>
          <View style={{marginTop: 8}}>
            <TextInput
              placeholder="Email"
              theme={theme}
              dense
              style={{height: 50, backgroundColor: Color.white}}
              onChangeText={text => setEmail(text)}
              value={email}
              keyboardType="email-address"
              mode="outlined"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
          </View>
          <View style={{marginTop: 8}}>
            <TextInput
              placeholder="Landmark"
              theme={theme}
              dense
              style={{height: 50, backgroundColor: Color.white}}
              onChangeText={text => setLandmark(text)}
              value={landmark}
              mode="outlined"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
          </View>
          <View style={{marginTop: 15}}>
            <View
              style={{
              //  borderWidth: 1,
              //  borderRadius: 5,

                marginTop: 5,
                backgroundColor: '#fff',
                //   height: 45,
              }}>
              {/* <Picker
                // mode='dialog'
                style={{
                  color: '#000',
                  height: 50,
                }}
                dropdownIconColor={Color.primary}
                selectedValue={country}
                onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}>
                <Picker.Item
                  color={Color.grey}
                  label="Select Country"
                  value=""
                />
                <Picker.Item label="India" value="India" />
              </Picker> */}
               <SelectDropdown
                data={countryList}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  setIndex(index);
                  setSelectedCountry(selectedItem);
                }}
                defaultButtonText={'Select Country'}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                  return (
                    <FontAwesome
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color={Color.primary}
                      size={12}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                selectedRowStyle={styles.dropdown1SelectedRowStyle}
                // search
                // searchInputStyle={styles.dropdown1searchInputStyleStyle}
                // searchPlaceHolder={'Search here'}
                // searchPlaceHolderColor={'darkgrey'}
                renderSearchInputLeftIcon={() => {
                  return (
                    <FontAwesome name={'search'} color={'#444'} size={18} />
                  );
                }}
              />
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <View
              style={{
                // borderWidth: 1,
                // borderRadius: 5,

                marginTop: 5,
                backgroundColor: '#fff',
                //   height: 45,
              }}>
              {/* <Picker
             // mode='dialog'
              style={{
                color: '#000',
                height:50,
              }}
              dropdownIconColor={Color.primary}
              selectedValue={state}
              onValueChange={(itemValue, itemIndex) => setState(itemValue)}>
              <Picker.Item
                color={Color.grey}
                label="Select State"
                value=""
              />
              <Picker.Item label="India" value="Ashok Nagar" />
            
            </Picker> */}
              <SelectDropdown
                data={category2}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  setIndex(index);
                  setSelectedState(selectedItem);
                }}
                defaultButtonText={'Select State'}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                  return (
                    <FontAwesome
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color={Color.primary}
                      size={12}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                selectedRowStyle={styles.dropdown1SelectedRowStyle}
                search
                searchInputStyle={styles.dropdown1searchInputStyleStyle}
                searchPlaceHolder={'Search here'}
                searchPlaceHolderColor={'darkgrey'}
                renderSearchInputLeftIcon={() => {
                  return (
                    <FontAwesome name={'search'} color={'#444'} size={18} />
                  );
                }}
              />
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <View
              style={{
                // borderWidth: 1,
                // borderRadius: 5,

                marginTop: 5,
                backgroundColor: '#fff',
                //   height: 45,
              }}>
              <SelectDropdown
                data={city}
                onSelect={(selectedItem, index) => {
                  console.log('bwx', selectedItem, index);

                  setSelectedCity(selectedItem);
                }}
                defaultButtonText={'Select City'}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                  return (
                    <FontAwesome
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color={Color.primary}
                      size={12}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                selectedRowStyle={styles.dropdown1SelectedRowStyle}
                search
                searchInputStyle={styles.dropdown1searchInputStyleStyle}
                searchPlaceHolder={'Search here'}
                searchPlaceHolderColor={'darkgrey'}
                renderSearchInputLeftIcon={() => {
                  return (
                    <FontAwesome name={'search'} color={'#444'} size={18} />
                  );
                }}
              />
            </View>
          </View>
          <View style={{marginTop: 8}}>
            <TextInput
              placeholder="Pincode"
              theme={theme}
              dense
              keyboardType='numeric'
              style={{height: 50, backgroundColor: Color.white}}
              onChangeText={text => setPincode(text)}
              value={pincode}
              mode="outlined"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
          </View>
          <View style={{marginTop: 8}}>
            <TextInput
              placeholder="Address"
              theme={theme}
              multiline={true}
              numberOfLines={7}
              dense
              style={{backgroundColor: Color.white}}
              onChangeText={text => setAddress(text)}
              value={address}
              mode="outlined"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
          </View>

          <View style={styles.btn_container}>
            <Button
              mode="contained"
              style={{
                backgroundColor: Color.gray,
                marginTop: 30,
                Color: Color.white,
                // marginBottom: 10,
                borderRadius: 5,
              }}
              onPress={() => props.onClose()}>
              Close
            </Button>
            <Button
            loading={loading}
              mode="contained"
              onPress={() => createAddress()}
              style={{
                backgroundColor: Color.primary,
                marginTop: 30,
                Color: Color.white,
                // marginBottom: 10,
                borderRadius: 5,
              }}>
              Save
            </Button>
          </View>
        </View>
      </ScrollView>
    </RBSheet>
  );
});

const styles = StyleSheet.create({
  main_container: {
    paddingHorizontal: 20,
    borderColor: Color.graylight,
    borderWidth: 1,
    paddingBottom: 30,
    // height: '80%',
  },
  btn_container: {
    width: '70%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dropdown1BtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1SelectedRowStyle: {backgroundColor: 'rgba(0,0,0,0.1)'},
  dropdown1searchInputStyleStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
});
