'use client';

import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { Badge } from '@/components/ui/Badge/Badge';
import { useRouter } from 'next/navigation';
import { uploadDocumentPlaceholder } from '@/actions/transaction.actions';

export default function DocumentUploadPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<{name: string, status: 'pending' | 'uploading' | 'success' | 'error'}[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(f => ({
        name: f.name,
        status: 'pending' as const
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const simulateUpload = async () => {
    setIsUploading(true);
    
    // Simulate updating statuses one by one
    for (let i = 0; i < files.length; i++) {
      if (files[i].status !== 'pending') continue;
      
      setFiles(prev => {
        const copy = [...prev];
        copy[i].status = 'uploading';
        return copy;
      });
      
      try {
        // Call the server action to actually create a DB record
        await uploadDocumentPlaceholder(resolvedParams.id, 'SALE_DEED', `placeholder_${files[i].name}`);
        
        setFiles(prev => {
          const copy = [...prev];
          copy[i].status = 'success';
          return copy;
        });
      } catch (err) {
        setFiles(prev => {
          const copy = [...prev];
          copy[i].status = 'error';
          return copy;
        });
      }
    }
    
    setIsUploading(false);
    
    // Wait a moment then redirect to intelligence page
    setTimeout(() => {
      // In Next.js 15, we must unwap params if we were Server component, but here we are a Client component
      // and params is unwrapped automatically in most cases, but technically we should use React.use() if async.
      // We will just push to the raw URL.
      router.push(`/dashboard/transactions/${resolvedParams.id}/intelligence`);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-8) 0' }}>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>
          Document Center
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Upload property documents for AI Risk Assessment and Legal Verification.
        </p>
      </div>

      <Card glass style={{ marginBottom: 'var(--space-8)' }}>
        <CardHeader>
          <CardTitle>Required Documents</CardTitle>
          <CardDescription>We need the following to run the intelligence engine</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Badge variant="outline">Sale Deed (Draft)</Badge>
            <Badge variant="outline">Latest Khata Certificate</Badge>
            <Badge variant="outline">Encumbrance Certificate (EC)</Badge>
          </div>
        </CardContent>
      </Card>

      <Card glass>
        <CardContent style={{ padding: 'var(--space-8)' }}>
          
          <div 
            style={{ 
              border: '2px dashed var(--border-subtle)', 
              borderRadius: 'var(--radius-lg)', 
              padding: 'var(--space-12) var(--space-6)',
              textAlign: 'center',
              backgroundColor: 'var(--bg-tertiary)',
              marginBottom: 'var(--space-8)',
              position: 'relative'
            }}
          >
            <input 
              type="file" 
              multiple 
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer'
              }}
            />
            <UploadCloud size={48} color="var(--color-primary-400)" style={{ margin: '0 auto var(--space-4)' }} />
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-medium)', marginBottom: 'var(--space-2)' }}>
              Drag and drop your documents here
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)' }}>
              Supports PDF, JPG, PNG (Max 10MB per file)
            </p>
            <Button variant="outline" style={{ pointerEvents: 'none' }}>Select Files</Button>
          </div>

          {files.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
              <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                Selected Files
              </h4>
              {files.map((file, idx) => (
                <div key={idx} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: 'var(--space-3) var(--space-4)',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <FileText size={18} color="var(--text-secondary)" />
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)' }}>{file.name}</span>
                  </div>
                  
                  {file.status === 'pending' && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Ready</span>}
                  {file.status === 'uploading' && <Loader2 size={16} className="lucide-spin" color="var(--color-primary-500)" />}
                  {file.status === 'success' && <CheckCircle2 size={18} color="var(--color-secondary-500)" />}
                  {file.status === 'error' && <AlertCircle size={18} color="var(--color-danger-500)" />}
                </div>
              ))}
            </div>
          )}

          <Button 
            variant="primary" 
            size="lg" 
            style={{ width: '100%' }}
            disabled={files.length === 0 || isUploading || files.every(f => f.status === 'success')}
            onClick={simulateUpload}
            isLoading={isUploading}
          >
            {files.every(f => f.status === 'success') && files.length > 0 ? 'Upload Complete' : 'Upload Documents & Run AI Assessment'}
          </Button>

        </CardContent>
      </Card>

    </div>
  );
}
