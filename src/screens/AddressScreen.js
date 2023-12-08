import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'



const AddressScreen = ({navigation}) => {
  const [user,setUser] = React.useState(null);
  const [name,setName] = React.useState('');
  const [phone,setPhone] = React.useState('');
  const [id,setId] = React.useState('');
  const [email,setEmail] = React.useState('');
  const [address,setAddress] = React.useState('');
  const [city,setCity] = React.useState('');
  const [state,setstate] = React.useState('');
  const [zip,setZip] = React.useState('');
  const [emailError,setEmailError] = React.useState('');
  const [addressError,setAddressError] = React.useState('');
  const [cityError,setCityError] = React.useState('');
  const [zipError,setZipError] = React.useState('');
  const [token,setToken] = React.useState('');
  const [loading,setLoading] = React.useState(false);
  
  return (
    <View style={styles.container}>
    <View style={styles.box1}>
      
      {user !== null ? (
        <ScrollView
          style={{padding: 20, paddingRight: 20}}
          contentContainerStyle={styles.scrollview}
          onContentSizeChange={this.onContentSizeChange}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}>
          <UserInput
            placeholder={Strings.nameHint}
            value={this.state.name}
            errorMessage={this.state.nameErrorMessage}
            maxLength={50}
            editable={false}
          />
          <UserInput
            placeholder={Strings.mobileHint}
            value={this.state.phone}
            maxLength={50}
            editable={false}
          />
          <UserInput
            placeholder={Strings.emailHint}
            value={email}
            error={emailError}
            // onChangeText={email => {
            //   this.setState({
            //     email,
            //   });
            // }}
            onChangeText={(email) => setEmail(email)}
          />
          <UserInput
            placeholder={Strings.addressHint}
            errorMessage={addressError}
            value={address}
            error={addressError}
            onChangeText={(address) => setAddress(address)}
          />
          <UserInput
            placeholder={Strings.stateHint}
            errorMessage={this.state.stateError}
            value={state}
            error={stateError}
            onChangeText={(state) => setstate(state)}
          />
          <UserInput
            placeholder={Strings.cityHint}
            errorMessage={this.state.cityError}
            value={city}
            error={cityError}
            onChangeText={(city) => setstate(city)}
          />
          <UserInput
            placeholder={Strings.zipHint}
            errorMessage={this.state.zipError}
            value={zip}
            maxLength={6}
            error={zipError}
            onChangeText={(zip) => setstate(zip)}
          />
          <View style={{marginTop: 20}}>
            <LoadingButton
              title={Strings.save}
              loading={loading}
              // onPress={() => {
              //   this.updateAddress();
              // }}
            />
          </View>
        </ScrollView>
      ) : null}
    </View>
  </View>
  )
}

export default AddressScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  box1: {
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    fontSize: 18,
    color: Color.textColor,
  },
  title: {
    fontSize: 16,
    color: Color.black,
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 5,
  },

  addContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
})