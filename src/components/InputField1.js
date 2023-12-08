import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
//import {Color, Fonts} from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color,Fonts } from '../theme';



export default function InputField1({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  onChangeText,
  value,
  editable,
  secure,
  setSecure,
  maxLength
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#111',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {inputType == 'password' ? (
        <View
          style={{
            flex: 1,
            paddingVertical: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TextInput
            placeholder={label}
            placeholderTextColor="#111"
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            editable={editable}
            value={value}
            style={{
              color: '#111',
              paddingVertical: 0,
              flex: 1,
              fontFamily: Fonts.primaryRegular,
            }}
            secureTextEntry={secure}
          />
          <TouchableOpacity onPress={() => setSecure(prev => !prev)}>
            <MaterialCommunityIcons
              name={secure ? 'eye-off' : 'eye'}
              color={'#111'}
              size={23}
              style={{
                paddingHorizontal: 15,
              }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <TextInput
          placeholder={label}
          editable={editable}
          placeholderTextColor="#111"
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          maxLength={maxLength}
          value={value}
          style={{
            flex: 1,
            paddingVertical: 0,
            color: '#111',
            fontFamily: Fonts.primaryRegular,
            fontSize:19
          }}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text
          style={{
            color: Color.black,
            fontWeight: '700',
            fontFamily: Fonts.primaryBold,
            
          }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
