import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import CreateTaskPage from './pages/CreateTaskPage'
import EditTaskPage from './pages/EditTaskPage'
import UserManagementPage from './pages/UserManagementPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tasks/create" element={<CreateTaskPage />} />
        <Route path="/tasks/edit/:id" element={<EditTaskPage />} />
        <Route path="/users" element={<UserManagementPage />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;