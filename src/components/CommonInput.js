import React from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';
import Colors from '../constant/Colors';
import theme from '../constant/theme';

const CommonInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  rightIcon,
  isEdit
}) => {
  return (
    <View style={styles.container1}>
      <Text style={styles.label}>{label}</Text>
       <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={"#707C90"}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          editable={isEdit}
          maxLength={30}
        />
        {rightIcon}
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
     container1: {
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    paddingBottom: 5,
  },
  container: {
    // marginBottom: 16,
    // borderWidth: 1,
    // borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    alignItems: 'center',
    // paddingBottom: 5,
  },
  label: {
    fontSize: 14,
    color: Colors.primary,
    // marginBottom: 4,
    // fontWeight: '600',
    textAlign:'left',
    paddingLeft:15,
    paddingTop:10,
    fontFamily:theme.bold
  },
  inputWrapper: {
    backgroundColor: '#fff',
    width: '98%',
    // paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width:'91%',
    // flex: 1,
    paddingLeft:13,
    // paddingTop:10,
    // paddingVertical: 12,
    fontSize: 15,
    color:Colors.secondary,
    height:37,
  },
});

export default CommonInput;
