import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Feather from 'react-native-vector-icons/Feather';
import CommonHeader from '../components/CommonHeader';
import theme from '../constant/theme';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dates = [3, 4, 5, 6, 7, 8, 9];
const durationOptions = [1, 2];

const courtNumbers = Array.from({ length: 20 }, (_, i) => i + 1);
const disabledCourts = [3, 6, 15, 17]; // example disabled

const BookAppointmentScreen = () => {
  const [selectedDate, setSelectedDate] = useState(4);
  const [startTime, setStartTime] = useState(new Date());
  const [duration, setDuration] = useState(1);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);

  const handleTimeConfirm = (date) => {
    setStartTime(date);
    setTimePickerVisible(false);
  };

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const getEndTime = () => {
    const end = new Date(startTime);
    end.setHours(end.getHours() + duration);
    return formatTime(end);
  };

  return (
    <ScrollView style={styles.container}>
       <CommonHeader title="Checkout" onBack={() => navigation.goBack()}/>

      {/* Date Picker */}
      <Text style={styles.sectionTitle}>Choose Date</Text>
      <View style={styles.dateRow}>
        {dates.map((date, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.dateItem,
              selectedDate === date && styles.selectedDate,
            ]}
            onPress={() => setSelectedDate(date)}
          >
            <Text style={styles.dayText}>{days[i]}</Text>
            <Text
              style={[
                styles.dateText,
                selectedDate === date && styles.selectedDateText,
              ]}
            >
              {date}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
        <View style={{width:'96%',height:1,backgroundColor:'#95ACFF4D',alignSelf:"center",marginTop:20}}/>
      {/* Time Slot */}
      <Text style={styles.sectionTitle}>Time Slot</Text>
      <TouchableOpacity
        style={styles.timeBox}
        onPress={() => setTimePickerVisible(true)}
      >
        <Text style={styles.timeText}>{formatTime(startTime)}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        date={startTime}
        onConfirm={handleTimeConfirm}
        onCancel={() => setTimePickerVisible(false)}
      />

      {/* Duration */}
      <View style={styles.durationBox}>
        <Text style={styles.label}>Duration</Text>
        <View style={styles.durationControl}>
          <TouchableOpacity
            onPress={() => setDuration(Math.max(1, duration - 1))}
          >
            <Text style={styles.durationBtn}>-</Text>
          </TouchableOpacity>
          <Text style={styles.durationText}>{duration} hr</Text>
          <TouchableOpacity onPress={() => setDuration(duration + 1)}>
            <Text style={styles.durationBtn}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* End Time */}
      <View style={styles.timeBox}>
        <Text style={styles.timeText}>End Time: {getEndTime()}</Text>
      </View>

      {/* Courts */}
        <View style={{width:'96%',height:1,backgroundColor:'#95ACFF4D',alignSelf:"center",marginTop:20}}/>

      <Text style={styles.sectionTitle}>Select Court</Text>
      <View style={styles.courtGrid}>
        {courtNumbers.map((court) => {
          const isDisabled = disabledCourts.includes(court);
          const isSelected = selectedCourt === court;

          return (
            <TouchableOpacity
              key={court}
              disabled={isDisabled}
              onPress={() => setSelectedCourt(court)}
              style={[
                styles.courtBox,
                isSelected && styles.selectedCourt,
                isDisabled && styles.disabledCourt,
              ]}
            >
              <Text
                style={[
                  styles.courtText,
                  (isSelected || isDisabled) && { color: 'white' },
                ]}
              >
                Court 
              </Text>
              <Text style={{fontSize:18,fontFamily:theme.bold}}>{court.toString().padStart(2, '0')}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{height:60}}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F4F8FE' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 18, fontWeight: '600', color: '#1D1D1D' },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontFamily:theme.bold,
    fontSize: 17,
    color: '#2D3A4A',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateItem: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    width: 45,
  },
  selectedDate: {
    backgroundColor: '#95ACFF33',
  },
  dayText: { fontSize: 12, color: '#777' },
  dateText: { fontSize: 14, fontWeight: '600', color: '#2D3A4A' },
  selectedDateText: { color: '#5577FF' },
  timeBox: {
    padding: 15,
    backgroundColor: '#F4F8FE',
    borderRadius: 10,
    marginTop: 10,
    borderWidth:1,
    borderColor:'#EBEBEB'
  },
  timeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3A4A',
  },
  durationBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3A4A',
  },
  durationControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF3FF',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  durationBtn: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  durationText: {
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 10,
  },
  courtGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  courtBox: {
    width: '22%',
    height:70,
    aspectRatio: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth:1,
    borderColor:'#D8E2FE'
  },
  selectedCourt: {
    backgroundColor: '#5577FF',
  },
  disabledCourt: {
    backgroundColor: '#D1D5DB',
  },
  courtText: {
    fontFamily:theme.medium,
    color: '#2D3A4A',
    textAlign: 'center',
  },
});

export default BookAppointmentScreen;
