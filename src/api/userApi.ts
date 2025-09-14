import axios, {type AxiosError} from 'axios';
import type {
  AuthData,
  Profile,
  RefreshToken,
  Token,
  UserRegistration
} from "../types/userTypes.ts";
import {tokenManager} from "./TokenManager.ts";

const API_URL = 'https://easydev.club/api/v1';

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
})

instance.interceptors.request.use((config) => {
  const token = tokenManager.getAccessToken()
  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
})

export async function registerUser(data: UserRegistration): Promise<Profile> {
  try {
    const response = await instance.post<Profile>(`/auth/signup`, data)
    return response.data
  } catch (err) {
    const error = err as AxiosError<{message?: string}>;

    if (error.response?.status === 400) {
      throw new Error('400 Bad Request: Ошибка десериализации запроса или неверный ввод.');
    } else if (error.response?.status === 409) {
      throw new Error(error.response.data?.message || '409 Conflict: Пользователь уже существует.');
    } else if (error.response?.status === 500) {
      throw new Error('500 Internal Server Error: Внутренняя ошибка сервера.');
    } else {
      throw new Error(error.message);
    }
  }
}

export async function loginUser(data: AuthData): Promise<Token> {
  try {
    const response = await instance.post<Token>(`/auth/signin`, data)
    return response.data
  } catch (err) {
    const error = err as AxiosError<{message?: string}>;

    if (error.response?.status === 400) {
      throw new Error('400 Bad Request: Ошибка десериализации запроса или неверный ввод.');
    } else if (error.response?.status === 401) {
      throw new Error('401 Unauthorized: Неверные учетные данные.');
    } else if (error.response?.status === 500) {
      throw new Error('500 Internal Server Error: Внутренняя ошибка сервера.');
    } else {
      throw new Error(error.message);
    }
  }
}

export async function refreshToken(data: RefreshToken): Promise<Token> {
  try {
    const response = await instance.post<Token>(`/auth/refresh`, data)
    return response.data
  } catch (err) {
    const error = err as AxiosError<{message?: string}>

    if (error.response?.status === 400) {
      throw new Error('400 Bad Request: Ошибка десериализации запроса.');
    } else if (error.response?.status === 401) {
      throw new Error('401 Unauthorized: Неверные учетные данные или токен истек.');
    } else if (error.response?.status === 500) {
      throw new Error('500 Internal Server Error: Внутренняя ошибка сервера.');
    } else {
      throw new Error(error.message);
    }
  }
}

export async function getProfile(): Promise<Profile>{
  try {
    const response = await instance.get<Profile>(`/user/profile`)
    return response.data
  } catch (err) {
    const error = err as AxiosError<{message?:string}>
    if (error.response?.status === 400) {
      throw new Error('400 Bad Request: Пользователь не найден.');
    } else if (error.response?.status === 500) {
      throw new Error('500 Internal Server Error: Внутренняя ошибка сервера.');
    } else {
      throw new Error(error.message);
    }
  }
}

export async function logout(): Promise<void> {
  await instance.post(`/user/logout`)
}