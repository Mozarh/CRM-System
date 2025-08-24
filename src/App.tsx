import { TodoListPage } from './pages/TodoListPage.tsx';
import {ProfilePage} from "./pages/ProfilePage.tsx";
import {Sidebar} from "./components/Sidebar/Sidebar.tsx";
import { Routes, Route } from 'react-router-dom';
import {Layout} from "antd";

const { Sider, Content } = Layout

function App() {
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider width={256} style={{background: "#fff"}}>
        <Sidebar />
      </Sider>
      <Layout>
        <Content style={{display: 'flex', justifyContent: 'center', paddingTop: 10}}>
          <Routes>
            <Route path="/" element={<TodoListPage />} />
            <Route path="/profile" element={ <ProfilePage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App;
