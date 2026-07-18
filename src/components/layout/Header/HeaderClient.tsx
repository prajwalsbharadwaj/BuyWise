'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { Menu, X, ShieldAlert } from 'lucide-react';
import styles from './Header.module.css';
import { UserDropdown } from './UserDropdown';

export function HeaderClient({ session, isAdmin }: { session: any, isAdmin: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo}>
          <img src="/Logo-horizontal.png" alt="BuyWise Logo" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
        </Link>

        <nav className={styles.desktopNav}>
          <Link href="/services" className={styles.navLink}>Services</Link>
          <div className={styles.navLink} style={{ opacity: 0.5, cursor: 'not-allowed', position: 'relative' }}>
            Localities
            <span style={{ position: 'absolute', top: '-8px', right: '-20px', fontSize: '9px', backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-700)', padding: '2px 4px', borderRadius: '4px', fontWeight: 'bold' }}>v2.0</span>
          </div>
          <Link href="/pricing" className={styles.navLink}>Pricing</Link>
          <Link href="/help" className={styles.navLink}>Help</Link>
        </nav>

        <div className={styles.actions}>
          {session ? (
            <UserDropdown user={{
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
              role: (session.user as any).role
            }} />
          ) : (
            <>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <Button variant="ghost" className={styles.loginBtn}>Log In</Button>
              </Link>
              <Link href="/properties" style={{ textDecoration: 'none' }}>
                <Button variant="primary" className={styles.signupBtn}>Get Started</Button>
              </Link>
            </>
          )}
          <button 
            className={styles.mobileMenuBtn} 
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className={styles.mobileMenuOverlay}>
          <div className={styles.mobileMenuHeader}>
            <img src="/Logo-horizontal.png" alt="BuyWise Logo" style={{ height: '32px' }} />
            <button className={styles.mobileMenuBtn} onClick={() => setMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className={styles.mobileNav}>
            <Link href="/services" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <div className={styles.mobileNavLink} style={{ opacity: 0.5, cursor: 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              Localities
              <span style={{ fontSize: '10px', backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-700)', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>Next Release</span>
            </div>
            <Link href="/pricing" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link href="/help" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Help Center</Link>
            
            {!session && (
              <div style={{ marginTop: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <Link href="/login" style={{ textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" style={{ width: '100%' }}>Log In</Button>
                </Link>
                <Link href="/properties" style={{ textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" style={{ width: '100%' }}>Get Started</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
