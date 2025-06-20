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
    const token = response.data.data
    console.log("🚀 ~ SignInApi ~ response:", token.access_token)
    await AsyncStorage.setItem('TOKEN', token.access_token);
    authApi = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });
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
export const getAllCourts = async () => {
  try {
    const response = await axios.get('locations/');
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllBookinglist = async data => {
  try {
    console.log("authApi=====>",authApi)
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
    const response = await authApi.post('/customer/cart/payDeposit', data);

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const confirmDeposit = async data => {
  try {
    const response = await authApi.post('/customer/cart/confirmDeposit', data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRetings = async query => {
  try {
    const response = await axios.get('/customer/rating', {params: query});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBookingTimeSlot = async data => {
  try {
    data.timezoneDifferenceInMs =
      new Date().getTimezoneOffset() * 60 * 1000 * -1;

    const response = await authApi.post(
      '/customer/order/getAllApointments',
      data,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfessionalBookingApi = async query => {
  try {
    console.log("🚀 ~ query:", query)
    
    const response = await authApi.get('/merchant/order', {params: query});
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getProfessionalTransactionApi = async query => {
  try {
    const response = await authApi.get('/merchant/transaction', {
      params: query,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCoupon = async query => {
  try {
    const response = await authApi.get('/merchant/coupon');

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCoupon = async data => {
  try {
    const response = await authApi.post('/merchant/coupon', data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const customerFormAnswer = async data => {
  try {
    const response = await authApi.post('/customer/formAnswer', data);

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const editCoupon = async (id, data) => {
  try {
    const response = await authApi.put(`/merchant/coupon/${id}`, data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addAutoMessage = async data => {
  try {
    const response = await authApi.post('/merchant/autoMessage', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAutoMessageApi = async () => {
  try {
    const response = await authApi.get('/merchant/autoMessage');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletecoupan = async id => {
  try {
    const response = await authApi.delete('/merchant/coupon/' + id);
  } catch (error) {
    throw error;
  }
};
export const deleteAutoMessageApi = async id => {
  try {
    const response = await authApi.delete('/merchant/autoMessage/' + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateAutoMessage = async (id, data) => {
  try {
    const response = await authApi.put('/merchant/autoMessage/' + id, data);

    return response.data;
  } catch (error) {
    throw error;
  }
};




















