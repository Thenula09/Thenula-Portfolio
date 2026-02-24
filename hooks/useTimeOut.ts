import { useEffect } from 'react';

interface UseTimeOutProps {
  callback: () => void;
  duration: number;
  deps?: React.DependencyList;
}

export function useTimeOut({ callback, duration, deps = [] }: UseTimeOutProps) {
  useEffect(() => {
    const timer = setTimeout(callback, duration);
    return () => clearTimeout(timer);
  }, deps);
}
