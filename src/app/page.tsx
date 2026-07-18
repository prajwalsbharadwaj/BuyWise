import Link from 'next/link';

export default function Home() {
  return (
    <main className="container" style={{ padding: 'var(--space-8) 0', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
        <img src="/logo.png" alt="BuyWise Logo" style={{ height: '240px', width: 'auto', objectFit: 'contain' }} />
      </div>
      <h1 style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}>BuyWise</h1>
      <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-xl)' }}>
        India's most trusted real estate transaction platform.
      </p>
      
      <div style={{ marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
        <Link href="/services" style={{ textDecoration: 'none' }}>
          <button style={{
            padding: 'var(--space-3) var(--space-6)',
            backgroundColor: 'var(--color-primary-500)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontWeight: 'var(--weight-medium)',
            cursor: 'pointer'
          }}>
            Explore Services
          </button>
        </Link>
      </div>
    </main>
  );
}
