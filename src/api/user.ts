import axios, {type AxiosError} from 'axios';
import type {
  AuthData,
  Profile,
  RefreshToken,
  Token,
  UserRegistration
} from "../types/user.ts";
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

function getError(err: unknown) {
  const error = err as AxiosError<{message?: string}>;

  if(!error.response) {
    return new Error(error.message)
  }

  switch (error.response.status) {
    case 400:
      return new Error("400 Bad Request: Ошибка десериализации запроса или неверный ввод.")
    case 401:
      throw new Error('401 Unauthorized: Неверные учетные данные.')
    case 409:
      return new Error(error.response.data?.message || '409 Conflict: Пользователь уже существует.')
    case 500:
      return new Error('500 Internal Server Error: Внутренняя ошибка сервера.')
    default:
      return new Error(error.response.data?.message || error.message)
  }
}

export async function registerUser(data: UserRegistration): Promise<Profile> {
  try {
    const response = await instance.post<Profile>(`/auth/signup`, data)
    return response.data
  } catch (err) {
    throw getError(err)
  }
}

export async function loginUser(data: AuthData): Promise<Token> {
  try {
    const response = await instance.post<Token>(`/auth/signin`, data)
    return response.data
  } catch (err) {
    throw getError(err)
  }
}

export async function refreshToken(data: RefreshToken): Promise<Token> {
  try {
    const response = await instance.post<Token>(`/auth/refresh`, data)
    return response.data
  } catch (err) {
    throw getError(err)
  }
}

export async function getProfile(): Promise<Profile>{
  try {
    const response = await instance.get<Profile>(`/user/profile`)
    return response.data
  } catch (err) {
    throw getError(err)
  }
}

export async function logout(): Promise<void> {
  try {
    await instance.post(`/user/logout`)
  } catch (err) {
    throw getError(err)
  }
}