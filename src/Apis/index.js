import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../constant/url';

let token;

const API_URL = BASE_URL;
// const API_URL = "https://baddie.pro/"
axios.defaults.baseURL = API_URL;
let authApi = axios;

const retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('TOKEN');
    console.log('🚀 ~ _retrieveData= ~ value:', value);
    token = value;
    if (value !== null) {
      // We have data!!
      console.log('🚀 ~ _retrieveData= ~ value:', value);
    }
    authApi = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${value}`,
      },
    });
  } catch (error) {
    console.log('🚀 ~ _retrieveData= ~ error:', error);
  }
};

retrieveData();
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('TOKEN');
    if (value !== null) {
      console.log('🚀 ~ getToken ~ value:', value);
      return value; // Return the token if found
    }
    return null; // Return null if no token is found
  } catch (error) {
    console.error('Error retrieving token from storage:', error);
    return null; // Return null in case of error
  }
};
export const getStipePublishKey = async () => {
  try {
    const response = await axios.get('/stripePublishKey');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const SignInApi = async (data) => {
  try {
    const response = await axios.post('login/', data);
    console.log("🚀 ~ SignInApi ~ response:", response)
    const token = response.data.data
    if(token?.access_token){
    await AsyncStorage.setItem('TOKEN', token.access_token);
    authApi = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });
  }
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const EmailVerifyAPI = async data => {
  try {
    const response = await axios.post('verify-otp/', data);
    console.log("🚀 ~ data:", data)
    return response.data;
  } catch (error) {
    console.log("🚀 ~ error:", error)
    
    throw error;
  }
};



export const SignUpApi = async (data) => {
  try {
    const response = await axios.post('register/', data);
    console.log("🚀 ~ SignUpApi ~ response:", response)
    
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const forgotPasswordApi = async data => {
  try {
    const response = await axios.post('send-reset-email/', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const OtpVerifyApi = async data => {
  try {
    const response = await axios.post('/customer/auth/otpVerify', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const ResetPasswordApi = async data => {
  try {
    const response = await axios.post('reset-password/', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getCourtById = async (page) => {
  try {
    const response = await axios.get(`locations/${page}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllCourts = async (query) => {
  try {
    const response = await axios.get('locations/',{params: query});
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllBookinglist = async data => {
  try {
   
    const response = await authApi.get('court-bookings/');
    return response.data;
  } catch (error) {
    console.log('error============>', error);
    throw error;
  }
};

export const contactUs = async data => {
  try {
    const response = await axios.post('contact-us/', data);
    return response.data;
  } catch (error) {
    console.log('error============>', error);
    throw error;
  }
};


export const courtBooking = async data => {
  try {
    const response = await authApi.post('court-bookings/', data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const courtAvailability = async data => {
  try {
    console.log("🚀 ~ data:", data)
    const response = await authApi.post('check_court_availability/', data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const payDepositcustomer = async data => {
  try {
    const response = await authApi.post('create-checkout-session/', data);

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const confirmDeposit = async data => {
  try {
    const response = await authApi.post('payment-success/', data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async(param) => {
  try {
     console.log("authApi=====>",param)
    const response = await axios.get('profile/',{
      headers: {
        Authorization: `Bearer ${param}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};






























