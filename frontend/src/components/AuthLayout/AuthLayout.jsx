import '../../features/auth/styles/auth.css'

export default function AuthLayout({ children }) {
  return (
    <div className="auth-container bg-background text-on-background">
      <div className="auth-card bg-surface-container-lowest">
        {/* Left Panel - Brand / Illustration Area */}
        <div className="auth-left-panel">
          <div className="auth-left-header">
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

          <div className="auth-left-content">
            <h2 className="auth-left-heading">Nâng tầm tri thức Việt.</h2>
            <p className="auth-left-description">
              Bắt đầu hành trình chinh phục IELTS với lộ trình cá nhân hóa, tài
              liệu độc quyền và phương pháp học tiên tiến nhất.
            </p>
          </div>

          <div className="auth-left-illustration">
            <img
              alt="A diverse group of university students studying together in a modern, brightly lit library space. They are looking at a laptop screen with expressions of focus and collaboration."
              className="auth-left-image"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA-mteBqcwNQBQFaenBE2xOot32XmK1XTwXiNcF0orj0Sh4rHGinyVyYQXIVyS9-i9Pt-uemgZVeDLHisWrUAQsSfmMU_3uMIHE_c5XvgMoG_BoOUgmtCr1QGduzjiPQwBThJVVJ52WpQHhxl4jsKYHuMSGVi95M-6ahTggQfT2tkoJBSCf8En64vbBhZJ8SG1x8X_FBqa_ZSzV3Lc7bpWxIsTo7-6EmXDdmooqEtXpf6hDHLGmFZevof9klNOPvVtYrj4A3cV7IY"
            />
          </div>
        </div>

        {/* Right Panel - Form Area */}
        <div className="auth-right-panel">{children}</div>
      </div>
    </div>
  )
}