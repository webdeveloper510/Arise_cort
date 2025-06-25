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
const bookings = [
  {
    id: '1',
    title: 'Barrie North Winter Tennis',
    date: 'August 29, 2026',
    bookingId: '#32144569870',
  },
  {
    id: '2',
    title: 'Dill Dinkers North Bethesda',
    date: 'August 29, 2026',
    bookingId: '#32144569870',
  },
  {
    id: '3',
    title: 'North American Tennis League...',
    date: 'August 29, 2026',
    bookingId: '#32144569870',
  },
  {
    id: '4',
    title: 'North Epping Rangers',
    date: 'August 29, 2026',
    bookingId: '#32144569870',
  },
  {
    id: '5',
    title: 'Barrie North Winter Tennis',
    date: 'August 29, 2026',
    bookingId: '#32144569870',
  },
  {
    id: '6',
    title: 'Dill Dinkers North Bethesda',
    date: 'August 29, 2026',
    bookingId: '#32144569870',
  },
  {
    id: '7',
    title: 'North American Tennis League...',
    date: 'August 29, 2026',
    bookingId: '#32144569870',
  },
  {
    id: '8',
    title: 'Dill Dinkers North Bethesda',
    date: 'August 29, 2026',
    bookingId: '#32144569870',
  },
  {
    id: '9',
    title: 'North American Tennis League...',
    date: 'August 29, 2026',
    bookingId: '#32144569870',
  },
];

const MyBookingsScreen = ({navigation}) => {
  const [Bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getlistData();
  }, []);

  const getlistData = async () => {
    try {
      setIsLoading(true);
      let res = await getAllBookinglist();
      console.log('🚀 ~ getlistData ~ res:1222@@@3', res.results);
      // setBookings(res.results)
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('🚀 ~ getlistData ~ error:', error.response);
      showMessage({
        message: error.response.data.detail,
        type: 'danger',
      });
    }
  };
  const BookingCard = ({item}) => {
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={{flex: 1}}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={[styles.infoRow1]}>
                <Text style={styles.label}>Date</Text>
                <Text style={styles.value}>{item.date}</Text>
              </View>
              {/* <View style={{width:1,height:10,backgroundColor:'#4F658C'}}/> */}
              <View style={styles.infoRow}>
                <Text style={styles.label}>Booking ID</Text>
                <Text style={styles.value}>{item.bookingId}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={()=> navigation.navigate('BookingDetail')}>
          <Feather name="chevron-right" size={20} color="#0066FF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title="My Bookings" onBack={() => navigation.goBack()} />
      {isLoading ? (
        <ActivityIndicator color={Colors.primary} size={'small'} />
      ) : (
        <FlatList
          data={bookings}
          renderItem={({item}) => <BookingCard item={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default MyBookingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F8FE',
  },
  back: {
    color: '#2D62EC',
    marginBottom: 10,
    fontSize: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'center',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 14,
    color: '#182B4D',
    marginBottom: 4,
    fontFamily: theme.bold,
  },
  subtitle: {
    fontSize: 10,
    color: '#707C90',
    fontFamily: theme.medium,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoRow1: {
    width: '40%',
    // justifyContent: 'space-between',
    // backgroundColor:'red',
    borderRightWidth: 2,
    borderColor: 'rgba(79, 101, 140, 0.2)',
  },
  infoRow: {
    width: '50%',
    // justifyContent: 'space-between',
    // backgroundColor:'red',
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
  },
  value: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1F2937',
    marginTop: 2,
  },
});
