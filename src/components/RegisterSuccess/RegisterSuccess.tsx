import React from 'react';
import {Button, Space, Typography} from "antd";
import {Link} from "react-router-dom";

interface RegisterSuccessProps {
  redirectPath?: string;
  buttonText?: string;
}

const { Title, Text } = Typography;

export const RegisterSuccess: React.FC<RegisterSuccessProps> = ({
  redirectPath = '/login',
  buttonText = 'СЮДООО',
}) => {
  return (
    <Space
      direction="vertical"
      size="middle"
      style={{ width: '100%', textAlign: 'center' }}
    >
      <Title level={4} style={{color:'#525252'}}>
        Регистрация прошла успешно
      </Title>
      <Text>Переходите к авторизации по кнопке:</Text>
      <Button
        type='primary'
        style={{background: "#73114B", borderColor: "#73114B"}}
      >
        <Link to={redirectPath} style={{color: '#fff'}}>{buttonText}</Link>
      </Button>
    </Space>
  )
};
