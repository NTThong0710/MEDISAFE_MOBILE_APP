import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import ConditionCard from '../components/ConditionCard';

const ConditionLookUp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchConditions();
  }, []);

  const fetchConditions = async (searchTerm = '') => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://192.168.0.112:5000/api/healthconditions?name=${searchTerm}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Lỗi khi lấy dữ liệu. Vui lòng thử lại.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchConditions(searchTerm);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên bệnh"
        placeholderTextColor="#888"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Tìm kiếm</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#007bff" style={styles.loadingIndicator} />}
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          {!loading && results.length === 0 && searchTerm !== '' && (
            <Text style={styles.noResultsText}>Không tìm thấy kết quả nào.</Text>
          )}
          <FlatList
            data={results}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ConditionCard
                name={item.name}
                description={item.description}
                symptoms={item.symptoms}
                causes={item.causes}
                prevention={item.prevention}
              />
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  input: {
    height: 50,
    borderColor: '#003366',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#003366',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginVertical: 10,
  },
  error: {
    color: 'red',
    marginVertical: 10,
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ConditionLookUp;
