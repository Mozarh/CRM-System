import { TodoListPage } from './pages/TodoListPage.tsx';
import {ProfilePage} from "./pages/ProfilePage.tsx";
import { Routes, Route } from 'react-router-dom';
import {MainLayout} from "./components/Layout/Layout.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<TodoListPage />}/>
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default App;
