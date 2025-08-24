import React from 'react'
import {type GetProp, Menu, type MenuProps} from "antd";
import {ScheduleOutlined, UserOutlined} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const items: MenuItem[] = [
  {
    key: '/',
    icon: <ScheduleOutlined />,
    label: 'Список задач',
  },
  {
    key: '/profile',
    icon: <UserOutlined />,
    label: 'Профиль',
  },
]

type MenuItem = GetProp<MenuProps, 'items'>[number];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const selectedKey = pathname.startsWith('/profile') ? '/profile' : '/todos'

  return (
    <Menu
      mode="inline"
      onClick={({key}) => navigate(key)}
      style={{ width: 256 }}
      items={items}
      selectedKeys={[selectedKey]}
    />
  )
}