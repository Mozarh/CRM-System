import React from 'react'
import {Button, type GetProp, Menu, type MenuProps} from "antd";
import {ScheduleOutlined, UserOutlined, HarmonyOSOutlined, LogoutOutlined} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import {logout, setAuthToken} from "../../api/userApi.ts";

const items: MenuItem[] = [
  {
    key: '/login',
    icon: <HarmonyOSOutlined />,
    label: 'Страница входа',
  },
  {
    key: '/account',
    icon: <UserOutlined />,
    label: 'Личный кабинет',
  },
  {
    key: '/',
    icon: <ScheduleOutlined />,
    label: 'Список задач',
  },
]

type MenuItem = GetProp<MenuProps, 'items'>[number];

export const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const selectedKey = pathname.startsWith('/login') ? '/login' : pathname

  const handleLogout = async () => {
    try {
      await logout()
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setAuthToken(null);
      navigate('/login');
    }
  }

  return (
    <>
      <Menu
        mode="inline"
        onClick={({key}) => navigate(key)}
        style={{ width: 256 }}
        items={items}
        selectedKeys={[selectedKey]}
      />
      <Button
        type="primary"
        icon={<LogoutOutlined />}
        style={{
          width: "90%",
          margin: 16,
          backgroundColor: "#1677ff",
          borderColor: "white"
        }}
        onClick={handleLogout}
      >
        Выйти
      </Button>
    </>
  )
}