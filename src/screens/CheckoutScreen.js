import React from 'react';
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

const CheckoutScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
 
   <CommonHeader title="Checkout" onBack={() => navigation.goBack()}/>
      {/* My Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Details</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>Dummy Name</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>9874568123</Text>
        </View>
        <Text style={[styles.label, { marginTop: 10 }]}>Location</Text>
        <Text style={styles.value}>dummy221email.@gmail.com</Text>
      </View>
       <View style={{height:1,width:'90%',alignSelf:'center',marginVertical:10,backgroundColor:'#95ACFF4D'}}/>
      {/* Court Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Court Details</Text>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>Dill Dinkers North Bethesda</Text>
        <Text style={[styles.label, { marginTop: 10 }]}>Location</Text>
        <Text style={styles.value}>
          41A Spence Ave., Midhurst, Ontario, L9X0P2
        </Text>
      </View>
       <View style={{height:1,width:'90%',alignSelf:'center',marginVertical:10,backgroundColor:'#95ACFF4D'}}/>

      {/* Booking Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Booking Details</Text>
        {[
          ['Court Number', 'Court No. 08'],
          ['Date', 'August 29, 2026'],
          ['Time', '06:30 Am - 07:30 Am'],
          ['Duration', '1 Hour'],
          ['Booking ID', '#32144569870'],
        ].map(([key, val]) => (
          <View style={styles.rowBetween} key={key}>
            <Text style={styles.label}>{key}</Text>
            <Text style={styles.value}>{val}</Text>
          </View>
        ))}
      </View>
       <View style={{height:1,width:'90%',alignSelf:'center',marginVertical:10,backgroundColor:'#95ACFF4D'}}/>

      {/* Payment Method */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentMethod}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/196/196566.png' }}
            style={styles.icon}
          />
          <Text style={styles.value}>Paypal</Text>
          <View style={styles.radioSelected} />
        </View>
      </View>

      {/* Payment Summary */}
      <View style={styles.section21}>
        <View style={[styles.section,{backgroundColor:'#ffffff',width:'90%',alignSelf:'center'}]}>
        <Text style={styles.sectionTitle}>Payment Summary</Text>
        {[
          ['Amount', '$54.00'],
          ['Tax', '$03.00'],
          ['Summary', '$57.00'],
        ].map(([label, value]) => (
          <View style={styles.rowBetween} key={label}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
        </View>
           <TouchableOpacity style={styles.payBtn}>
        <Text style={styles.payText}>CONFIRM & PAY NOW</Text>
      </TouchableOpacity>
      <View style={{height:100}}/>
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
    fontFamily:theme.bold,
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
    fontFamily:theme.medium
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
    borderWidth:1,
    padding:5,
    borderColor:'#D8E2FE',
    borderRadius:15,
    backgroundColor:Colors.white
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
  section21:{
    borderTopWidth:1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    borderColor:'#D8E2FE',
        overflow: 'hidden',
    // elevation: 2,
  }
});
