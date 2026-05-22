export default function Button({ 
  children, 
  icon, 
  variant = 'primary',
  className = '', 
  ...props 
}) {
  const baseClass = 'auth-button'
  const variantClass = variant === 'primary' ? 'auth-button-primary' : 'auth-button-secondary'
  
  return (
    <button
      className={`${baseClass} ${variantClass} ${className}`}
      {...props}
    >
      {children}
      {icon && (
        <span className="material-symbols-outlined auth-button-icon">{icon}</span>
      )}
    </button>
  )
}