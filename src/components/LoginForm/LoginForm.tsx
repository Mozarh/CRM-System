import { Button, Checkbox, Flex, Form, Input, Typography, message } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type {AuthData} from "../../types/userTypes.ts";
import {loginUser, setAuthToken} from "../../api/userApi.ts";

const { Text } = Typography;

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values:AuthData) => {
    try {
      const tokens = await loginUser(values);
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      setAuthToken(tokens.accessToken);

      message.success("Успешная аутентификация");
      navigate('/');
    } catch (err) {
      const error = err as Error
      message.error(error.message)
      }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Login"
        name="login"
        rules={[
          { required: true, message: 'Please, enter your login.' },
          { min: 2, message: 'Minimum of 2 characters' },
          { max: 60, message: 'Maximum of 60 characters' },
          { pattern: /^[a-zA-Z0-9]+$/, message: 'Only Latin letters and numbers' },
        ]}
      >
        <Input
          placeholder="username111"
          style={{ borderRadius: 5, borderColor: '#DED2D9' }}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please, input your password!' },
          { min: 6, message: 'Minimum of 6 characters' },
        ]}
      >
        <Input.Password
          style={{ borderRadius: 5, borderColor: '#DED2D9' }}
          placeholder="******"
        />
      </Form.Item>

      <Flex justify="space-between" align="center" style={{ marginBottom: 20 }}>
        <Checkbox style={{ color: '#A1A1A1' }}>Remember me</Checkbox>
        <Link to="/forgot" style={{ color: '#7F265B' }}>
          Forgot Password?
        </Link>
      </Flex>

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
          Login
        </Button>
      </Form.Item>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 14,
          display: 'block',
          marginTop: 120,
        }}
      >
        Not registered yet?
        <Link to="/register" style={{ color: '#7F265B' }}>
          {' '}
          Create an account
        </Link>
      </Text>
    </Form>
  );
};
