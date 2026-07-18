import React from 'react';
import { ShieldAlert, ShieldCheck, FileSearch, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import Link from 'next/link';
import { DocumentIntelligence } from '@/modules/ai/DocumentIntelligence';
import { RiskEngine } from '@/modules/risk/RiskEngine';

export default async function IntelligenceDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // 1. Simulate AI reading the documents
  const ai = new DocumentIntelligence();
  const extractedData = await ai.execute([]);

  // 2. Run the Extracted Data through the Deterministic Risk Engine
  const engine = new RiskEngine();
  const riskReport = engine.evaluate(resolvedParams.id, extractedData);

  const riskScore = riskReport.score;
  const anomalies = riskReport.anomalies;

  return (
    <div style={{ padding: 'var(--space-8) 0', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-8)' }}>
        <div>
          <Badge variant="outline" style={{ marginBottom: 'var(--space-2)' }}>Transaction #{resolvedParams.id}</Badge>
          <h1 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>
            Intelligence Report
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>AI-driven risk assessment based on your uploaded documents.</p>
        </div>
        
        <Link href={`/dashboard/transactions/${resolvedParams.id}/verification`} style={{ textDecoration: 'none' }}>
          <Button variant="primary" rightIcon={<ChevronRight size={16} />}>
            Request Legal Verification
          </Button>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
        
        {/* Risk Score Card */}
        <Card glass>
          <CardHeader>
            <CardTitle style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <ShieldAlert size={20} color="var(--color-warning-500)" />
              Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8)' }}>
            <div style={{ 
              width: '140px', height: '140px', 
              borderRadius: '50%', 
              border: '12px solid var(--color-warning-500)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 'var(--space-6)',
              boxShadow: 'var(--shadow-glow-secondary)'
            }}>
              <span style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--weight-bold)', color: 'var(--color-warning-600)' }}>
                {riskScore}
              </span>
            </div>
            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-semibold)', marginBottom: 'var(--space-2)' }}>Moderate Risk</h3>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              We recommend a physical legal verification due to document discrepancies.
            </p>
          </CardContent>
        </Card>

        {/* Anomalies Card */}
        <Card glass>
          <CardHeader>
            <CardTitle style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <AlertTriangle size={20} color="var(--color-danger-500)" />
              Detected Anomalies
            </CardTitle>
          </CardHeader>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {anomalies.map((a, i) => (
              <div key={i} style={{ 
                padding: 'var(--space-4)', 
                borderRadius: 'var(--radius-md)', 
                borderLeft: `4px solid ${a.type === 'HIGH' ? 'var(--color-danger-500)' : 'var(--color-warning-500)'}`,
                backgroundColor: 'var(--bg-secondary)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <h4 style={{ fontWeight: 'var(--weight-semibold)' }}>{a.title}</h4>
                  <Badge variant={a.type === 'HIGH' ? 'danger' : 'outline'}>{a.type} SEVERITY</Badge>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>{a.desc}</p>
                
                {a.recommendedService && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3)', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recommended Action</span>
                      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}>{a.recommendedService.name}</span>
                    </div>
                    <Link href={`${a.recommendedService.link}?transactionId=${resolvedParams.id}`} style={{ textDecoration: 'none' }}>
                      <Button variant="outline" size="sm">
                        View Service
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

      {/* Extracted Data */}
      <Card glass>
        <CardHeader>
          <CardTitle style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <FileSearch size={20} color="var(--color-primary-500)" />
            AI Extracted Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
            {extractedData.map((d, i) => (
              <div key={i} style={{ padding: 'var(--space-4)', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 'var(--space-1)' }}>
                  {d.label}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ fontWeight: 'var(--weight-medium)', fontSize: 'var(--text-lg)' }}>{d.value}</span>
                  {d.verified ? 
                    <CheckCircle2 size={16} color="var(--color-secondary-500)" /> : 
                    <AlertTriangle size={16} color="var(--color-warning-500)" />
                  }
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
