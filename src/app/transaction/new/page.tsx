'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { MapPin, Building, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react';
import styles from './TransactionNew.module.css';

function TransactionWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceCode = searchParams.get('service');
  
  const [step, setStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const [formData, setFormData] = React.useState({
    locality: '',
    propertyType: 'apartment',
    budget: '',
    notes: ''
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { createTransaction } = await import('@/actions/transaction.actions');
      const transaction = await createTransaction({
        ...formData,
        serviceCode
      });
      
      router.push(`/dashboard/transactions/${transaction.id}/documents`);
    } catch (error) {
      console.error('Failed to create transaction:', error);
      alert('Failed to create transaction. Please ensure you are logged in.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Start Your Transaction</h1>
        <p className={styles.subtitle}>
          We just need a few details to set up your verified property journey.
        </p>
      </div>

      <div className={styles.stepper}>
        <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>
          <div className={styles.stepIcon}><MapPin size={20} /></div>
          <span className={styles.stepLabel}>Location</span>
        </div>
        <div className={`${styles.stepLine} ${step >= 2 ? styles.activeLine : ''}`} />
        <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>
          <div className={styles.stepIcon}><Building size={20} /></div>
          <span className={styles.stepLabel}>Property</span>
        </div>
        <div className={`${styles.stepLine} ${step >= 3 ? styles.activeLine : ''}`} />
        <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>
          <div className={styles.stepIcon}><CreditCard size={20} /></div>
          <span className={styles.stepLabel}>Confirm</span>
        </div>
      </div>

      <Card glass className={styles.formCard}>
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle>Where are you looking?</CardTitle>
            </CardHeader>
            <CardContent className={styles.formContent}>
              <Input 
                label="City or Locality" 
                placeholder="e.g., Indiranagar, Bengaluru"
                value={formData.locality}
                onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                leftIcon={<MapPin size={18} />}
                required
              />
            </CardContent>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent className={styles.formContent}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Property Type</label>
                <select 
                  className={styles.select}
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                >
                  <option value="apartment">Apartment</option>
                  <option value="plot">Plot / Land</option>
                  <option value="villa">Villa / Independent House</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <Input 
                label="Approximate Budget (₹)" 
                placeholder="e.g., 1.5 Cr"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
              <Input 
                label="Any special requirements?" 
                placeholder="Tell us what you're looking for..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </CardContent>
          </>
        )}

        {step === 3 && (
          <>
            <CardHeader>
              <CardTitle>Review & Confirm</CardTitle>
            </CardHeader>
            <CardContent className={styles.summaryContent}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Selected Service</span>
                <span className={styles.summaryValue}>{serviceCode || 'General Consultation'}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Location</span>
                <span className={styles.summaryValue}>{formData.locality || 'Not specified'}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Property Type</span>
                <span className={styles.summaryValue} style={{ textTransform: 'capitalize' }}>
                  {formData.propertyType}
                </span>
              </div>
              
              <div className={styles.disclaimerBox}>
                <p>No payment is required right now. We will assign a verification expert to review your details and prepare a secure transaction workspace.</p>
              </div>
            </CardContent>
          </>
        )}

        <CardFooter className={styles.footer}>
          <Button 
            variant="ghost" 
            onClick={step === 1 ? () => router.back() : prevStep}
            leftIcon={step !== 1 ? <ArrowLeft size={16} /> : undefined}
            disabled={isSubmitting}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          
          <Button 
            variant="primary" 
            onClick={step === 3 ? handleSubmit : nextStep}
            rightIcon={step !== 3 ? <ArrowRight size={16} /> : undefined}
            isLoading={isSubmitting}
          >
            {step === 3 ? 'Confirm & Start' : 'Continue'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function NewTransactionPage() {
  return (
    <React.Suspense fallback={<div className="container" style={{ padding: 'var(--space-12) 0', textAlign: 'center' }}>Loading...</div>}>
      <TransactionWizard />
    </React.Suspense>
  );
}
