'use client';

import { HTMLAttributes } from 'react';

interface CenterProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Center({ children, className = '', ...props }: CenterProps) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
