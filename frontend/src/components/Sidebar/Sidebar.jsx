import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  // Lấy đường dẫn hiện tại để highlight menu đang active
  const location = useLocation();

  // Danh sách các menu item để dễ dàng map và render
  const navItems = [
    { path: '/dashboard', icon: 'school', label: 'Khóa học của tôi' },
    { path: '/schedule', icon: 'calendar_today', label: 'Lịch học' },
    { path: '/quiz-results', icon: 'assignment_turned_in', label: 'Kết quả Quiz' },
    { path: '/transactions', icon: 'receipt_long', label: 'Giao dịch' },
    { path: '/profile', icon: 'person', label: 'Hồ sơ' },
  ];

  const handleLogout = () => {
    // Thêm logic đăng xuất ở đây (xóa token, chuyển hướng về /login...)
    console.log('Đăng xuất...');
  };

  return (
    <nav className="bg-surface-container-low dark:bg-surface-container-lowest text-primary dark:text-primary-fixed w-72 fixed left-0 top-0 border-r border-outline-variant dark:border-none shadow-sm flex-col gap-sm p-md h-screen z-10 hidden md:flex sidebar-container">
      {/* Header - Thông tin User */}
      <div className="mb-lg mt-md px-4 flex items-center gap-md">
        <img
          alt="Student Avatar"
          className="w-12 h-12 rounded-full object-cover border-2 border-surface-container-high"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsJtqSrseD2f2usmLHuG67xzP0YzeWssOBI00HlF_Vo9fJwZczhjj7MllD7Nm9IOorLyVWNddXFk8p4JUV_Wvus2lDuJtLZr0sIrdvZz2VFPS5w36sr8IU3eLR-34tY-59hgYCvOKcAn12zBmzCBd24MKMN06_jL7lc_3DvvlgCWnrv_Da6Dklry2CBQFng_N2NLgW-LHAqdTIcBCTRxnbo-29w1d5B9d2NLXZFmHRdJtZRK03HmRY6RhZvlQWFAc-7dBezPtJeYs"
        />
        <div>
          <h2 className="font-h3 text-h3 font-bold text-primary">Học viên</h2>
          <p className="font-body-sm text-caption text-on-surface-variant">Lộ trình IELTS 7.5</p>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="flex flex-col gap-xs flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg gap-md font-label-md text-label-md transition-all active:scale-[0.98] ${
                  isActive
                    ? 'bg-secondary-container text-on-secondary-container font-bold'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span
                  className="material-symbols-outlined sidebar-link-icon"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Footer - Nút Đăng xuất */}
      <div className="mt-auto px-4 py-md border-t border-outline-variant">
        <button
          onClick={handleLogout}
          className="flex items-center gap-sm text-error font-label-md text-label-md hover:opacity-80 transition-opacity w-full text-left"
        >
          <span className="material-symbols-outlined">logout</span>
          Đăng xuất
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
