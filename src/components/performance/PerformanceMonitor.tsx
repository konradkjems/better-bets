'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  isOnline: boolean;
  connectionSpeed: string;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    isOnline: true, // Default to true for SSR
    connectionSpeed: 'unknown'
  });
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    
    // Update online status after hydration
    setMetrics(prev => ({ ...prev, isOnline: navigator.onLine }));
    // Measure page load time
    const measureLoadTime = () => {
      if (typeof window !== 'undefined' && window.performance) {
        const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        
        setMetrics(prev => ({
          ...prev,
          loadTime: Math.round(loadTime)
        }));
      }
    };

    // Measure memory usage (if available)
    const measureMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const memoryUsage = Math.round(memory.usedJSHeapSize / 1024 / 1024); // MB
        
        setMetrics(prev => ({
          ...prev,
          memoryUsage
        }));
      }
    };

    // Detect connection speed
    const detectConnectionSpeed = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        const speed = connection.effectiveType || 'unknown';
        
        setMetrics(prev => ({
          ...prev,
          connectionSpeed: speed
        }));
      }
    };

    // Measure render time
    const measureRenderTime = () => {
      const startTime = performance.now();
      
      requestAnimationFrame(() => {
        const renderTime = performance.now() - startTime;
        setMetrics(prev => ({
          ...prev,
          renderTime: Math.round(renderTime)
        }));
      });
    };

    // Initial measurements
    measureLoadTime();
    measureMemory();
    detectConnectionSpeed();
    measureRenderTime();

    // Listen for online/offline changes
    const handleOnline = () => setMetrics(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setMetrics(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Update memory usage periodically
    const memoryInterval = setInterval(measureMemory, 5000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(memoryInterval);
    };
  }, []);

  // Only show in development and after hydration
  if (process.env.NODE_ENV !== 'development' || !isHydrated) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-gray-900 text-white p-3 rounded-lg shadow-lg text-xs">
      <div className="font-semibold mb-2">Performance Monitor</div>
      <div className="space-y-1">
        <div className="flex justify-between gap-4">
          <span>Load Time:</span>
          <span className={metrics.loadTime > 1000 ? 'text-red-400' : metrics.loadTime > 500 ? 'text-yellow-400' : 'text-green-400'}>
            {metrics.loadTime}ms
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Render Time:</span>
          <span className={metrics.renderTime > 16 ? 'text-red-400' : 'text-green-400'}>
            {metrics.renderTime}ms
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Memory:</span>
          <span className={metrics.memoryUsage > 50 ? 'text-red-400' : metrics.memoryUsage > 25 ? 'text-yellow-400' : 'text-green-400'}>
            {metrics.memoryUsage}MB
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Connection:</span>
          <span className={metrics.isOnline ? 'text-green-400' : 'text-red-400'}>
            {metrics.isOnline ? metrics.connectionSpeed : 'offline'}
          </span>
        </div>
      </div>
    </div>
  );
}

// Hook for performance monitoring
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    isOnline: navigator.onLine,
    connectionSpeed: 'unknown'
  });

  const measureRenderTime = (callback: () => void) => {
    const startTime = performance.now();
    callback();
    
    requestAnimationFrame(() => {
      const renderTime = performance.now() - startTime;
      setMetrics(prev => ({
        ...prev,
        renderTime: Math.round(renderTime)
      }));
    });
  };

  const logPerformance = (label: string, startTime: number) => {
    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);
    
    console.log(`Performance: ${label} took ${duration}ms`);
    
    if (duration > 100) {
      console.warn(`Slow operation detected: ${label} took ${duration}ms`);
    }
  };

  return {
    metrics,
    measureRenderTime,
    logPerformance
  };
}

// Performance optimization utilities
export const performanceUtils = {
  // Debounce function for performance
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // Throttle function for performance
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Lazy load images
  lazyLoadImage: (img: HTMLImageElement, src: string) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.src = src;
          observer.unobserve(img);
        }
      });
    });
    observer.observe(img);
  },

  // Preload critical resources
  preloadResource: (href: string, as: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  }
};
