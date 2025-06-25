import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import theme from '../constant/theme';
import Colors from '../constant/Colors';
import BackButton from '../components/BackButton';
import PrimaryButton from '../components/PrimaryButton';
import CountryPicker from '../components/CountryPicker';
import CommonInput from '../components/CommonInput';
import { showMessage } from 'react-native-flash-message';
import { forgotPasswordApi } from '../Apis';
const {height, width} = Dimensions.get('window');

const ForgotScreen = ({navigation, route}) => {
  const {type} = route.params;
  console.log('🚀 ~ ForgotScreen ~ route:', type);
  const [modalVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [flag, setFlag] = useState(require('../assets/flags/nl.png'));
  const [countryName, setCountryName] = useState('Netherlands');
  const [countryCode, setCountryCode] = useState('31');
  const [email,setEmail] = useState('');
  const [isLoading,setIsLoading] = useState(false)
  const handleSubmit = async () => {
  // Email validation

  if (!email || email.trim() === '') {
    showMessage({message: 'Email is required', type: 'danger'});
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showMessage({message: 'Enter a valid email address', type: 'danger'});
    return;
  }

  try {
    setIsLoading(true);
    let body = {
      email: email
    };
    const res = await forgotPasswordApi(body);
    console.log('🚀 ~ handleSubmit ~ res:', res);
    if(res.code == '400'){
      showMessage({message:res.message,type:'danger'})
    setIsLoading(false);
    }else{

      navigation.navigate('OTPVerify',{email:email})
      setIsLoading(false);
    }
  } catch (error) {
    console.log('🚀 ~ handleSubmit ~ error:', error.response);
    setIsLoading(false);
    if (error?.response && error?.response.status === 400) {
      const errorMsg = error?.response.data.message;
      console.log('🚀 ~ handleSubmit ~ errorMsg:', errorMsg);
      showMessage({message: errorMsg, type: 'danger'});
    }
  }
};

  return (
    <ScrollView style={{flex:1,backgroundColor:Colors.background}}>
    <View style={styles.container}>
      <BackButton navigation={navigation} />

      <Image
        source={require('../assets/forgot.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{height: 60}} />
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        {type == 'email'
          ? 'Enter Your Email To Get OTP'
          : 'Enter Your Phone To Get OTP'}
      </Text>
      {type == 'email' ? (
        <CommonInput
          label="Email Address*"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
        />
      ) : (
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
      )}
      <PrimaryButton
        title="Reset Password"
        width={'100%'}
        height={60}
        onPress={handleSubmit}
        isLoading={isLoading}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backToLogin}>Back to Login</Text>
      </TouchableOpacity>
      <CountryPicker
        modalVisible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        flag={flag}
        countryName={countryName}
        onPress={(title, flag, code) => {
          setFlag(flag);
          setCountryName(title);
          setCountryCode(code);
          setModalVisible(false);
        }}
      />
    </View>
    </ScrollView>
  );
};

export default ForgotScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: Colors.background,
  },
  backText: {
    color: Colors.primary,
    marginBottom: 20,
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    // textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    // textAlign: 'center',
    marginVertical: 10,
  },
  backToLogin: {
    marginTop: 20,
    textAlign: 'center',
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
});
