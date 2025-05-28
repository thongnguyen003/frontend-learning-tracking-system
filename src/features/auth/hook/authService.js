import { useApi } from '../../../hooks/useApi';

export function useAuth() {
  const { apiCall } = useApi();

  const login = async ({ email, password, role }) => {
    try {
      const response = await apiCall('/login', 'POST', {
        email,
        password,
        role,
      });
      // Lưu thông tin user vào localStorage nếu cần
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('role', response.role);
      localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async (role) => {
    try {
      const response = await apiCall('/logout', 'POST', { role });
      // Xóa thông tin user khi logout
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      return response;
    } catch (error) {
      throw error;
    }
  };

  return { login, logout };
}