import { forwardRef } from 'react'

const Input = forwardRef(function Input(
  { label, id, icon, type = 'text', error, iconRight = false, className = '', ...props },
  ref,
) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="auth-input-label">
          {label}
        </label>
      )}
      <div className="auth-input-wrapper" style={{ position: 'relative' }}>
        {icon && !iconRight && (
          <span className="auth-input-icon pointer-events-none">
            <span className="material-symbols-outlined text-[20px]">{icon}</span>
          </span>
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          className={`auth-input ${className}`}
          {...props}
        />
      </div>
      {error && <span className="auth-input-error">{error}</span>}
    </div>
  )
})

export default Input