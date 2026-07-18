'use client';

import * as React from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/Button/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card/Card';
import styles from './AuthForm.module.css';

interface AuthFormProps {
  type?: 'login' | 'register';
  callbackUrl?: string;
}

export function AuthForm({ type = 'login', callbackUrl = '/dashboard' }: AuthFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl });
    } catch (error) {
      console.error('Sign in error:', error);
      setIsLoading(false);
    }
  };

  const handleMockSignIn = async (accountId: string) => {
    setIsLoading(true);
    try {
      // "mock" is the ID of the custom Credentials provider we created
      await signIn('mock', { callbackUrl, redirect: true, accountId });
    } catch (error) {
      console.error('Sign in error:', error);
      setIsLoading(false);
    }
  };

  return (
    <Card glass className={styles.card}>
      <CardHeader>
        <CardTitle>{type === 'login' ? 'Welcome back' : 'Create an account'}</CardTitle>
        <CardDescription>
          {type === 'login' 
            ? 'Sign in to access your property transactions.' 
            : 'Join India\'s most trusted real estate platform.'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className={styles.content}>
        <Button 
          variant="outline" 
          size="lg" 
          className={styles.googleBtn}
          onClick={handleGoogleSignIn}
          isLoading={isLoading}
          leftIcon={
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          }
        >
          Continue with Google
        </Button>
        
        <div className={styles.divider}>
          <span>or for testing</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
          <Button 
            variant="secondary" 
            style={{ width: '100%' }}
            onClick={() => handleMockSignIn('buyer')}
            isLoading={isLoading}
          >
            Login as Customer
          </Button>
          <Button 
            variant="secondary" 
            style={{ width: '100%' }}
            onClick={() => handleMockSignIn('seller')}
            isLoading={isLoading}
          >
            Login as Seller
          </Button>
          <Button 
            variant="secondary" 
            style={{ width: '100%' }}
            onClick={() => handleMockSignIn('partner')}
            isLoading={isLoading}
          >
            Login as Partner
          </Button>
          <Button 
            variant="outline" 
            style={{ width: '100%', borderColor: 'var(--color-error-500)', color: 'var(--color-error-600)' }}
            onClick={() => handleMockSignIn('admin')}
            isLoading={isLoading}
          >
            Login as Admin
          </Button>
        </div>
        <div className={styles.comingSoon} style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <h4 style={{ fontWeight: 'bold', fontSize: 'var(--text-sm)', color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Release Note: Beta Testing</h4>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
            The Admin and Partner portals are currently in <strong>Beta</strong>. These mock login buttons bypass the standard Google Auth flow, allowing you to instantly log in as pre-configured test accounts for evaluation purposes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
