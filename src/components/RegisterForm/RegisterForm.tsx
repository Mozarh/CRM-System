import { Button, Form, Input, Typography, message } from 'antd';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import type {UserRegistration} from "../../types/userTypes.ts";
import {registerUser} from "../../api/userApi.ts";
import {RegisterSuccess} from "../RegisterSuccess/RegisterSuccess.tsx";

const { Text } = Typography;

export const RegisterForm: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);

  const onFinish = async (
    values:UserRegistration & { confirmPassword: string }
  ) => {
    try {
      const { confirmPassword: _, ...data } = values;
      await registerUser(data);
      setIsRegister(true);
      message.success("Успешная регистрация");
    } catch (err) {
      const error = err as Error
      message.error(error.message)
    }
  };

  if(isRegister){
    return <RegisterSuccess />
  }

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Имя пользователя"
        name="username"
        rules={[
          { required: true, message: 'Please, enter your username.' },
          { min: 1, message: 'Minimum of 1 characters' },
          { max: 60, message: 'Maximum of 60 characters' },
          { pattern: /^[a-zA-Zа-яА-ЯёЁ\s]+$/, message: 'Only letters' },
        ]}
      >
        <Input
          placeholder="IVAN IVANOV"
          style={{ borderRadius: 5, borderColor: '#DED2D9' }}
        />
      </Form.Item>
      <Form.Item
        label="Логин"
        name="login"
        rules={[
          { required: true, message: 'Please, enter your login.' },
          { min: 2, message: 'Minimum of 2 characters' },
          { max: 60, message: 'Maximum of 60 characters' },
          { pattern: /^[a-zA-Z]+$/, message: 'Only Latin letters' },
        ]}
      >
        <Input
          placeholder="username"
          style={{ borderRadius: 5, borderColor: '#DED2D9' }}
        />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          { required: true, message: 'Please, input your password!' },
          { min: 6, message: 'Minimum of 6 characters' },
          { max: 60, message: 'Maximum of 60 characters' },
        ]}
      >
        <Input.Password
          style={{ borderRadius: 5, borderColor: '#DED2D9' }}
          placeholder="******"
        />
      </Form.Item>
      <Form.Item
        label="Повторите пароль"
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: 'Repeat the password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if(!value || getFieldValue("password") === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error("Passwords do not match")
              )
            }
          })
        ]}
      >
        <Input.Password
          style={{ borderRadius: 5, borderColor: '#DED2D9' }}
          placeholder="******"
        />
      </Form.Item>
      <Form.Item
        label="Почтовый адрес"
        name="email"
        rules={[
          { required: true, message: 'Please, enter your email.' },
          {type: 'email', message: 'Incorrect mail format.' },
        ]}
      >
        <Input
          placeholder="mail@abc.ru"
          style={{ borderRadius: 5, borderColor: '#DED2D9' }}
        />
      </Form.Item>
      <Form.Item
        label="Телефон"
        name="phoneNumber"
        rules={[
          {pattern: /^(\+7|8)\d{10}$/, message: 'Enter the correct phone number.' },
        ]}
      >
        <Input
          placeholder="+7XXXXXXXXXX"
          style={{ borderRadius: 5, borderColor: '#DED2D9' }}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          style={{
            background: '#73114B',
            borderColor: '#73114B',
            height: 40,
          }}
        >
          Register
        </Button>
      </Form.Item>
      <Text style={{ textAlign: 'center', fontSize: 12 }}>
        Do you already have an account?
        <Link to="/login" style={{ color: '#7F265B' }}>
          {' '}
          Login
        </Link>
      </Text>
    </Form>
  )
}