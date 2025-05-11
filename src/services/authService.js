import { useApi } from '../hooks/useApi';

export function useAuth() {
  const { apiCall } = useApi();

  const login = async ({ email, password, role }) => {
    try {
      const response = await apiCall('/login', 'POST', {
        email,
        password,
        role,
      });
      console.log('Login response:', response);
      // Lưu thông tin user vào localStorage nếu cần
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('role', response.role);
      return response;
    } catch (error) {
      console.error('Login error:', error.response?.data);
      throw error;
    }
  };

  const logout = async (role) => {
    try {
      const response = await apiCall('/logout', 'POST', { role });
      console.log('Logout response:', response);
      // Xóa thông tin user khi logout
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      return response;
    } catch (error) {
      console.error('Logout error:', error.response?.data);
      throw error;
    }
  };

  return { login, logout };
}