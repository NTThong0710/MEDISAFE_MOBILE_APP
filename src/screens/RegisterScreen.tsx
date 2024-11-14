import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from '../AuthContext';

const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const authContext = useContext(AuthContext);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Thông báo', 'Email không hợp lệ.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Thông báo', 'Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    setLoading(true); // Bắt đầu loading
    try {
      await authContext?.register(email, password);
      Alert.alert('Thông báo', 'Đăng ký thành công! Bạn có thể đăng nhập.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Thông báo', 'Đăng ký không thành công. Vui lòng thử lại.');
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>ĐĂNG KÝ</Text>
        
        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        
        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        {/* Register Button */}
        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Đăng Ký</Text>
          )}
        </TouchableOpacity>
        
        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>Đã có tài khoản? Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#003366',  // Màu xanh đậm cho nền
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: '#ffffff', // Nền trắng cho form
    padding: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6, // Thêm bóng mờ nhẹ
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366', // Màu xanh đậm cho tiêu đề
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#007bff', // Màu xanh cho viền input
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9', // Màu nền sáng cho input
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff', // Màu xanh cho nút bấm
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loginButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  loginText: {
    color: '#007bff', // Màu xanh cho văn bản đăng nhập
    fontSize: 16,
    fontWeight: '500',
  },
});

export default RegisterScreen;
