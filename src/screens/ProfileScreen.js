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
import {useSelector, useDispatch} from 'react-redux';
import {SaveUserInfo} from '../redux/userData';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileScreen = ({navigation}) => {
  const {user} = useSelector(state => state.userData);
  const dispatch = useDispatch();
  console.log('🚀 ~ ProfileScreen ~ data:', user);
  const [callingCode, setCallingCode] = useState('1');
  const [withCountryNameButton] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [flag, setFlag] = useState(require('../assets/flags/nl.png'));
  const [countryName, setCountryName] = useState('Netherlands');
  const [countryCode, setCountryCode] = useState('31');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (key, value) => {
    setForm({...form, [key]: value});
  };

const handleButton = async () => {
  try {
    await AsyncStorage.clear();
    dispatch(SaveUserInfo(null));
    navigation.navigate('Login');
  } catch (error) {
    console.log('Logout error:', error);
    showMessage({ message: 'Logout failed. Please try again.', type: 'danger' });
  }
};


  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <View style={{width: '100%', alignItems: 'center', marginVertical: 20}}>
        <Image
          source={require('../assets/profile.png')}
          style={{width: 100, height: 100}}
          resizeMode="contain"
        />
      </View>
      <CommonInput
        label="First Name*"
        value={user?.first_name}
        // onChangeText={setPassword}
        placeholder="Enter here..."
      />
      <View style={{height: 28}} />
      <CommonInput
        label="Last Name*"
        value={user?.last_name}
        // onChangeText={setPassword}
        placeholder="Last Name*"
      />
      <View style={{height: 28}} />
      <CommonInput
        label="Email Address*"
        value={user?.email}
        // onChangeText={setPassword}
        placeholder="dummy221email.@gmail.com"
      />
      <View style={{height: 28}} />
      <View style={styles.container1}>
        <Text style={styles.label}>Phone Number*</Text>
        <View style={styles.phoneContainer}>
          <TextInput
            style={styles.phoneInput}
            placeholder="Phone Number"
            value={user?.phone}
            keyboardType="phone-pad"
            onChangeText={setPhone}
          />
          {/* <View style={styles.countryCodeBox}>
            <TouchableOpacity
              style={styles.contryCodePicker}
              onPress={() => setModalVisible(true)}>
              <Image source={flag} style={styles.flag} resizeMode="cover" />

              <Text style={styles.countryCode}>+{countryCode}</Text>
            </TouchableOpacity>
       
          </View> */}
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleButton}>
        <Text style={{color: 'red'}}>Log Out</Text>
      </TouchableOpacity>
      {/* <View style={styles.container1}>
        <Text style={styles.label}>Message*</Text>
        <TextInput
          style={[styles.input, styles.messageBox]}
          placeholder="Type Here*"
          placeholderTextColor="#999"
          multiline
          numberOfLines={5}
          value={form.message}
          onChangeText={text => handleChange('message', text)}
        />
      </View> */}
      {/* <PrimaryButton
        title="SEND MESSAGE"
        width={'100%'}
        height={60}
        onPress={() => navigation.navigate('MainStack')}
      /> */}

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

export default ProfileScreen;

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
  logoutButton: {
    width: '35%',
    height: 40,
    borderWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: '#0860FB',
    backgroundColor: '#ffffff',
  },
});
