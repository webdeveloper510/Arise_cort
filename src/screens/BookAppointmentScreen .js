import React, {useEffect, useState, useMemo} from 'react';
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
import PrimaryButton from '../components/PrimaryButton';
import {getCourtById} from '../Apis';
import {Calendar} from 'react-native-calendars';
import {courtBooking, courtAvailability} from '../Apis';
import moment from 'moment';

const durationOptions = [1, 2];

// const courtNumbers = Array.from({length: 20}, (_, i) => i + 1);
const disabledCourts = [3, 6, 15, 17]; // example disabled

const BookAppointmentScreen = ({navigation, route}) => {
  const {id} = route.params;
  console.log('id===========>', id);
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const [startTime, setStartTime] = useState(new Date());
  const [duration, setDuration] = useState(1);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);

  const [courtNumbers, setCourtsNumber] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const handleTimeConfirm = date => {
    setStartTime(date);
    setTimePickerVisible(false);
    getCourts();
  };
  console.log('🚀 ~ BookAppointmentScreen ~ date:', startTime);

  const formatTime = date =>
    date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

  const getEndTime = () => {
    const end = new Date(startTime);
    end.setHours(end.getHours() + duration);
    return formatTime(end);
  };
  useEffect(() => {
    // getCourtData();
  }, [id]);

  const availableDates = useMemo(() => {
    if (!selectedDate) return [];
    const center = moment(selectedDate);
    const dates = [];
    for (let i = -30; i <= 30; i++) {
      dates.push(center.clone().add(i, 'days').format('YYYY-MM-DD'));
    }
    return dates;
  }, [selectedDate]);

  const handleCalendarSelect = day => {
    setSelectedDate(day.dateString);
  };
  const getCourtData = async () => {
    try {
      setIsLoading(true);
      let res = await getCourtById(16);
      setCourtsNumber(res.courts);
      // console.log('🚀 ~ getCourtData ~ 123res:', res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('🚀 ~ getCourtData ~ error:', error);
    }
  };

  const getCourts = async () => {
    try {
      const end = new Date(startTime);
      end.setHours(end.getHours() + duration);

      let body = {
        location_id: 16,
        date: selectedDate,
        start_time: moment(startTime).format('HH:mm:ss'),
        end_time: moment(end).format('HH:mm:ss'),
      };
      console.log("🚀 ~ getCourts ~ body:", body)
    
      let res = await courtAvailability(body);
      console.log("🚀 ~ getCourts ~ res:", res)
      setCourtsNumber(res.courts);

    } catch (error) {
      console.log('🚀 ~ getCourts ###############~ error:', error);
    }
  };

  const formatDuration = (duration) => {
  const dur = moment.duration(duration, 'hours');
  return `${dur.hours()}:${dur.minutes().toString().padStart(2, '0')}:${dur.seconds().toString().padStart(2, '0')}`;
};
  const onSubmit = async () => {
    try {
      setIsLoading1(true);
      const end = new Date(startTime);
      end.setHours(end.getHours() + duration);
      var body = {
        booking_date: selectedDate,
        start_time: moment(startTime).format('HH:mm:ss'),
        end_time: moment(end).format('HH:mm:ss'),
        duration_time: formatDuration(duration),
        court_id: selectedCourt,
      };
      console.log('🚀 ~ onSubmit ~ body:', body);
      const res = await courtBooking(body);
      console.log('🚀 ~ onSubmit ~ res:', res);
      navigation.navigate('Checkout')
      setIsLoading1(false);
    } catch (error) {
      setIsLoading1(false);
      console.log('🚀 ~ onSubmit ~ error#########:', error.response);
    }
  };
  const renderDateItem = ({item}) => {
    const isEnabled = availableDates.includes(item);
    console.log('🚀 ~ renderDateItem ~ isEnabled:', isEnabled);
    const isSelected = item === selectedDate;
    const isPastDate = moment(item).isBefore(moment(), 'day');
    return (
      <TouchableOpacity
        style={[
          styles.dateItem,
          isEnabled ? styles.enabled : styles.disabled,
          isSelected && styles.selected,
          isPastDate && {opacity: 0.5},
        ]}
        disabled={isPastDate}
        onPress={() => setSelectedDate(item)}>
        <Text style={styles.dayText}>
          {moment(item).format('ddd')} {/* e.g., Mon, Tue */}
        </Text>
        <View
          style={[
            styles.selectDateStyle,
            {borderColor: item === selectedDate ? '#0860FB' : '#D8E2FE'},
          ]}>
          <Text
            style={[
              styles.dateText,
              {color: item === selectedDate ? '#0860FB' : '#182B4D'},
            ]}>
            {moment(item).format('D')} {/* e.g., 4, 5 */}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <CommonHeader title="Checkout" onBack={() => navigation.goBack()} />

      {/* Date Picker */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.sectionTitle}>Choose Date</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 11, color: '#0860FB', paddingRight: 8}}>
            {moment(selectedDate).format('MMMM D, YYYY')}
          </Text>
          <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)}>
            <Feather name="chevron-down" color="#192C4E" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      {showCalendar && (
        <Calendar
          onDayPress={day => {
            handleCalendarSelect(day);
            setShowCalendar(false);
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: 'blue',
            },
          }}
        />
      )}

      {selectedDate && (
        <FlatList
          data={availableDates}
          horizontal
          keyExtractor={item => item}
          renderItem={renderDateItem}
          contentContainerStyle={{marginTop: 20}}
        />
      )}
      {/* <View style={styles.dateRow}>
        {dates.map((date, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.dateItem,
              selectedDate === date && styles.selectedDate,
            ]}
            onPress={() => setSelectedDate(date)}>
            <Text style={styles.dayText}>{days[i]}</Text>
            <Text
              style={[
                styles.dateText,
                selectedDate === date && styles.selectedDateText,
              ]}>
              {date}
            </Text>
          </TouchableOpacity>
        ))}
      </View> */}
      <View
        style={{
          width: '96%',
          height: 1,
          backgroundColor: '#95ACFF4D',
          alignSelf: 'center',
          marginTop: 20,
        }}
      />
      {/* Time Slot */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.sectionTitle}>Time Slot</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 11, color: '#0860FB', paddingRight: 8}}>
            {moment(selectedDate).format('MMMM D, YYYY')}
          </Text>
          <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)}>
            <Feather name="chevron-down" color="#192C4E" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.timeBox1}
        onPress={() => setTimePickerVisible(true)}>
        <View>
          <Text
            style={{
              fontSize: 10,
              paddingBottom: 5,
              color: '#0860FB',
              fontFamily: theme.bold,
            }}>
            Start Time
          </Text>

          <Text style={styles.timeText}>{formatTime(startTime)}</Text>
        </View>
        <TouchableOpacity onPress={() => setTimePickerVisible(true)}>
          <Feather name="chevron-down" color="#192C4E" size={20} />
        </TouchableOpacity>
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
            style={{
              width: 22,
              height: 22,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 17,
              borderColor: '#0860FB1A',
              backgroundColor: '#E0E9F9',
            }}>
            <Text style={styles.durationBtn}>-</Text>
          </TouchableOpacity>
          <Text style={styles.durationText}>{duration} hr</Text>
          <TouchableOpacity
            style={{
              width: 22,
              height: 22,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 17,
              borderColor: '#0860FB1A',
              backgroundColor: '#E0E9F9',
            }}
            onPress={() => setDuration(duration + 1)}>
            <Text style={styles.durationBtn}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* End Time */}
      <View style={styles.timeBox}>
        <Text
          style={{
            fontSize: 10,
            color: '#0860FB',
            fontFamily: theme.bold,
            paddingBottom: 5,
          }}>
          End Time
        </Text>
        <Text style={styles.timeText}>{getEndTime()}</Text>
      </View>

      {/* Courts */}
      <View
        style={{
          width: '96%',
          height: 1,
          backgroundColor: '#95ACFF4D',
          alignSelf: 'center',
          marginTop: 20,
        }}
      />

      <Text style={styles.sectionTitle}>Select Court</Text>
      <View style={styles.courtGrid}>
        {courtNumbers.map((court, index) => {
          const isSelected = selectedCourt === court.court_id;
          console.log(
            '🚀 ~ BookAppointmentScreen123 ~ isSelected:',
            isSelected,
          );

          return (
            <TouchableOpacity
              key={index}
              disabled={court?.is_booked}
              onPress={() => setSelectedCourt(court.court_id)}
              style={[
                styles.courtBox,
                isSelected && styles.selectedCourt,
                court?.is_booked && styles.disabledCourt,
              ]}>
              <Text
                style={[
                  styles.courtText,
                  (isSelected || court?.is_booked) && {color: 'white'},
                ]}>
                Court
              </Text>
              <Text style={{fontSize: 18, fontFamily: theme.bold}}>
                {court.court_number}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <PrimaryButton
          title="Select Court"
          width={'70%'}
          height={60}
          onPress={onSubmit}
          isLoading={isLoading1}
        />
      </View>
      <View style={{height: 60}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#F4F8FE'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {fontSize: 18, fontWeight: '600', color: '#1D1D1D'},
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontFamily: theme.bold,
    fontSize: 17,
    color: '#2D3A4A',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateItem: {
    alignItems: 'center',
    // padding: 10,
    width: 59,
  },
  selectedDate: {
    backgroundColor: '#95ACFF33',
  },
  dayText: {fontSize: 12, color: '#777'},
  dateText: {fontSize: 14, fontWeight: '600', color: '#2D3A4A'},
  selectedDateText: {color: '#5577FF'},
  timeBox1: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeBox: {
    padding: 15,
    backgroundColor: '#F4F8FE',
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#EBEBEB',
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
    borderWidth: 1,
    height: 80,
    borderRadius: 17,
    borderColor: '#EBEBEB',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3A4A',
    paddingLeft: 5,
  },
  durationControl: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#EFF3FF',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  durationBtn: {
    fontSize: 15,
    fontWeight: 'bold',
    // paddingHorizontal: 10,
    color: '#0860FB',
  },
  durationText: {
    fontSize: 13,
    fontWeight: theme.futuraMedium,
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
    height: 70,
    aspectRatio: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D8E2FE',
  },
  selectedCourt: {
    backgroundColor: '#5577FF',
  },
  disabledCourt: {
    backgroundColor: '#D1D5DB',
  },
  courtText: {
    fontFamily: theme.medium,
    color: '#2D3A4A',
    textAlign: 'center',
  },
  selectDateStyle: {
    width: 38,
    height: 61,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  enabled: {
    borderColor: '#0860FB',
  },
});

export default BookAppointmentScreen;
