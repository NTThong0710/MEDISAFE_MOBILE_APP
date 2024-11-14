import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import MedicationCard from '../components/MedicationCard'; // Import thẻ MedicationCard
import Icon from 'react-native-vector-icons/FontAwesome'; // Thêm FontAwesome để sử dụng icon

const MedicationScreen = () => {
  const [query, setQuery] = useState(''); // Từ khóa tìm kiếm thuốc
  const [medications, setMedications] = useState([]); // Kết quả tra cứu
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [error, setError] = useState(''); // Trạng thái lỗi

  // Hàm gọi API để tra cứu thuốc
  const fetchMedications = useCallback(async () => {
    if (query.trim() === '') return;
    setLoading(true);
    setError(''); // Reset lỗi mỗi lần tìm kiếm

    try {
      const response = await axios.get(
        `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${query}`
      );

      if (response.data.results.length === 0) {
        setError('Không tìm thấy thuốc. Vui lòng thử tên khác.');
        setMedications([]); // Đặt kết quả về mảng rỗng nếu không tìm thấy thuốc
      } else {
        setMedications(response.data.results); // Cập nhật kết quả
      }
    } catch (error) {
      setError('Thuốc hiện chưa được cập nhật trong cơ sở dữ liệu hiện tại. Nếu muốn biết thông tin vui lòng mở Google');
    } finally {
      setLoading(false);
    }
  }, [query]);

  // Hàm trích xuất dữ liệu từ các mảng
  const extractArrayData = (dataArray) => {
    return dataArray && dataArray.length > 0 ? dataArray : ['N/A'];
  };

  // Thông tin mẫu về một loại thuốc
  const sampleMedication = {
    openfda: {
      brand_name: 'Sample Drug',
      generic_name: 'Sample Generic',
    },
    purpose: ['Used to treat conditions'],
    dosage_and_administration: ['Take one tablet daily'],
    warnings: ['May cause dizziness'],
    do_not_use: ['Do not use if allergic'],
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên thuốc"
          placeholderTextColor="#888"
          value={query}
          onChangeText={setQuery}
        />
        {/* Nút Clear chỉ hiển thị khi có text */}
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')} style={styles.clearButton}>
            <Icon name="times-circle" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={fetchMedications}>
        <Text style={styles.buttonText}>Tìm kiếm</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#007bff" style={styles.loadingIndicator} />}
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          {/* Chỉ hiển thị thông tin mẫu nếu không có kết quả tìm kiếm */}
          {medications.length === 0 && (
            <>
              <Text style={styles.sampleHeader}>Thông tin mẫu về thuốc:</Text>
              <MedicationCard
                name={sampleMedication.openfda.brand_name}
                genericName={sampleMedication.openfda.generic_name}
                purpose={extractArrayData(sampleMedication.purpose)} // Mục đích
                instructions={extractArrayData(sampleMedication.dosage_and_administration)} // Hướng dẫn sử dụng
                sideEffects={extractArrayData(sampleMedication.warnings)} // Tác dụng phụ
                contraindications={extractArrayData(sampleMedication.do_not_use)} // Chống chỉ định
              />
            </>
          )}

          <FlatList
            data={medications}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <MedicationCard
                name={item.openfda?.brand_name || 'Không có tên thương mại'}
                genericName={item.openfda?.generic_name || 'N/A'}
                purpose={extractArrayData(item.purpose)} // Mục đích
                instructions={extractArrayData(item.dosage_and_administration)} // Hướng dẫn sử dụng
                sideEffects={extractArrayData(item.warnings)} // Tác dụng phụ
                contraindications={extractArrayData(item.do_not_use)} // Chống chỉ định
              />
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>Không có dữ liệu thuốc nào.</Text>} // Thông báo khi không có dữ liệu
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
    backgroundColor: '#f0f8ff', // Màu nền nhẹ nhàng
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#003366',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  clearButton: {
    padding: 10,
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
  sampleHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#007bff',
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    color: '#888',
  },
});

export default MedicationScreen;
