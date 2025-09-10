import { TodoListPage } from './pages/TodoListPage.tsx';
import {LoginPage} from "./pages/LoginPage.tsx";
import { Routes, Route } from 'react-router-dom';
import {MainLayout} from "./components/Layout/MainLayout.tsx";
import {RegisterPage} from "./pages/RegisterPage.tsx";
import {PrivateRoute} from "./components/PrivateRoute/PrivateRoute.tsx";
import {ProfileAccount} from "./components/ProfileAccount/ProfileAccount.tsx";

function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />}/>

      <Route path="/" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
        <Route index element={<TodoListPage />}/>
        <Route path='/account' element={<ProfileAccount />}/>
      </Route>
    </Routes>
  )
}

export default App;
