import * as React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { LayoutDashboard, FileText, Settings, LogOut, CheckCircle, Building2 } from 'lucide-react';
import styles from './layout.module.css';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {session.user.image ? (
                <img src={session.user.image} alt={session.user.name || 'User'} />
              ) : (
                <span>{session.user.name?.charAt(0) || 'U'}</span>
              )}
            </div>
            <div className={styles.userDetails}>
              <span className={styles.userName}>{session.user.name}</span>
              <span className={styles.userEmail}>{session.user.email}</span>
            </div>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          <Link href="/dashboard" className={`${styles.navItem} ${styles.active}`}>
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </Link>
          
          {(session.user as any).role === 'BUYER' && (
            <>
              <Link href="/dashboard/buyer/searches" className={styles.navItem} style={{ opacity: 0.5 }}>
                <FileText size={20} />
                <span>Saved Searches</span>
                <span style={{ position: 'absolute', right: '12px', fontSize: '9px', backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-700)', padding: '2px 4px', borderRadius: '4px', fontWeight: 'bold' }}>v2.0</span>
              </Link>
              <Link href="/dashboard/transactions" className={styles.navItem}>
                <CheckCircle size={20} />
                <span>My Transactions</span>
              </Link>
            </>
          )}

          {(session.user as any).role === 'SELLER' && (
            <>
              <Link href="/dashboard/seller/listings" className={styles.navItem}>
                <Building2 size={20} />
                <span>My Listings</span>
              </Link>
              <Link href="/dashboard/seller/leads" className={styles.navItem} style={{ opacity: 0.5 }}>
                <FileText size={20} />
                <span>Leads & Offers</span>
                <span style={{ position: 'absolute', right: '12px', fontSize: '9px', backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-700)', padding: '2px 4px', borderRadius: '4px', fontWeight: 'bold' }}>v2.0</span>
              </Link>
              <Link href="/dashboard/transactions" className={styles.navItem}>
                <CheckCircle size={20} />
                <span>My Transactions</span>
              </Link>
            </>
          )}

          {(session.user as any).role === 'SERVICE_PROVIDER' && (
            <>
              <Link href="/dashboard/partner" className={styles.navItem}>
                <CheckCircle size={20} />
                <span>My Assignments</span>
              </Link>
            </>
          )}

          <div className={styles.navDivider} />
          <div className={styles.navItem} style={{ opacity: 0.5, cursor: 'not-allowed', position: 'relative' }}>
            <Settings size={20} />
            <span>Settings</span>
            <span style={{ position: 'absolute', right: '12px', fontSize: '9px', backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-700)', padding: '2px 4px', borderRadius: '4px', fontWeight: 'bold' }}>v2.0</span>
          </div>
        </nav>
        
        <div className={styles.sidebarFooter}>
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className={styles.logoutBtn}>
              <LogOut size={20} />
              <span>Log out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {children}
        </div>
      </main>
    </div>
  );
}
