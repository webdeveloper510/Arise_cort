import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import Colors from '../constant/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import BackButton from '../components/BackButton';
import theme from '../constant/theme';
import CommonInput from '../components/CommonInput';
import PrimaryButton from '../components/PrimaryButton';
import CountryPicker from '../components/CountryPicker';
import {SignUpApi} from '../Apis';
import {showMessage} from 'react-native-flash-message';
const {height, width} = Dimensions.get('window');

const SignupScreen = ({navigation}) => {
  const userTypes = [
    {type: 'Coach', code: '2'},
    {code: '3', type: 'Player'},
  ];
  const [hidePassword, setHidePassword] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [flag, setFlag] = useState(require('../assets/flags/nl.png'));
  const [countryName, setCountryName] = useState('Netherlands');
  const [countryCode, setCountryCode] = useState('31');
  const [selectedType, setSelectedType] = useState('2');
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const onSelect = type => {
    setSelectedType(type);
    setVisible(false);
  };

  const validate = () => {
    let valid = true;
    let tempErrors = {};

    if (!firstName.trim()) {
      tempErrors.firstName = 'First name is required';
      valid = false;
    }

    if (!lastName.trim()) {
      tempErrors.lastName = 'Last name is required';
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      tempErrors.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(email)) {
      tempErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!phone.trim()) {
      tempErrors.phone = 'Phone number is required';
      valid = false;
    }

    if (!password.trim()) {
      tempErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (!confirmPassword.trim()) {
      tempErrors.confirmPassword = 'Confirm Password is required';
      valid = false;
    } else if (confirmPassword !== password) {
      tempErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    if (!selectedType) {
      tempErrors.selectedType = 'User type is required';
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };
 
  const onRegister = async () => {
    if (validate()) {
      try {
        setIsLoading(true);
        let data = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          country: countryName,
          password: password,
          confirm_password: confirmPassword,
          user_type: selectedType,
        };
        const res = await SignUpApi(data);
        if (res.status == '201') {
          setIsLoading(false);
          showMessage({
            message: res.message,
            type: 'success',
          });
          navigation.navigate('OTPVerify',{email:email})
        }
      } catch (error) {
        setIsLoading(false);
        if (error?.response && error?.response.status === 400) {
          const errorMsg = error?.response?.data.message;
          console.log('response=======>',errorMsg);

          if (errorMsg?.email) {
            showMessage({message:errorMsg.email,type:'danger'})
          }

          if (errorMsg?.phone) {
            showMessage({message:errorMsg.phone,type:'danger'})
          }
        }
      }
      // Submit to your API here
    } else {
      console.log('❌ Validation Failed');
    }
  };
 const getTypeByCode = code => {
    const item = userTypes.find(entry => entry.code === code);
    return item ? item.type : null;
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <BackButton navigation={navigation} />
        <Text style={styles.testStyle}>Register</Text>
        <Text style={styles.description}>
          Enter your details to get started.
        </Text>
        <CommonInput
          label="First Name*"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter here...."
        />
        {errors.firstName && (
          <Text style={styles.error}>{errors.firstName}</Text>
        )}
        <CommonInput
          label="Last Name*"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter here...."
        />
        {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
        <CommonInput
          label="Email Address*"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
        <View style={styles.container1}>
          <Text style={styles.label}>Phone Number*</Text>
          <View style={styles.phoneContainer}>
            <TextInput
              style={styles.phoneInput}
              placeholder="Phone Number"
              value={phone}
              keyboardType="phone-pad"
              onChangeText={setPhone}
            />
            <View style={styles.countryCodeBox}>
              <TouchableOpacity
                style={styles.contryCodePicker}
                onPress={() => setModalVisible(true)}>
                <Image source={flag} style={styles.flag} resizeMode="cover" />

                <Text style={styles.countryCode}>+{countryCode}</Text>
              </TouchableOpacity>
              {/* <Text>🇺🇸 +1</Text> */}
            </View>
          </View>
        </View>
        {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
        <CommonInput
          label="Password*"
          value={password}
          onChangeText={setPassword}
          placeholder="********"
          secureTextEntry={hidePassword}
          rightIcon={
            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
              <Image
                source={require('../assets/eye.png')}
                style={{width: 17, height: 16, paddingRight: 10}}
              />
            </TouchableOpacity>
          }
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
        <CommonInput
          label="Confirm Password*"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="********"
          secureTextEntry={hidePassword}
          rightIcon={
            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
              <Image
                source={require('../assets/eye.png')}
                style={{width: 17, height: 16, paddingRight: 10}}
              />
            </TouchableOpacity>
          }
        />
        {errors.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword}</Text>
        )}
        <CommonInput
          label="User Type*"
          //   value={password}
          //   onChangeText={setPassword}
          placeholder={getTypeByCode(selectedType)}
          secureTextEntry={hidePassword}
          isEdit={false}
          rightIcon={
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Image
                resizeMode="contain"
                source={require('../assets/drop.png')}
                style={{width: 15, height: 15, paddingRight: 10}}
              />
            </TouchableOpacity>
          }
        />
        {errors.userType && <Text style={styles.error}>{errors.userType}</Text>}
        <PrimaryButton
          title="Register Now"
          width={'100%'}
          height={60}
          onPress={onRegister}
          isLoading={isLoading}
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonStyle}>Back to Login</Text>
        </TouchableOpacity>
      </View>
      <CountryPicker
        modalVisible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        flag={flag}
        countryName={countryName}
        onPress={(title, flag, code) => {
          console.log('🚀 ~ SignupScreen ~ title:', title);
          setFlag(flag);

          setCountryName(title);
          setCountryCode(code);
          setModalVisible(false);
        }}
      />

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}>
          <View style={styles.dropdownList}>
            {userTypes.map(value => (
              <TouchableOpacity
                key={value.code}
                style={styles.option}
                onPress={() => onSelect(value.code)}>
                <Text style={styles.optionText}>{value.type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#14213D',
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: height * 0.35,
    width: width,
  },
  testStyle: {
    fontSize: 24,
    fontFamily: theme.bold,
  },
  description: {
    fontSize: 13,
    fontFamily: theme.medium,
    color: Colors.secondary,
    paddingBottom: 20,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButtonStyle: {
    color: Colors.primary,
    textAlign: 'center',
    paddingVertical: 15,
    fontFamily: theme.bold,
  },
  container1: {
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    paddingBottom: 5,
  },
  label: {
    fontSize: 14,
    color: Colors.primary,
    // marginBottom: 4,
    fontWeight: '600',
    textAlign: 'left',
    paddingLeft: 15,
    paddingTop: 10,
    fontFamily: theme.medium,
  },
  countryCodeBox: {
    // paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#D9D9D9',
    height: 30,
  },
  phoneInput: {
    width: '75%',
    // flex: 1,
    paddingLeft: 20,
    // paddingTop:10,
    // paddingVertical: 12,
    fontSize: 12,
    color: '#000',
    height: 35,
    backgroundColor: '#fff',
  },
  contryCodePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingLeft: 15,
    borderRadius: 100,
    alignItems: 'center',
  },
  flag: {
    width: 18,
    height: 14,
    marginRight: 10,
  },
  countryCode: {
    color: theme.black,
    fontSize: 12,
    fontFamily: theme.futuraBold,
  },
  value: {
    fontSize: 16,
    color: '#757575',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    elevation: 5,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  error: {
    color: 'red',
    paddingLeft: 5,
    paddingVertical: 10,
  },
});
