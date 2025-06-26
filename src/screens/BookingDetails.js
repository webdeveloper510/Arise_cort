import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import CommonHeader from '../components/CommonHeader';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../constant/theme';
import {getAllBookinglist} from '../Apis';
import Colors from '../constant/Colors';
import {showMessage} from 'react-native-flash-message';
import PrimaryButton from '../components/PrimaryButton';
import moment from 'moment';


const BookingsDetailScreen = ({navigation,route}) => {
   const {data}  = route.params
   console.log("🚀 ~ BookingsDetailScreen ~ data:", data)
  const [Bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 

const formatDuration = (timeStr) => {
  const d = moment.duration(timeStr);
  return `${d.hours() ? d.hours() + 'Hour ' : ''}${d.minutes() ? d.minutes() + ' min' : ''}`.trim();
};

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title="booking Details" onBack={() => navigation.goBack()} />
         <Text style={styles.sectionTitle}>Court Details</Text>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{data.court.location.description}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>
          {data.court.location.address_1},{data.court.location.address_2},{data.court.location.address_3}
        </Text>
      </View>

      <View style={styles.divider} />

      {/* Booking Details */}
      <Text style={styles.sectionTitle}>Booking Details</Text>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Court Number</Text>
        <Text style={styles.value}>{data.court.court_number}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{moment(data.booking_date).format('MMMM D, YYYY')}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Time</Text>
        <Text style={styles.value}>{moment(data.start_time, 'HH:mm:ss').format('hh:mm A')} -  {moment(data.end_time, 'HH:mm:ss').format('hh:mm A')}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Duration</Text>
        <Text style={styles.value}>{formatDuration(data.duration_time)}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Booking ID</Text>
        <Text style={styles.value}>{data.booking_id}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Amount Paid</Text>
        <Text style={styles.value}>${data.total_price}</Text>
      </View>
       {/* <View style={{alignSelf: 'center', width: '100%', alignItems: 'center'}}>
        <PrimaryButton
          title="SEND MESSAGE"
          width={'80%'}
          height={60}
        //   onPress={onSubmit}
          isLoading={isLoading}
        />
      </View> */}
    </SafeAreaView>
  );
};

export default BookingsDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F8FE',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0B1B33',
    marginBottom: 12,
    marginTop: 16,
  },
  detailRow: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(79,101,140,0.2)',
    marginVertical: 20,
  },
});
