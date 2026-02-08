import axios from "axios";

const API_URL = "https://ecommerce.igwilo.com/swagger/?format=openapi";

// ---------- AUTH ----------
export const login = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${API_URL}/auth/login/`, data);
  return res.data; // should return access & refresh tokens
};

export const logout = async (refresh: string) => {
  return await axios.post(`${API_URL}/auth/logout/`, { refresh });
};

export const register = async (data: {
  email: string;
  password: string;
  password2: string;
}) => {
  const res = await axios.post(`${API_URL}/auth/register/`, data);
  return res.data;
};

export const refreshToken = async (refresh: string) => {
  const res = await axios.post(`${API_URL}/auth/refresh/`, { refresh });
  return res.data;
};

// ---------- PASSWORD RESET ----------
export const requestPasswordReset = async (email: string) => {
  return await axios.post(`${API_URL}/auth/password/reset/`, { email });
};

export const confirmPasswordReset = async (
  uid: string,
  token: string,
  new_password: string
) => {
  return await axios.post(`${API_URL}/auth/password/reset/confirm/`, {
    uid,
    token,
    new_password,
  });
};

// ---------- USER PROFILE ----------
export const getProfile = async (accessToken: string) => {
  const res = await axios.get(`${API_URL}/users/profile/`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

export const updateProfile = async (
  accessToken: string,
  data: { first_name?: string; last_name?: string; phone?: string }
) => {
  const res = await axios.put(`${API_URL}/users/profile/`, data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

// ---------- ADDRESSES ----------
export const getAddresses = async (accessToken: string) => {
  const res = await axios.get(`${API_URL}/users/addresses/`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

export const addAddress = async (
  accessToken: string,
  data: { city: string; street: string; state: string }
) => {
  const res = await axios.post(`${API_URL}/users/addresses/`, data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

export const updateAddress = async (
  accessToken: string,
  id: number,
  data: { city?: string; street?: string; state?: string }
) => {
  const res = await axios.put(`${API_URL}/users/addresses/${id}/`, data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

export const deleteAddress = async (accessToken: string, id: number) => {
  return await axios.delete(`${API_URL}/users/addresses/${id}/`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
