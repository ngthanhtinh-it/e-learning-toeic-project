import { useState } from 'react'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import axios from 'axios'

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' ,fullname: '', phone: ''})
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [activeTab, setActiveTab] = useState('login')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }
  
  const validateRegister = () => {
    const newErrors = {}
    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Vui lòng nhập họ và tên'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email'
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Vui lòng nhập mật khẩu'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateLogin = () => {
    const newErrors = {}
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email hoặc số điện thoại'
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Vui lòng nhập mật khẩu'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmitLogin = async (e) => {
    e.preventDefault()
    if (!validateLogin()) return
    const baseURL = 'http://localhost:5000/api/users'
    const endpoint = activeTab === 'login' ? `${baseURL}/login` : `${baseURL}/register`
    try {
      const response = await axios.post(endpoint, {
        email: formData.email,
        password: formData.password,
      })

      console.log('Thành Công:', response.data)
      // do something
    }
    catch (error) {
      console.error('Error API:', error)
      alert(error.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.')
    }

  }

  const handleSubmitRegister = async (e) => {
    e.preventDefault()
    if (!validateRegister()) return
    const baseURL = 'http://localhost:5000/api/users'
    const endpoint = activeTab === 'login' ? `${baseURL}/login` : `${baseURL}/register`
    try {
      const response = await axios.post(endpoint, {
        fullname: formData.fullname,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      })

      console.log('Thành Công:', response.data)
      // do something
    }
    catch (error) {
      console.error('Error API:', error)
      alert(error.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.')
    }
  }

  return (
    <>
      {/* Mobile Logo */}
      <div className="auth-mobile-logo">
        <a className="auth-logo" href="#">
          <span
            className="material-symbols-outlined auth-logo-icon"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            school
          </span>
          <span>IELTS Master VN</span>
        </a>
      </div>

      <div className="auth-form-wrapper">
        {/* Form Header */}
        <div className="auth-form-header">
          <h2 className="auth-form-title">Chào mừng trở lại</h2>
          <p className="auth-form-subtitle">
            Đăng nhập để tiếp tục lộ trình học của bạn.
          </p>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Đăng nhập
          </button>
          <button
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Đăng ký
          </button>
        </div>

        {/* Form Login */}
        {activeTab === 'login' && (
          <form onSubmit={handleSubmitLogin}>
            {/* Email Input */}
            <div className="auth-form-group">
              <Input
                label="Email hoặc Số điện thoại"
                id="email"
                name="email"
                icon="person"
                placeholder="Nhập email hoặc số điện thoại"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                className="auth-input"
              />
            </div>

            {/* Password Input */}
            <div className="auth-form-group">
              <div className="auth-input-wrapper" style={{ position: 'relative' }}>
                <Input
                  label="Mật khẩu"
                  id="password"
                  name="password"
                  icon="lock"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  className="auth-input"
                  iconRight={true}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="auth-password-toggle"
                >
                  <span className="material-symbols-outlined auth-password-toggle-icon">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="auth-actions">
              <label className="auth-checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="auth-checkbox"
                />
                <span className="auth-checkbox-label">Ghi nhớ đăng nhập</span>
              </label>
              <a href="#" className="auth-forgot-password">
                Quên mật khẩu?
              </a>
            </div>

            {/* Login Button */}
            <Button icon="arrow_forward" variant="primary">
              Đăng nhập
            </Button>
          </form>
        )}


        {/* Form Register */}
        {activeTab === 'register' && (
          <form onSubmit={handleSubmitRegister}>
            {/* Full Name Input */}
            <div>
              <Input
                label="Họ và tên"
                id="reg-fullname"
                name="fullname"
                icon="person"
                placeholder="Nhập họ và tên của bạn"
                value={formData.fullname}
                onChange={handleChange}
                error={errors.fullname}
              />
            </div>
            {/* Phone Input */}
            <div>
              <Input
                label="Số điện thoại"
                id="reg-phone"
                name="phone"
                icon="call"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />
            </div>
            {/* Email Input */}
            <div>
              <Input
                label="Email"
                id="reg-email"
                name="email"
                icon="mail"
                placeholder="Nhập địa chỉ email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
            </div>
            {/* Password Input */}
            <div>
              <Input
                label="Mật khẩu"
                id="reg-password"
                name="password"
                icon="lock"
                placeholder="mật khẩu"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                type="password"
              />
            </div>

            <Button icon="person_add" variant="primary">
              Đăng ký
            </Button>

          </form>
        )}


      </div>
    </>
  )
}