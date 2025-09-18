import {Layout} from "antd";
import {MainMenu} from "../components/MainMenu/MainMenu.tsx";
import React from "react";
import {Outlet} from "react-router-dom";

const { Sider, Content } = Layout

export const MainLayout: React.FC =() => (
  <Layout style={{minHeight: '100vh'}}>
    <Sider width={256} style={{background: "#fff"}}>
      <MainMenu />
    </Sider>
    <Layout>
      <Content style={{display: 'flex', justifyContent: 'center', }}>
        <Outlet />
      </Content>
    </Layout>
    </Layout>
)
