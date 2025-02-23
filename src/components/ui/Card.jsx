export function Card({ children, className = "" }) {
    return (
      <div className={`shadow-lg p-6 bg-white rounded-2xl border ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ children, className = "" }) {
    return <div className={`text-center ${className}`}>{children}</div>;
  }
  