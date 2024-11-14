import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthContext } from '../AuthContext';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Thêm trạng thái loading
  const authContext = useContext(AuthContext);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Thông báo', 'Email không hợp lệ.');
      return;
    }

    if (!password) {
      Alert.alert('Thông báo', 'Mật khẩu không được để trống.');
      return;
    }

    setLoading(true); // Bắt đầu loading
    try {
      // Gọi hàm login từ context
      const loginSuccess = await authContext?.login(email, password);
      
      console.log("loginSuccess: ", loginSuccess);  // Debug thông tin đăng nhập
      console.log("Token from authContext: ", authContext?.state.token);

      if (authContext?.state.token) {
        navigation.replace('Home');
      }
    } catch (error) {
      console.error("Error during login: ", error); // Debug lỗi
      Alert.alert('Thông báo', 'Đăng nhập không thành công. Vui lòng thử lại.');
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.loginContainer}>
        <Text style={styles.title}>ĐĂNG NHẬP</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Đăng Nhập</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>Chưa có tài khoản? Đăng ký</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Công ty THONGDAN</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7', // Màu nền sáng để tạo sự dễ chịu cho mắt
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#003366', // Màu nền xanh đậm
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#fff', // Màu chữ trắng
    fontFamily: 'Roboto', // Thêm phông chữ đẹp hơn
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto', // Sử dụng phông chữ dễ đọc
  },
  button: {
    backgroundColor: '#007bff',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3, // Tạo hiệu ứng đổ bóng cho nút
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  footer: {
    padding: 20,
    backgroundColor: '#003366',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default LoginScreen;
