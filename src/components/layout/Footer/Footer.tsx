import * as React from 'react';
import Link from 'next/link';
import { Building2 } from 'lucide-react';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.topSection}>
          <div className={styles.brandSection}>
            <Link href="/" className={styles.logo}>
              <img src="/Logo-horizontal.png" alt="BuyWise Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
            </Link>
            <p className={styles.tagline}>
              India's most trusted real estate transaction platform. We bring intelligence and verification to your property journey.
            </p>
          </div>

          <div className={styles.linksSection}>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkHeader}>Platform</h4>
              <Link href="/services" className={styles.link}>Services</Link>
              <Link href="/localities" className={styles.link}>Localities</Link>
              <Link href="/pricing" className={styles.link}>Pricing</Link>
              <Link href="/verification" className={styles.link}>Verification</Link>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.linkHeader}>Company</h4>
              <Link href="/about" className={styles.link}>About Us</Link>
              <Link href="/contact" className={styles.link}>Contact</Link>
              <Link href="/careers" className={styles.link}>Careers</Link>
              <Link href="/blog" className={styles.link}>Blog</Link>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.linkHeader}>Trust</h4>
              <Link href="/trust" className={styles.link}>Trust Center</Link>
              <Link href="/how-it-works" className={styles.link}>How It Works</Link>
              <Link href="/methodology" className={styles.link}>Methodology</Link>
              <Link href="/data-sources" className={styles.link}>Data Sources</Link>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.linkHeader}>Legal</h4>
              <Link href="/legal/terms" className={styles.link}>Terms of Service</Link>
              <Link href="/legal/privacy" className={styles.link}>Privacy Policy</Link>
              <Link href="/legal/refunds" className={styles.link}>Refund Policy</Link>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            &copy; {currentYear} Prajwal Tech Solution Limited. All rights reserved.
          </p>
          <div className={styles.disclaimer}>
            BuyWise provides facilitation services. We are not a legal firm or real estate broker.
          </div>
        </div>
      </div>
    </footer>
  );
}
