'use client';

import * as React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { LogOut, User, Settings, Briefcase, ShieldAlert } from 'lucide-react';
import styles from './UserDropdown.module.css';

interface UserDropdownProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

export function UserDropdown({ user }: UserDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'ADMIN': return <span className={`${styles.badge} ${styles.adminBadge}`}>Admin</span>;
      case 'SERVICE_PROVIDER': return <span className={`${styles.badge} ${styles.partnerBadge}`}>Partner</span>;
      default: return <span className={`${styles.badge} ${styles.customerBadge}`}>Customer</span>;
    }
  };

  const getDashboardLink = (role?: string) => {
    switch (role) {
      case 'ADMIN': return '/admin/dashboard';
      case 'SERVICE_PROVIDER': return '/dashboard/partner';
      default: return '/dashboard';
    }
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button 
        className={styles.trigger} 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {user.image ? (
          <img src={user.image} alt={user.name || 'User'} className={styles.avatar} />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {user.name?.charAt(0) || <User size={16} />}
          </div>
        )}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.header}>
            <p className={styles.name}>{user.name}</p>
            <p className={styles.email}>{user.email}</p>
            <div style={{ marginTop: 'var(--space-2)' }}>
              {getRoleBadge(user.role)}
            </div>
          </div>
          
          <div className={styles.menu}>
            <Link href={getDashboardLink(user.role)} className={styles.menuItem} onClick={() => setIsOpen(false)}>
              <Briefcase size={16} />
              My Dashboard
            </Link>
            
            {user.role === 'ADMIN' && (
              <Link href="/admin/dashboard" className={styles.menuItem} onClick={() => setIsOpen(false)}>
                <ShieldAlert size={16} />
                Admin Console
              </Link>
            )}

            <Link href="/settings" className={styles.menuItem} onClick={() => setIsOpen(false)}>
              <Settings size={16} />
              Account Settings
            </Link>
            
            <div className={styles.divider} />
            
            <button 
              className={`${styles.menuItem} ${styles.logoutBtn}`}
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: '/' });
              }}
            >
              <LogOut size={16} />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
