import {Layout} from "antd";
import {MainMenu} from "../MainMenu/MainMenu.tsx";
import React from "react";

const { Sider, Content } = Layout

export const MainLayout: React.FC<{children: React.ReactNode}> =({children}) => (
  <Layout style={{minHeight: '100vh'}}>
    <Sider width={256} style={{background: "#fff"}}>
      <MainMenu />
    </Sider>
    <Layout>
      <Content style={{display: 'flex', justifyContent: 'center', paddingTop: 10}}>
        {children}
      </Content>
    </Layout>
    </Layout>
)
