import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import CommonInput from '../components/CommonInput';
import Colors from '../constant/Colors';
import theme from '../constant/theme';
import CountryPicker from '../components/CountryPicker';
import PrimaryButton from '../components/PrimaryButton';
import {contactUs} from '../Apis';
import {showMessage} from 'react-native-flash-message';
const ContactUsScreen = ({navigation}) => {
  const [callingCode, setCallingCode] = useState('1');
  const [withCountryNameButton] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [flag, setFlag] = useState(require('../assets/flags/nl.png'));
  const [countryName, setCountryName] = useState('Netherlands');
  const [countryCode, setCountryCode] = useState('31');
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (key, value) => {
    setForm({...form, [key]: value});
  };
  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!form.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (validate()) {
      try {
        setIsLoading(true);
        const data = {
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone: form.phone,
          message: form.message,
        };
        const res = await contactUs(data);
        console.log('🚀 ~ onSubmit ~ res:', res);
        if (res.code == '400') {
          showMessage({message: res.message, type: 'danger'});
          setIsLoading(false);
        } else {
              navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
          showMessage({message: res.message, type: 'success'});
          setIsLoading(false);
        }
      } catch (error) {
        console.log('🚀 ~ onSubmit ~ error:', error);
        setIsLoading(false);
        if (error?.response?.status === 400) {
          const errorMsg = error?.response?.data?.message;
          if (errorMsg?.email)
            showMessage({message: errorMsg.email, type: 'danger'});
          if (errorMsg?.phone)
            showMessage({message: errorMsg.phone, type: 'danger'});
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      console.log('❌ Validation Failed');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Contact Us</Text>

      <CommonInput
        label="First Name*"
        value={form.firstName}
        onChangeText={text => handleChange('firstName', text)}
        placeholder="Enter here..."
      />
      {errors.firstName ? (
        <Text style={styles.error}>{errors.firstName}</Text>
      ) : (
        <View style={{height: 28}} />
      )}
      <CommonInput
        label="Last Name*"
        value={form.lastName}
        onChangeText={text => handleChange('lastName', text)}
        placeholder="Last Name*"
      />
      {errors.lastName ? (
        <Text style={styles.error}>{errors.lastName}</Text>
      ) : (
        <View style={{height: 28}} />
      )}
      <CommonInput
        label="Email Address*"
        value={form.email}
        onChangeText={text => handleChange('email', text)}
        placeholder="dummy221email.@gmail.com"
      />
      {errors.email ? (
        <Text style={styles.error}>{errors.email}</Text>
      ) : (
        <View style={{height: 28}} />
      )}
      <View style={styles.container1}>
        <Text style={styles.label}>Phone Number*</Text>
        <View style={styles.phoneContainer}>
          <TextInput
            style={styles.phoneInput}
            placeholder="Phone Number"
            value={form.phone}
            keyboardType="phone-pad"
            onChangeText={text => handleChange('phone', text)}
          />
          <View style={styles.countryCodeBox}>
            <TouchableOpacity
              style={styles.contryCodePicker}
              onPress={() => setModalVisible(true)}>
              <Image source={flag} style={styles.flag} resizeMode="cover" />

              <Text style={styles.countryCode}>+{countryCode}</Text>
              <Image
                source={require('../assets/drop.png')}
                style={{width: 10, height: 10}}
                resizeMode="contain"
              />
            </TouchableOpacity>
            {/* <Text>🇺🇸 +1</Text> */}
          </View>
        </View>
      </View>
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
      <View style={styles.container1}>
        <Text style={styles.label}>Message*</Text>
        <TextInput
          style={[styles.input, styles.messageBox]}
          placeholder="Type Here*"
          placeholderTextColor="#EBEBEB"
          multiline
          numberOfLines={5}
          value={form.message}
          maxLength={100}
          onChangeText={text => handleChange('message', text)}
        />
      </View>
      {errors.message && <Text style={styles.error}>{errors.message}</Text>}
      <View style={{alignSelf: 'center', width: '100%', alignItems: 'center'}}>
        <PrimaryButton
          title="SEND MESSAGE"
          width={'80%'}
          height={60}
          onPress={onSubmit}
          isLoading={isLoading}
        />
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
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F4F8FE',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: '#000',
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
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#000',
    marginBottom: 30,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 30,
  },
  messageBox: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#0066FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  container1: {
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    paddingBottom: 5,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  countryCodeBox: {
    // paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#D9D9D9',
    height: 30,
    position: 'absolute',
    right: 10,
    top: -9,
  },
  phoneInput: {
    width: '75%',
    // flex: 1,
    paddingLeft: 20,
    // paddingTop:10,
    // paddingVertical: 12,
    fontSize: 12,
    color: Colors.secondary,
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
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 10,
     paddingTop:5
  },
});
