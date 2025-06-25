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
import { showMessage } from 'react-native-flash-message';

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
  const [duration, setDuration] = useState(60);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);

  const [courtNumbers, setCourtsNumber] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  console.log('🚀 ~ BookAppointmentScreen ~ startTime:', startTime);
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
    end.setMinutes(end.getMinutes() + duration);
    return formatTime(end);
  };

  const formatDuration = minutes => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}:${mins === 0 ? '00' : mins}`;
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
      let res = await getCourtById(id);
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
        location_id: id,
        date: selectedDate,
        start_time: moment(startTime).format('HH:mm:ss'),
        end_time: moment(end).format('HH:mm:ss'),
      };
      console.log('🚀 ~ getCourts ~ body:', body);

      let res = await courtAvailability(body);
      console.log('🚀 ~ getCourts ~ res:', res);
      setCourtsNumber(res.courts);
    } catch (error) {
      console.log('🚀 ~ getCourts ###############~ error:', error);
    }
  };

  // const formatDuration = duration => {
  //   const dur = moment.duration(duration, 'hours');
  //   return `${dur.hours()}:${dur.minutes().toString().padStart(2, '0')}:${dur
  //     .seconds()
  //     .toString()
  //     .padStart(2, '0')}`;
  // };
  const onSubmit = async () => {
      if (!selectedCourt) {
      showMessage({message:"Please select court number!",type:'danger'})
      return;
    }

    try {
      setIsLoading1(true);
      const end = new Date(startTime);
      end.setMinutes(end.getMinutes() + duration);
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
      navigation.navigate('Checkout', {data: res});
      setIsLoading1(false);
    } catch (error) {
      setIsLoading1(false);
      console.log('🚀 ~ onSubmit ~ error#########:', error.response);
    }
  };

  const markedDates = useMemo(() => {
    const marks = {};
    for (let i = 0; i < 7; i++) {
      const date = moment().add(i, 'days').format('YYYY-MM-DD');
      marks[date] = {
        disabled: false,
        disableTouchEvent: false,
        selected: selectedDate === date,
        selectedColor: selectedDate === date ? '#0860FB' : undefined,
      };
    }

    // Disable all other dates
    return new Proxy(marks, {
      get: (target, prop) => {
        if (prop in target) {
          return target[prop];
        }
        return {
          disabled: true,
          disableTouchEvent: true,
        };
      },
    });
  }, [selectedDate]);

  const weekDates = useMemo(() => {
    const startOfWeek = moment(selectedDate).startOf('week'); // Always Sunday
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = moment(startOfWeek).add(i, 'days');
      days.push({
        dateString: date.format('YYYY-MM-DD'),
        day: date.date(),
        dayName: date.format('ddd'),
      });
    }
    return days;
  }, [selectedDate]);

  const renderItem = ({item, index}) => {
    const isPastDate = moment(item.dateString).isBefore(moment(), 'day');

    return (
      <View
        style={{alignItems: 'center', marginHorizontal: index == 0 ? 0 : 5}}>
        <Text style={[styles.dayName, isPastDate && styles.disabledText]}>
          {item.dayName}
        </Text>
        <TouchableOpacity
          style={[
            styles.dayContainer,
            item.dateString === selectedDate && styles.selectedDayContainer,
            isPastDate && styles.disabledDayContainer,
          ]}
          onPress={() => {
            if (!isPastDate) setSelectedDate(item.dateString);
          }}
          disabled={isPastDate}>
          <Text
            style={[
              styles.dayNumber,
              item.dateString === selectedDate && styles.selectedDayNumber,
              isPastDate && styles.disabledText,
            ]}>
            {item.day}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <CommonHeader
        title="Book Appointment"
        onBack={() => navigation.goBack()}
      />

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
          markedDates={markedDates}
          onDayPress={day => {
            const selected = day.dateString;
            if (!markedDates[selected]?.disabled) {
              setSelectedDate(selected);
            }
          }}
          disableAllTouchEventsForDisabledDays={true}
          theme={{
            selectedDayBackgroundColor: '#0860FB',
            selectedDayTextColor: '#ffffff',
          }}
        />
      )}

      {selectedDate && (
        <FlatList
          data={weekDates}
          horizontal
          keyExtractor={item => item.dateString}
          renderItem={renderItem}
          contentContainerStyle={styles.weekList}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        />
      )}

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
            onPress={() => {
              if (duration > 60) {
                setDuration(duration - 30);
              }
            }}
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
          <Text style={styles.durationText}>{formatDuration(duration)} hr</Text>
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
            onPress={() => setDuration(duration + 30)}>
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
                  (isSelected || court?.is_booked) && {color: '#5577FF'},
                ]}>
                Court
              </Text>
              <Text style={{fontSize: 18, fontFamily: theme.bold,color:isSelected ? '#5577FF' :'#182B4D'}}>
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
    padding: 10,
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
    // backgroundColor: '#5577FF',
    borderColor:'#5577FF'
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
  /// date pickere=====
  weekList: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  dayContainer: {
    width: 39,
    height: 70,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#D8E2FE',
  },
  selectedDayContainer: {
    borderColor: '#007aff',
    borderWidth: 2,
    backgroundColor: '#ffffff',
  },
  dayName: {
    fontSize: 12,
    color: '#333',
    paddingBottom: 10,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedDayNumber: {
    color: '#007aff',
  },
  disabledDayContainer: {
    backgroundColor: '#e0e0e0',
    borderColor: '#ccc',
  },

  disabledText: {
    color: '#999',
  },
});

export default BookAppointmentScreen;
