'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { VoiceRecorder } from '@/components/shared/VoiceRecorder/VoiceRecorder';
import { FileText, MapPin, Building, ArrowRight, Upload } from 'lucide-react';
import { Input } from '@/components/ui/Input/Input';

export default function SellerOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const [transcript, setTranscript] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    locality: '',
    propertyType: 'apartment',
    askingPrice: ''
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate AI parsing the voice note to pre-fill listing details,
    // creating the property, and navigating to the dashboard.
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <main className="container" style={{ padding: 'var(--space-12) 0', maxWidth: '600px', margin: '0 auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <Badge>Seller Portal</Badge>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', marginTop: 'var(--space-4)', marginBottom: 'var(--space-2)' }}>
          List Your Property
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Get a BuyWise Certified badge to sell faster and safer.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-8)', justifyContent: 'center' }}>
        <div style={{ width: '32px', height: '8px', borderRadius: '4px', background: step >= 1 ? 'var(--primary-color)' : 'var(--border-color)' }} />
        <div style={{ width: '32px', height: '8px', borderRadius: '4px', background: step >= 2 ? 'var(--primary-color)' : 'var(--border-color)' }} />
        <div style={{ width: '32px', height: '8px', borderRadius: '4px', background: step >= 3 ? 'var(--primary-color)' : 'var(--border-color)' }} />
      </div>

      <Card glass>
        {step === 1 && (
          <>
            <CardHeader style={{ textAlign: 'center' }}>
              <CardTitle>Tell us your story</CardTitle>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
                Are you an NRI? Is there a loan on the property? Any Khata issues? Record a quick voice note so our AI can understand your unique scenario.
              </p>
            </CardHeader>
            <CardContent>
              <VoiceRecorder onRecordingComplete={(text) => setTranscript(text)} />
            </CardContent>
            <CardFooter style={{ justifyContent: 'space-between', paddingTop: 'var(--space-4)' }}>
              <Button variant="ghost" onClick={() => router.push('/')}>Cancel</Button>
              <Button 
                variant="primary" 
                onClick={nextStep}
                disabled={!transcript}
                rightIcon={<ArrowRight size={16} />}
              >
                Continue
              </Button>
            </CardFooter>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle>Basic Details</CardTitle>
            </CardHeader>
            <CardContent style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {transcript && (
                <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: 'var(--space-2)' }}>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--primary-color)', fontWeight: 'bold', marginBottom: 'var(--space-1)' }}>AI Extracted Scenario:</p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>"{transcript}"</p>
                </div>
              )}
              
              <Input 
                label="City or Locality" 
                placeholder="e.g., Whitefield, Bengaluru"
                value={formData.locality}
                onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                leftIcon={<MapPin size={18} />}
              />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}>Property Type</label>
                <select 
                  style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
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
                label="Asking Price (₹)" 
                placeholder="e.g., 1.5 Cr"
                value={formData.askingPrice}
                onChange={(e) => setFormData({ ...formData, askingPrice: e.target.value })}
              />
            </CardContent>
            <CardFooter style={{ justifyContent: 'space-between', paddingTop: 'var(--space-4)' }}>
              <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
              <Button variant="primary" onClick={nextStep} rightIcon={<ArrowRight size={16} />}>
                Continue
              </Button>
            </CardFooter>
          </>
        )}

        {step === 3 && (
          <>
            <CardHeader>
              <CardTitle>Verify Ownership</CardTitle>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
                Upload your Sale Deed or latest Tax Receipt. Our AI will verify your ownership to grant you the "BuyWise Certified" badge.
              </p>
            </CardHeader>
            <CardContent>
              <div style={{ 
                border: '2px dashed var(--border-primary)', 
                borderRadius: 'var(--radius-lg)', 
                padding: 'var(--space-12) var(--space-6)',
                textAlign: 'center',
                backgroundColor: 'var(--bg-secondary)',
                cursor: 'pointer'
              }}>
                <Upload size={48} color="var(--text-tertiary)" style={{ margin: '0 auto var(--space-4)' }} />
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>Drag & Drop Documents</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)' }}>
                  Supports PDF, JPG, PNG (Max 10MB)
                </p>
                <Button variant="outline">Browse Files</Button>
              </div>
            </CardContent>
            <CardFooter style={{ justifyContent: 'space-between', paddingTop: 'var(--space-4)' }}>
              <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
              <Button 
                variant="primary" 
                onClick={handleSubmit} 
                isLoading={isSubmitting}
              >
                Submit Listing
              </Button>
            </CardFooter>
          </>
        )}
      </Card>

    </main>
  );
}

// Simple Badge component specifically for this page since we didn't import the global one
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ 
      display: 'inline-block',
      padding: 'var(--space-1) var(--space-3)',
      backgroundColor: 'var(--color-primary-100)',
      color: 'var(--color-primary-700)',
      borderRadius: '9999px',
      fontSize: 'var(--text-xs)',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }}>
      {children}
    </span>
  );
}
