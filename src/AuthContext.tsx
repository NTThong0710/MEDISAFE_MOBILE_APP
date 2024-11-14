import React, { createContext, useReducer, ReactNode } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';

interface AuthState {
  token: string | null;
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
}

const initialState: AuthState = {
  token: null,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, token: action.payload.token };
    case 'LOGOUT':
      return { ...state, token: null }; // Xử lý đăng xuất
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email: string, password: string) => {
    // Kiểm tra nếu email hoặc mật khẩu bị thiếu
    if (!email || !password) {
      Alert.alert('Thông báo', 'Bạn phải nhập đầy đủ email và mật khẩu.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.112:5000/login', { email, password });

      // Kiểm tra xem token có được trả về từ API không
      if (response.data.token) {
        // Lưu token vào localStorage hoặc AsyncStorage nếu cần
        dispatch({ type: 'LOGIN', payload: { token: response.data.token } });
      } else {
        Alert.alert('Thông báo', 'Thông tin đăng nhập không chính xác.');
      }
    } catch (error) {
      // Hiển thị thông báo khi đăng nhập không thành công
      Alert.alert('Thông báo', 'Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  const register = async (email: string, password: string) => {
    if (!email || !password) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    try {
      await axios.post('http://192.168.0.112:5000/register', { email, password });
      Alert.alert('Thông báo', 'Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
    } catch (error) {
      // Xử lý lỗi khi đăng ký
      Alert.alert('Thông báo', 'Đăng ký không thành công. Vui lòng thử lại.');
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
