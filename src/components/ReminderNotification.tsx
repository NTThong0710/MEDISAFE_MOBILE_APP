import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';

const ReminderNotification = () => {
  const [notificationTime, setNotificationTime] = useState(new Date());
  const [isPickerVisible, setPickerVisible] = useState(false);

  // Hàm để lên lịch nhắc nhở
  const scheduleNotification = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { granted } = await Notifications.requestPermissionsAsync();
      if (!granted) {
        Alert.alert('Thông báo', 'Bạn cần cấp quyền thông báo để sử dụng tính năng này.');
        return;
      }
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Nhắc nhở uống thuốc',
        body: 'Đến giờ uống thuốc rồi!',
      },
      trigger: {
        hour: notificationTime.getHours(),
        minute: notificationTime.getMinutes(),
        repeats: true,
      },
    });

    Alert.alert('Thông báo', 'Nhắc nhở đã được thiết lập thành công!');
  };

  const showTimePicker = () => {
    setPickerVisible(true);
  };

  const onTimeChange = (event: any, selectedTime: Date | undefined) => {
    setPickerVisible(Platform.OS === 'ios');
    if (selectedTime) {
      setNotificationTime(selectedTime);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt nhắc nhở uống thuốc</Text>
      
      <TouchableOpacity style={styles.button} onPress={showTimePicker}>
        <Text style={styles.buttonText}>Chọn giờ nhắc nhở</Text>
      </TouchableOpacity>
      
      {isPickerVisible && (
        <DateTimePicker
          value={notificationTime}
          mode="time"
          display="spinner"
          onChange={onTimeChange}
        />
      )}

      <Text style={styles.selectedTime}>
        Giờ nhắc nhở: {notificationTime.getHours().toString().padStart(2, '0')}:
        {notificationTime.getMinutes().toString().padStart(2, '0')}
      </Text>

      <TouchableOpacity style={styles.confirmButton} onPress={scheduleNotification}>
        <Text style={styles.confirmButtonText}>Đặt nhắc nhở</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedTime: {
    fontSize: 18,
    marginVertical: 20,
    color: '#333',
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ReminderNotification;
