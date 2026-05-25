import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Logo Section */}
        <Link to="/" className="header-logo">
          {/* Bạn có thể thay bằng thẻ <img> nếu có logo từ file .png */}
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
          </svg>
          E-Learning
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav">
          <Link to="/courses" className="nav-link">Khóa học</Link>
          {/* <Link to="/dashboard" className="nav-link">Dashboard</Link> */}
          <Link to="/about" className="nav-link">Về chúng tôi</Link>
        </nav>

        {/* Desktop Actions (Login) */}
        <div className="header-actions">
          <Link to="/login">
            <button className="btn-login">Đăng nhập</button>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
          {isMobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            <Link to="/courses" className="mobile-nav-link">Khóa học</Link>
            {/* <Link to="/dashboard" className="mobile-nav-link">Dashboard</Link> */}
            <Link to="/about" className="mobile-nav-link">Về chúng tôi</Link>
          </nav>
          <div className="mobile-actions">
            <Link to="/login">
              <button className="btn-login mobile-btn">Đăng nhập</button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
