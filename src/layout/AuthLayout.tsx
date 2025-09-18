import React from 'react';
import { Typography, Flex } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';

const { Title, Text } = Typography;

export const AuthLayout: React.FC = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const rightTitle = isLogin ? "Login to your Account" : "Create your Account"
  const rightSubtitle = isLogin
    ? "See what is going on with your business"
    : "Please fill in the form to continue"

  return (
    <Flex
      style={{ height: '100vh', backgroundColor: '#FFE6C9' }}
      justify="center"
    >
      <Flex
        style={{
          maxWidth: 1000,
          width: '90%',
          background: '#fff',
          borderRadius: 10,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        {/*Левая Часть*/}
        <Flex
          flex={1.4}
          vertical
          align="center"
          justify="flex-end"
          style={{
            backgroundColor: '#FFE6C9',
            padding: '0px 40px 32px',
            position: 'relative',
          }}
        >
          <img
            src="/skeleton.png"
            alt="skeleton"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Title level={4} style={{ color: '#73114B', margin: 0 }}>
              Turn your ideas into reality.
            </Title>
            <Text style={{ color: '#73114B', fontSize: 14 }}>
              Start for free and get attractive offers from the community
            </Text>
          </div>
        </Flex>

        {/*Правая Часть*/}
        <Flex
          flex={1.0}
          vertical
          style={{
            padding: '40px 60px 20px',
            height: '100%',
            maxHeight: '100vh',
            overflowY: 'auto',
          }}
        >
          <img
            src="/login.svg"
            alt="Login icon"
            style={{ width: 48, height: 48, marginBottom: 36 }}
          />
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <Title level={2} style={{ margin: 0, color: '#525252' }}>
              {rightTitle}
            </Title>
            <Text type="secondary" style={{ fontSize: 14, color: '#7D7D7D' }}>
              {rightSubtitle}
            </Text>
          </div>
          <Outlet />
        </Flex>
      </Flex>
    </Flex>
  );
};
