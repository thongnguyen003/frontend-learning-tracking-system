import axios from 'axios';

export async function login({ email, password, role }) {
  const response = await axios.post('http://localhost:8000/api/login', {
    email,
    password,
    role,
  });
  return response.data;
}
