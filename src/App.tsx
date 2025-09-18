import { TodoListPage } from './pages/TodoListPage.tsx';
import {LoginPage} from "./pages/LoginPage.tsx";
import { Routes, Route } from 'react-router-dom';
import {MainLayout} from "./layout/MainLayout.tsx";
import {RegisterPage} from "./pages/RegisterPage.tsx";
import {PrivateRoute} from "./routes/PrivateRoute/PrivateRoute.tsx";
import {ProfilePage} from "./pages/ProfilePage.tsx";
import {AuthLayout} from "./layout/AuthLayout.tsx";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />}/>
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<PrivateRoute><TodoListPage /></PrivateRoute>}/>
        <Route path='/account' element={<PrivateRoute><ProfilePage /></PrivateRoute>}/>
      </Route>
    </Routes>
  )
}

export default App;
