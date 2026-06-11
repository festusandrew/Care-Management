import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-100 p-6 ${className}`}>
      {title && (
        <h3 className="text-lg text-gray-900 mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
}