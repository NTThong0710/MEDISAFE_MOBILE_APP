import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const ProfileScreen = () => {
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [reminder, setReminder] = useState(false);
  const [medications, setMedications] = useState([]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  useEffect(() => {
    loadMedications();
  }, []);

  const loadMedications = async () => {
    try {
      const storedMedications = await AsyncStorage.getItem('medications');
      if (storedMedications) {
        setMedications(JSON.parse(storedMedications));
      }
    } catch (error) {
      console.error('Error loading medications:', error);
    }
  };

  const saveMedication = async () => {
    if (!medicationName || !dosage || !reminderTime) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    const newMedication = { medicationName, dosage, reminderTime, reminder };
    const updatedMedications = [...medications, newMedication];
    setMedications(updatedMedications);

    try {
      await AsyncStorage.setItem('medications', JSON.stringify(updatedMedications));
      setMedicationName('');
      setDosage('');
      setReminderTime('');
      setReminder(false);
      Alert.alert('Thành công', 'Thuốc đã được lưu thành công');
    } catch (error) {
      console.error('Error saving medication:', error);
    }
  };

  const handleReminderTimeConfirm = (time) => {
    setReminderTime(time.toLocaleTimeString([], {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }));
    setDatePickerVisible(false);
  };

  const handleDeleteMedication = (index) => {
    Alert.alert(
      'Xóa thuốc',
      'Bạn có chắc chắn muốn xóa thuốc này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa', onPress: () => {
            const updatedMedications = medications.filter((_, i) => i !== index);
            setMedications(updatedMedications);
            AsyncStorage.setItem('medications', JSON.stringify(updatedMedications));
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={medications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.medicationItem}>
            <Text style={styles.medicationName}>{item.medicationName}</Text>
            <Text style={styles.medicationDetails}>Liều lượng: {item.dosage}</Text>
            <Text style={styles.medicationDetails}>Thời gian: {item.reminderTime}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteMedication(index)}
            >
              <Ionicons name="trash-bin" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
        style={{ maxHeight: 200 }}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tên thuốc:</Text>
        <TextInput
          value={medicationName}
          onChangeText={setMedicationName}
          placeholder="Nhập tên thuốc"
          style={styles.input}
          placeholderTextColor="#CCD6DD"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Liều lượng:</Text>
        <Picker
          selectedValue={dosage}
          onValueChange={(itemValue) => setDosage(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Chọn liều lượng" value="" />
          <Picker.Item label="10mg" value="10mg" />
          <Picker.Item label="20mg" value="20mg" />
          <Picker.Item label="50mg" value="50mg" />
          <Picker.Item label="100mg" value="100mg" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Thời gian uống thuốc:</Text>
        <Button title={reminderTime || 'Chọn thời gian'} onPress={() => setDatePickerVisible(true)} />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveMedication}>
        <Text style={styles.saveButtonText}>Lưu thuốc</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleReminderTimeConfirm}
        onCancel={() => setDatePickerVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1FAFD',
  },
  inputContainer: {
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: '#003366',
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#FFFFFF', // Đổi thành màu trắng cho nổi bật
    marginBottom: 8,
    fontFamily: 'Roboto', // Sử dụng phông Roboto nếu có
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    color: '#FFFFFF', // Chữ màu trắng để dễ đọc trên nền xanh đậm
    fontFamily: 'Roboto',
    backgroundColor: '#007bff', // Nền input tối hơn để phân biệt với container
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#D1E0E5',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#007bff', // Nền picker tối hơn phù hợp với input
    color: '#FFFFFF',
    fontFamily: 'Roboto',
  },
  saveButton: {
    backgroundColor: '#003366',
    paddingVertical: 15,
    borderRadius: 30,
    marginVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Roboto',
  },
  medicationItem: {
    backgroundColor: '#003366',
    padding: 16,
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  medicationName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#66ff66',
    marginBottom: 6,
    fontFamily: 'Roboto',
  },
  medicationDetails: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    marginBottom: 4,
    fontFamily: 'Roboto',
  },
  deleteButton: {
    marginTop: 8,
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 50,
    alignSelf: 'flex-start',
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default ProfileScreen;
