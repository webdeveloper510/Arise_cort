import React from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const {width} = Dimensions.get('window');

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;
        const iconName = options.tabBarIcon;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        const getIcon = () => {
          switch (route.name) {
            case 'Home':
              return isFocused
                ? require('../assets/home_b.png')
                : require('../assets/home_w.png');
            case 'Bookings':
              return isFocused
                ? require('../assets/calendar_b.png')
                : require('../assets/calendar.png');
            case 'Contact':
              return isFocused
                ? require('../assets/call-center_b.png')
                : require('../assets/call-center.png');
            case 'Profile':
              return isFocused
                ? require('../assets/user_b.png')
                : require('../assets/user.png');
            // default:
            //   return require('../assets/default_icon.png');
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabButton}
            activeOpacity={0.8}>
            <View style={[styles.iconWrapper, isFocused && styles.activeTab]}>
              <Image
                source={getIcon()}
                style={{width: 24, height: 24, resizeMode: 'contain'}}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default CustomTabBar;
const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 30,
    paddingVertical: 10,
    backgroundColor: '#14213D', // dark navy
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 30,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    borderRadius: '50%',
  },
});
