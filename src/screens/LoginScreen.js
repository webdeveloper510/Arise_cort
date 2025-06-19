import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import CommonInput from '../components/CommonInput';
import {ScrollView} from 'react-native-gesture-handler';
import BackButton from '../components/BackButton';
import theme from '../constant/theme';
import Colors from '../constant/Colors';
import PrimaryButton from '../components/PrimaryButton';
import CountryPicker from '../components/CountryPicker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SignInApi} from '../Apis'
import { showMessage } from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import { SaveUserInfo } from '../redux/userData';
const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
    const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState('phone');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [flag, setFlag] = useState(require('../assets/flags/nl.png'));
  const [countryName, setCountryName] = useState('Netherlands');
  const [countryCode, setCountryCode] = useState('31');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
      let valid = true;
      let tempErrors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim()) {
        tempErrors.email = 'Email is required';
        valid = false;
      } else if (!emailRegex.test(email)) {
        tempErrors.email = 'Invalid email format';
        valid = false;
      }
  
      if (!password.trim()) {
        tempErrors.password = 'Password is required';
        valid = false;
      } else if (password.length < 6) {
        tempErrors.password = 'Password must be at least 6 characters';
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
            email: email,
            password: password
          };
          const res = await SignInApi(data);
          console.log("🚀 ~ onRegister ~ res:", res)
          if (res.code == '200') {
            console.log("🚀 ~ onRegister ~ res:", res)
            dispatch(SaveUserInfo(res.data));
            setIsLoading(false);
            showMessage({
              message: res.message,
              type: 'success',
            });
            navigation.navigate('MainStack')
          }else{
               setIsLoading(false);
              showMessage({
              message: res.message,
              type: 'danger',
            });
          }
        } catch (error) {
          setIsLoading(false);
          if (error?.response && error?.response.status === 400) {
            console.log('response=======12>',error.response.data.errors);
            const errorMsg = error?.response?.data.errors;
              showMessage({message:errorMsg,type:'danger'})
           
          }
        }
        // Submit to your API here
      } else {
        setIsLoading(false)
        console.log('❌ Validation Failed');
      }
    };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <BackButton navigation={navigation} />

          <Image
            source={require('../assets/login.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Welcome Back To The App</Text>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <View>
              <TouchableOpacity onPress={() => setSelectedTab('email')}>
                <Text
                  style={[
                    styles.tab,
                    selectedTab === 'email' && styles.tabActive,
                  ]}>
                  Email
                </Text>
              </TouchableOpacity>
              {selectedTab === 'email' && (
                <View
                  style={{
                    height: 3,
                    width: 25,
                    backgroundColor: Colors.primary,
                    borderRadius: 10,
                    alignSelf: 'center',
                  }}
                />
              )}
            </View>
            <View>
              <TouchableOpacity onPress={() => setSelectedTab('phone')}>
                <Text
                  style={[
                    styles.tab,
                    selectedTab === 'phone' && styles.tabActive,
                  ]}>
                  Phone Number
                </Text>
              </TouchableOpacity>
              {selectedTab === 'phone' && (
                <View
                  style={{
                    height: 3,
                    width: 25,
                    backgroundColor: Colors.primary,
                    borderRadius: 10,
                    alignSelf: 'center',
                  }}
                />
              )}
            </View>
          </View>

          {/* Input Fields */}
          {selectedTab === 'email' && (
            <>
              <CommonInput
                label="Email*"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
              />
            </>
          )}
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          {selectedTab === 'phone' && (
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
                    <Image
                      source={flag}
                      style={styles.flag}
                      resizeMode="cover"
                    />

                    <Text style={styles.countryCode}>+{countryCode}</Text>
                  </TouchableOpacity>
                  {/* <Text>🇺🇸 +1</Text> */}
                </View>
              </View>
            </View>
          )}

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
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword',{type:selectedTab})}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          <PrimaryButton title="LOGIN" width={'100%'} height={60} onPress={onRegister} isLoading={isLoading} />

          {/* <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity> */}

          <Text style={styles.termsText}>
            By proceeding you also agree to the Terms {'\n'}of Service and
            Privacy Policy
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.createText}>Create an account</Text>
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
            setFlag(flag);
            setCountryName(title);
            setCountryCode(code);
            setModalVisible(false);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#182B4D',
    marginTop: 30,
    fontFamily: theme.bold,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.secondary,
    marginBottom: 20,
    fontFamily: theme.medium,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    marginRight: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#888',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    paddingBottom: 4,
  },
  tabActive: {
    color: '#0066FF',
    // borderBottomColor: '#0066FF',
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
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  forgotText: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    color: '#0066FF',
    fontWeight: '500',
    fontFamily: theme.medium,
  },
  loginBtn: {
    backgroundColor: '#0066FF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  termsText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 17,
  },
  createText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: theme.bold,
  },
  image: {
    width: width * 0.9,
    height: height * 0.45,
    alignSelf: 'center',
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
  container1: {
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    paddingBottom: 5,
  },
    error: {
    color: 'red',
    paddingLeft: 5,
    paddingVertical: 10,
  },
});
