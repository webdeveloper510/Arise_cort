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

export const getTrendOfFollowingApi = async query => {
  try {
    const response = await authApi.get('/customer/trends/following', {
      params: query,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllClientRequest = async query => {
  try {
    const response = await authApi.get('/customer/request');

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteClientRequest = async id => {
  try {
    const response = await authApi.delete('/customer/request/' + id);

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateClientRequest = async (id, data) => {
  try {
    const response = await authApi.put('/customer/request/' + id, data);

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getTrendApByiId = async id => {
  try {
    const response = await axios.get('/customer/trends/' + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getProfessionalById = async query => {
  try {
    const response = await axios.get('/customer/merchant/id', {params: query});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const LikeApi = async id => {
  try {
    const response = await authApi.post('/customer/trends/like/' + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const followApi = async (type, body) => {
  try {
    const response = await authApi.post('/customer/merchant/' + type, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createConversation = async body => {
  try {
    const response = await authApi.post('/customer/conversation', body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async body => {
  try {
    const response = await authApi.post('/customer/message', body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllMessage = async id => {
  try {
    const response = await authApi.get('/customer/message/' + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const followedListApi = async query => {
  try {
    const response = await authApi.get('/customer/merchant/following', {
      params: query,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getConversationList = async query => {
  try {
    const response = await authApi.get('/customer/conversation', {
      params: query,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMerchantConversationList = async query => {
  try {
    const response = await authApi.get('/merchant/conversation', {
      params: query,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteConversation = async id => {
  try {
    const response = await authApi.delete('/merchant/conversation/' + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const editProfile = async data => {
  try {
    const response = await authApi.patch('/customer/profile', data);
    return response.data;
  } catch (error) { 
    throw error;
  }
};

export const getProfile = async token => {
  try {
    const response = token
      ? await axios.get('/customer/profile', {
          headers: {
            'x-access-token': token,
          },
        })
      : authApi.get('/customer/profile');
    return response.data;
  } catch (error) {
    console.log('error========>', error);
    throw error;
  }
};
export const editPassword = async data => {
  try {
    const response = await authApi.patch('/customer/auth/changePassword', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editProfileImage = async data => {
  try {
    const response = await authApi.patch('/customer/profile', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addComment = async data => {
  try {
    const response = await authApi.post('/customer/trends/comment', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const LikeCommentApi = async id => {
  try {
    const response = await authApi.post('/customer/trends/comment/like/' + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const reportApi = async data => {
  try {
    const response = await authApi.post('/customer/report', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getCustomerAllCoupon = async query => {
  try {
    const response = await authApi.get('/customer/coupon', {params: query});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteConversationUser = async id => {
  try {
    const response = await authApi.delete('/customer/conversation/' + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMerchantConversation = async id => {
  try {
    const response = await authApi.delete('/merchant/conversation/' + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const reportApiProfessional = async data => {
  try {
    const response = await authApi.post('/merchant/report', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const reportApiCustomer = async data => {
  try {
    const response = await authApi.post('/customer/report', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addNewRequestApi = async data => {
  try {
    const response = await authApi.post('/customer/request', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const EditNewRequestApi = async (data, id) => {
  try {
    const response = await authApi.put('/customer/request/' + id, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editProfileProfessional = async (data, isEdit) => {
  try {
    if (isEdit) {
      delete data.step;
    }
    const response = await authApi.patch('/merchant/profile', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadAsset = async data => {
  try {
    const response = await axios.post('/guest/asset', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const checkoutApi = async data => {
  try {
    const response = await authApi.post('/customer/cart/checkout', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUnavailableDates = async data => {
  try {
    data.timezoneDifferenceInMs =
      new Date().getTimezoneOffset() * 60 * 1000 * -1;
    data.year = new Date().getFullYear();
    console.log('🚀 ~ getAllUnavailableDates ~ data:', data);
    const response = await authApi.post(
      '/customer/order/getAllUnavailableDates',
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddNewBooking = async data => {
  try {
    const response = await authApi.post('merchant/order/clientOrder', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddServicesApi = async data => {
  try {
    const response = await authApi.post('/merchant/product', data);
    return response.data;
  } catch (error) {
    console.log('error=========server===>', error);
    throw error;
  }
};

export const DeleteServices = async id => {
  try {
    const response = await authApi.delete('/merchant/product/' + id);
    return response.data;
  } catch (error) {
    console.log('error=========server===>', error);
    throw error;
  }
};
export const editService = async (id, data) => {
  try {
    const response = await authApi.patch(`/merchant/product/${id}`, data);

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllServices = async query => {
  try {
    const response = await authApi.get('/merchant/product', {params: query});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBookingApi = async (type, query) => {
  try {
    const response = await authApi.get('/customer/order/' + type, {
      params: query,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllprofessionslServices = async query => {
  try {
    const response = await authApi.get('/customer/merchant/id', {
      params: query,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const cancelBooking = async id => {
  try {
    const response = await authApi.delete('/customer/order/' + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const cancelBookingProfassional = async id => {
  try {
    const response = await authApi.delete('/merchant/order/' + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const rescheduleApi = async data => {
  try {
    const response = await authApi.post('/customer/order/reschedule', data);

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const rateOrderApi = async data => {
  try {
    const response = await authApi.post('/customer/rating', data);

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




















