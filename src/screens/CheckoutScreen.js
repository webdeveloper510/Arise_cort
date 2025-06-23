import React,{useEffect,useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CommonHeader from '../components/CommonHeader';
import theme from '../constant/theme';
import Colors from '../constant/Colors';
import moment from 'moment';
import {useStripe} from '@stripe/stripe-react-native';
import {payDepositcustomer, confirmDeposit} from '../Apis';
import PrimaryButton from '../components/PrimaryButton';
import { showMessage } from 'react-native-flash-message';
const CheckoutScreen = ({navigation, route}) => {
  const {data} = route.params;
  const {confirmPayment} = useStripe();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [isLoading,setIsLoading] = useState(false)
  const [intentId,setClientSecret] = useState('')
  console.log('🚀 ~ CheckoutScreen ~ data:', data);

  useEffect(() => {
    if (data) {
      fetchPaymentIntentClientSecret(data?.booking_id);
    }
  }, [data]);

  const fetchPaymentIntentClientSecret = async val => {
    try {
      let body = {
        booking_id: val,
      };
      console.log('🚀 ~ fetchPaymentIntentClientSecret ~ body:', body);
      const res = await payDepositcustomer(body);
      console.log('🚀 ~ fetchPaymentIntentClientSecret ~ data:', res);
      setClientSecret(res?.client_secret)
      initializePaymentSheet(res?.client_secret);
    } catch (error) {
      console.log('pay deposit error=====>', error);
    }
  };

  const initializePaymentSheet = async paymentIntent => {
    const {error} = await initPaymentSheet({
      merchantDisplayName: 'AriseCourt',
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: false,
      // defaultBillingDetails: {
      //   name: 'Jane Doe',
      // },
      // returnURL: 'https://api.wiwiriapp.com/stripe',
    });
    console.log('error data of payment ======>', error.response);
  };

  const openPaymentSheet = async () => {
    console.log("$$$$$$$$$$$$$$$$$$$$$$======>")
    const {error} = await presentPaymentSheet();
    console.log("################======>",error)
    if (error) {
      showMessage({message: error.code, type: error.message});
      console.log('error payment $$$$====>', error);
    } else {
      console.log('🚀 ~ openPaymentSheet ~ confirmPaymentData:');
      await confirmPaymentData();
      navigation.navigate('Home');
      showMessage({message: 'Your Booking is confirmed!', type: 'success'});
    }
  };

  const confirmPaymentData = async () => {
    try {
      let body = {
        payment_intent_id:intentId,
      };
      console.log('🚀 ~ confirmPaymentData ~ body:', body);
      const data = await confirmDeposit(body);
      console.log('🚀 ~ confirmPaymentData ~ data:', data);
    } catch (error) {
      console.log('error data======>', error.response);
    }
  };
  const start = moment(data?.start_time, 'HH:mm:ss').format('h:mm A');
  const end = moment(data?.end_time, 'HH:mm:ss').format('h:mm A');

  const timeRange = `${start} - ${end}`;
  const momentDuration = moment.duration(data?.duration_time);

  const hours = momentDuration.hours();
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 40}}>
      <CommonHeader title="Checkout" onBack={() => navigation.goBack()} />
      {/* My Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Details</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>
            {data?.user.first_name} {data?.user.last_name}
          </Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{data?.user.phone}</Text>
        </View>
        <Text style={[styles.label, {marginTop: 10}]}>email</Text>
        <Text style={styles.value}>{data?.user.email}</Text>
      </View>
      <View
        style={{
          height: 1,
          width: '90%',
          alignSelf: 'center',
          marginVertical: 10,
          backgroundColor: '#95ACFF4D',
        }}
      />
      {/* Court Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Court Details</Text>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{data?.court?.location?.description}</Text>
        <Text style={[styles.label, {marginTop: 10}]}>Location</Text>
        <Text style={styles.value}>
          {data?.court?.location?.address_1},{data?.court?.location?.address_2},
          {data?.court?.location?.address_3}
        </Text>
      </View>
      <View
        style={{
          height: 1,
          width: '90%',
          alignSelf: 'center',
          marginVertical: 10,
          backgroundColor: '#95ACFF4D',
        }}
      />

      {/* Booking Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Booking Details</Text>
        {[
          ['Court Number', `Court No. ${data?.court.court_number}`],
          ['Date', `${data?.booking_date}`],
          ['Time', `${timeRange}`],
          ['Duration', `${hours} Hour`],
          ['Booking ID', `${data?.booking_id}`],
        ].map(([key, val]) => (
          <View style={styles.rowBetween} key={key}>
            <Text style={styles.label}>{key}</Text>
            <Text style={styles.value}>{val}</Text>
          </View>
        ))}
      </View>
      <View
        style={{
          height: 1,
          width: '90%',
          alignSelf: 'center',
          marginVertical: 10,
          backgroundColor: '#95ACFF4D',
        }}
      />

      {/* Payment Method */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentMethod}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/196/196566.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.value}>Paypal</Text>
          <View style={styles.radioSelected} />
        </View>
      </View>

      {/* Payment Summary */}
      <View style={styles.section21}>
        <View
          style={[
            styles.section,
            {backgroundColor: '#ffffff', width: '90%', alignSelf: 'center'},
          ]}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          {[
            ['Amount', `$ ${data?.court.court_fee_hrs}`],
            ['Tax', `$ ${data?.court.tax}`],
            ['Summary', `$ ${data?.summary}`],
          ].map(([label, value]) => (
            <View style={styles.rowBetween} key={label}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
        </View>
        {/* <TouchableOpacity style={styles.payBtn} onPress={openPaymentSheet}>
          <Text style={styles.payText}>CONFIRM & PAY NOW</Text>
        </TouchableOpacity> */}
        <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <PrimaryButton
          title={"CONFIRM & PAY NOW"}
          onPress={openPaymentSheet}
          isLoading={isLoading}
          width={'70%'}
        />
        </View>
        <View style={{height: 100}} />
      </View>

      {/* Confirm Button */}
    </ScrollView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  backText: {
    color: '#0066FF',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 20,
    color: '#000',
  },
  section: {
    backgroundColor: '#F5F9FF',
    padding: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: theme.bold,
    color: '#182B4D',
    marginBottom: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: {
    color: '#999',
    fontSize: 14,
    fontFamily: theme.medium,
  },
  value: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    padding: 5,
    borderColor: '#D8E2FE',
    borderRadius: 15,
    backgroundColor: Colors.white,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  radioSelected: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#0066FF',
    marginLeft: 'auto',
    marginRight: 10,
  },
  payBtn: {
    backgroundColor: '#0066FF',
    margin: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  section21: {
    borderTopWidth: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: '#D8E2FE',
    overflow: 'hidden',
    // elevation: 2,
  },
});
