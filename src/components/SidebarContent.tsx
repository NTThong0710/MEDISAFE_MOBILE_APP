import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SidebarContent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thông tin tài khoản</Text>
      <Text style={styles.info}>Tên: User</Text>
      <Text style={styles.info}>Email: user@example.com</Text>
      {/* Thêm các thông tin khác nếu cần */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default SidebarContent;
