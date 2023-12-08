import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {Fonts} from '../theme';
import {Divider} from 'react-native-paper';
import DropdownComponent from '../components/DropdownComponent';
import {RadioButton} from 'react-native-paper';
//import DownSlide from '../components/DownSlide';
import {Color} from '../theme';
// import ModalDialog from '../components/ModalDialog';
const UseraddScreen = () => {
  const [name, setName] = React.useState('');
  const [mn, setMN] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [pincode, setPincode] = React.useState('');
  const [state, setState] = React.useState('');
  const [city, setCity] = React.useState('');
  const [locality, setLocality] = React.useState('');
  const [landmark, setLandmark] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [officeradio, setOfficeradio] = React.useState(false);
  const [checkedHome, setCheckedHome ] = React.useState('first');
  
  return (
    <View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text style={styles.catTitle}>Add New Address</Text>
      </View>

      <View style={styles.textfield}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          //  label="Name"
          // value={text}
          mode={'outlined'}
          activeOutlineColor={'#1be6db'}
          outlineColor={'#bdc3c7'}
          // onChangeText={(text) => setText(text)}
          style={styles.textfield}
          left={<TextInput.Icon icon="account" iconColor="#bdc3c7" />}
        />
      </View>

      <View style={styles.textfield}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          //  label="Mobile Number"
          // value={text}
          mode={'outlined'}
          activeOutlineColor={'#1be6db'}
          outlineColor={'#bdc3c7'}
          // onChangeText={(text) => setText(text)}
          style={styles.textfield}
          left={<TextInput.Icon icon="phone" iconColor="#bdc3c7" />}
        />
      </View>

      <View style={styles.textfield}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          //  label="Email"
          // value={text}
          placeholderTextColor="#bdc3c7"
          mode={'outlined'}
          activeOutlineColor={'#1be6db'}
          outlineColor={'#bdc3c7'}
          // onChangeText={(text) => setText(text)}
          style={styles.textfield}
          left={<TextInput.Icon icon="email" iconColor="#bdc3c7" />}
        />
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: '#bdc3c7',
          marginTop: 15,
          marginBottom: 13,
        }}></View>

      <View style={styles.flexitem}>
        <View style={{width: 170}}>
          <Text style={styles.label}>Country*</Text>

          {/* <DownSlide /> */}
          {/* <TextInput
     
    //  label="Country"
     value={text}
mode={'outlined'}
activeOutlineColor={'#1be6db'} 
outlineColor={'#bdc3c7'}
// ={'#bdc3c7'}
  onChangeText={text => setText(text)}
  style={styles.textfield}
  left={<TextInput.Icon icon="earth"  iconColor='#bdc3c7'/>}


   /> */}
        </View>

        <View style={{width: 178}}>
          <Text style={styles.label}>Pincode*</Text>
          <TextInput
            //  label="Country"
            // value={text}
            mode={'outlined'}
            activeOutlineColor={'#1be6db'}
            outlineColor={'#bdc3c7'}
            // ={'#bdc3c7'}
            // onChangeText={(text) => setText(text)}
            style={styles.textfield}
            left={<TextInput.Icon icon="code-brackets" iconColor="#bdc3c7" />}
          />
        </View>
      </View>

      <View style={styles.flexitem}>
        <View style={{width: 170}}>
          <Text style={styles.label}>State*</Text>
          <TextInput
            //  label="Country"
            // value={text}
            mode={'outlined'}
            activeOutlineColor={'#1be6db'}
            outlineColor={'#bdc3c7'}
            // ={'#bdc3c7'}
            // onChangeText={(text) => setText(text)}
            style={styles.textfield}
            left={<TextInput.Icon icon="navigation" iconColor="#bdc3c7" />}
          />
        </View>

        <View style={{width: 178}}>
          <Text style={styles.label}>City/District*</Text>
          <TextInput
            //  label="Country"
            // value={text}
            mode={'outlined'}
            activeOutlineColor={'#1be6db'}
            outlineColor={'#bdc3c7'}
            // ={'#bdc3c7'}
            // onChangeText={(text) => setText(text)}
            style={styles.textfield}
            left={<TextInput.Icon icon="city-variant" iconColor="#bdc3c7" />}
          />
        </View>
      </View>

      <View style={styles.textfield}>
        <Text style={styles.label}>Locality/Town*</Text>

        <DropdownComponent />
      </View>
      <View style={styles.textfield}>
        <Text style={styles.label}>Locality/Town*</Text>
        <TextInput
          //  label="Email"
          // value={text}
          placeholderTextColor="#bdc3c7"
          mode={'outlined'}
          activeOutlineColor={'#1be6db'}
          outlineColor={'#bdc3c7'}
          // onChangeText={(text) => setText(text)}
          style={styles.textfield}
          left={<TextInput.Icon icon="office-building" iconColor="#bdc3c7" />}
        />
      </View>

      <View style={styles.textfield}>
        <Text style={styles.label}>Landmark*</Text>
        <TextInput
          //  label="Email"
          // value={text}
          placeholderTextColor="#bdc3c7"
          mode={'outlined'}
          activeOutlineColor={'#1be6db'}
          outlineColor={'#bdc3c7'}
          // onChangeText={(text) => setText(text)}
          style={styles.textfield}
          left={<TextInput.Icon icon="domain" iconColor="#bdc3c7" />}
        />
      </View>

      <View style={styles.textfield}>
        <Text style={styles.label}>
          Address (House No./Building/Street/Area)*
        </Text>
        <TextInput
          //  label="Email"
          // value={text}
          placeholderTextColor="#bdc3c7"
          mode={'outlined'}
          multiline={true}
          numberOfLines={5}
          activeOutlineColor={'#1be6db'}
          outlineColor={'#bdc3c7'}
          // onChangeText={(text) => setText(text)}
          style={styles.textfield}
          left={<TextInput.Icon icon="map-marker" iconColor="#bdc3c7" />}
        />
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: '#bdc3c7',
          marginTop: 15,
          marginBottom: 12,
        }}></View>

      <View style={{marginBottom: 12}}>
        <Text style={styles.label}>Address Type*</Text>
      </View>
      <View style={styles.flexitem}>
        <View
          style={{
            width: 200,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <RadioButton
            color="#1be6db"
            uncheckedColor="#bdc3c7"
            value="second"
            // status={checked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('second')}
          />
          <Text style={styles.label}>Home</Text>
        </View>

        <View
          style={{
            width: 200,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <RadioButton
            color="#1be6db"
            uncheckedColor="#bdc3c7"
            value="first"
            // status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setOfficeradio(!officeradio)}
          />
          <Text style={styles.label}>Office</Text>
        </View>
      </View>




      {!officeradio?  <View style={styles.flexitem}>
        <View
          style={{
            width: 200,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <RadioButton
            color="#1be6db"
            uncheckedColor="#bdc3c7"
            value="second"
            // status={checked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('second')}
          />
          <Text style={styles.label}>Home</Text>
        </View>

        <View
          style={{
            width: 200,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <RadioButton
            color="#1be6db"
            uncheckedColor="#bdc3c7"
            value="first"
            // status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('first')}
          />
          <Text style={styles.label}>Office</Text>
        </View>
      </View>:null}

      <View
        style={{
          height: 1,
          backgroundColor: '#bdc3c7',
          marginTop: 15,
          marginBottom: 12,
        }}></View>

      <View>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton
            color="#1be6db"
            uncheckedColor="#bdc3c7"
            value="first"
            // status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('first')}
          />
          <Text> Make this as my Default Address</Text>
        </View>

        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton
            color="#1be6db"
            uncheckedColor="#bdc3c7"
            value="second"
            // status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('first')}
          />
          <Text> Shipping Address is same as Billing Address</Text>
        </View>
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: '#bdc3c7',
          marginTop: 15,
          marginBottom: 12,
        }}></View>

      <TouchableOpacity>
        <View style={styles.addToCart}>
          <Text style={styles.addToCartText}>Save</Text>
        </View>
      </TouchableOpacity>

     
    </View>
  );
};

const styles = StyleSheet.create({
  catTitle: {
    fontFamily: Fonts.primarySemiBold,
    color: '#000',
    fontSize: 21,
    marginLeft: 2,
    paddingBottom: 12,
  },
  label: {
    fontFamily: Fonts.primarySemiBold,
    color: '#000',
    fontSize: 13,
    marginLeft: 2,
    marginBottom: -8,
  },
  textfield: {
    // backgroundColor:"#bdc3c7",
    marginTop: 3,
    color: '#bdc3c7',
    fontFamily: Fonts.primarySemiBold,
    marginBottom: 8,
  },
  flexitem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  addToCartText: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 2,
    paddingRight: 15,
    color: '#fff',
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCart: {
    flexWrap: 'nowrap',
    backgroundColor: Color.primary,
    color: '#fff',
    textAlign: 'center',
    borderRadius: 20,
    // width: 160,
    marginTop: 10,
    padding: 4,
    justifyContent: 'center',
    fontWeight: 'bold',
    paddingLeft: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
      marginLeft: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default UseraddScreen;
