import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import CommonHeader from '../components/CommonHeader';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../constant/theme';
const bookings = [
  { id: '1', title: 'Barrie North Winter Tennis' },
  { id: '2', title: 'Dill Dinkers North Bethesda' },
  { id: '3', title: 'North American Tennis League...' },
  { id: '4', title: 'North Epping Rangers' },
  { id: '5', title: 'Barrie North Winter Tennis' },
  { id: '6', title: 'Dill Dinkers North Bethesda' },
  { id: '7', title: 'North American Tennis League...' },
  { id: '8', title: 'Dill Dinkers North Bethesda' },
  { id: '9', title: 'North American Tennis League...' },
];

const MyBookingsScreen = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>41A spence Ave., Midhurst, Ontario, L9X0P2</Text>
      </View>
        <Feather name="chevron-right" color="#2D62EC" size={20} />
    
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
     <CommonHeader title="My bookings" onBack={() => navigation.goBack()}/>
      <FlatList
        data={bookings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
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
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 14,
    color: '#182B4D',
    marginBottom: 4,
    fontFamily:theme.bold
  },
  subtitle: {
    fontSize: 10,
    color: '#707C90',
    fontFamily:theme.medium
  },
});
