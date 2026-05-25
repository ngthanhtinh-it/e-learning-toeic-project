import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/Home/LoginPage'
import { HomePage } from '../pages/Home/HomePage'
import UserProfile from '../pages/Profile/UserProfile'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="*" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="*" element={<Navigate to="/login" replace />} />" */}
      <Route path="/profile-user" element={<UserProfile />} />
    </Routes>
  )
}