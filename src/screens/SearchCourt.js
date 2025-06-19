import React, {useState, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import CommonHeader from '../components/CommonHeader';
import CourtItem from '../components/CourtItem';
import Feather from '@react-native-vector-icons/feather';
import {getAllCourts} from '../Apis';
import theme from '../constant/theme';
import Colors from '../constant/Colors';
// const MOCK_DATA = [
//   {
//     id: '1',
//     name: 'Barrie North Winter Tennis',
//     address: '41A spence Ave., Midhurst, Ontario, L9X0P2',
//     logo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
//   },
//   {
//     id: '2',
//     name: 'Dill Dinkers North Bethesda',
//     address: '41A spence Ave., Midhurst, Ontario, L9X0P2',
//     logo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
//   },
//   {
//     id: '3',
//     name: 'North American Tennis League',
//     address: '41A spence Ave., Midhurst, Ontario, L9X0P2',
//     logo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
//   },
// ];

const SearchCourtScreen = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mockData, setMockData] = useState([]);
  const [loading, setLoading] = useState(true);

  const displayedData = useMemo(() => {
    if (searched && query.length >= 4) {
      return mockData.filter(item =>
        item.description.toLowerCase().includes(query.toLowerCase()),
      );
    }
    return mockData;
  }, [query, searched, mockData]);

  useEffect(() => {
    getAllDAta();
  }, []);

  const getAllDAta = async () => {
    try {
      setLoading(true);
      const res = await getAllCourts();
      console.log('🚀 ~ getAllDAta ~ res:', res.results);
      setMockData(res.results);
      setLoading(false);
    } catch (error) {
      console.log('🚀 ~ getAllDAta ~ error:', error);
      setLoading(false);
    }
  };

  const SkeletonLoader = () => {
    return (
      <View style={{padding: 16}}>
        {[...Array(5)].map((_, index) => (
          <View key={index} style={styles.skeletonItem} />
        ))}
      </View>
    );
  };
  console.log('###########==123==>', mockData);
  return (
    <View style={styles.container}>
      <CommonHeader title="Search Court" onBack={() => navigation.goBack()} />

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search Organization ..."
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => {
            setSearched(true);
            Keyboard.dismiss();
          }}
          style={styles.searchBtn}>
          <Feather name="search" color="#ffffff" size={20} />
        </TouchableOpacity>
      </View>
      <Text style={styles.hintText}>Enter At Least 4 Characters</Text>
      {loading ? (
        <ActivityIndicator size={'small'} color={Colors.primary} />
      ) : (
        <FlatList
          data={mockData}
          keyExtractor={item => item.id}
          contentContainerStyle={{padding: 16}}
          renderItem={({item, index}) => (
            <CourtItem
              item={item}
              selected={selectedItem?.id === item.id}
              onSelect={() => {
                if (selectedItem?.id === item.id) {
                  setSelectedItem(null); // unselect if already selected
                } else {
                  setSelectedItem(item); // select current
                }
              }}
            />
          )}
        />
      )}

      {!loading && displayedData.length > 0 && (
        <TouchableOpacity style={styles.continueBtn} onPress={()=> navigation.navigate('BookAppointmentScreen',{id:selectedItem?.id})}>
          <Text style={styles.continueText}>CONTINUE</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchCourtScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 45,
  },
  searchBtn: {
    backgroundColor: '#0066FF',
    width: 45,
    height: 45,
    marginLeft: 10,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintText: {
    paddingHorizontal: 20,
    fontSize: 12,
    color: '#888',
    marginTop: 6,
  },
  continueBtn: {
    width:'70%',
    backgroundColor: '#0066FF',
    marginHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent:'center',
    alignSelf:'center'
  },
  continueText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
