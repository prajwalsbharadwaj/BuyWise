import * as React from 'react';
import styles from './Loading.module.css';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ width = '100%', height = '20px', borderRadius = 'var(--radius-sm)', className = '', style }: SkeletonProps) {
  return (
    <div 
      className={`${styles.skeleton} ${className}`} 
      style={{ width, height, borderRadius, ...style }} 
      aria-hidden="true"
    />
  );
}

export function CardSkeleton() {
  return (
    <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: 'var(--space-6)', backgroundColor: 'var(--bg-primary)' }}>
      <Skeleton width="40%" height="24px" style={{ marginBottom: 'var(--space-4)' }} />
      <Skeleton width="100%" height="16px" style={{ marginBottom: 'var(--space-2)' }} />
      <Skeleton width="100%" height="16px" style={{ marginBottom: 'var(--space-2)' }} />
      <Skeleton width="80%" height="16px" style={{ marginBottom: 'var(--space-6)' }} />
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        <Skeleton width="100px" height="36px" borderRadius="var(--radius-md)" />
        <Skeleton width="100px" height="36px" borderRadius="var(--radius-md)" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <Skeleton width="30%" height="20px" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{ padding: 'var(--space-4)', borderBottom: i < rows - 1 ? '1px solid var(--border-color)' : 'none', display: 'flex', gap: 'var(--space-4)' }}>
          <Skeleton width="20%" height="20px" />
          <Skeleton width="40%" height="20px" />
          <Skeleton width="15%" height="20px" />
          <Skeleton width="25%" height="20px" />
        </div>
      ))}
    </div>
  );
}
