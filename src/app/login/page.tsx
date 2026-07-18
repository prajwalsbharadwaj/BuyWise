import * as React from 'react';
import { AuthForm } from '@/components/auth/AuthForm';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const resolvedParams = await searchParams;
  
  return (
    <div className="container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: 'calc(100vh - var(--header-height) - 300px)',
      padding: 'var(--space-12) 0' 
    }}>
      <AuthForm type="login" callbackUrl={resolvedParams?.callbackUrl || '/dashboard'} />
    </div>
  );
}
