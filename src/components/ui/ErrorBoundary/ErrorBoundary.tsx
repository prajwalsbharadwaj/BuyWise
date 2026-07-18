'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px', padding: 'var(--space-8)' }}>
          <Card style={{ maxWidth: '480px', borderTop: '4px solid var(--color-error-500)' }}>
            <CardHeader>
              <CardTitle style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <AlertTriangle color="var(--color-error-500)" />
                Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                We encountered an unexpected error while loading this component.
              </p>
              {this.state.error && (
                <div style={{ 
                  backgroundColor: 'var(--color-error-50)', 
                  padding: 'var(--space-3)', 
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'monospace',
                  color: 'var(--color-error-800)',
                  overflowX: 'auto'
                }}>
                  {this.state.error.message}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                leftIcon={<RefreshCcw size={16} />} 
                onClick={() => this.setState({ hasError: false, error: undefined })}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Try Again
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
