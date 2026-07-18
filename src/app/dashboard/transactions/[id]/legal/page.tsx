'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { Badge } from '@/components/ui/Badge/Badge';
import { Upload, CheckCircle2, Clock, AlertCircle, FileText, Send, Download } from 'lucide-react';
import { analyzeLegalScenario, LegalQuestionnaire, RequiredDocumentDef } from '@/lib/legal/scenario-engine';

export default function LegalCustomerPortal() {
  // State machine for the Legal Service flow
  const [status, setStatus] = React.useState<'QUESTIONNAIRE' | 'UPLOADS' | 'REVIEW' | 'CLARIFICATION' | 'COMPLETED'>('QUESTIONNAIRE');
  
  // Questionnaire State
  const [qData, setQData] = React.useState<LegalQuestionnaire>({
    propertyType: 'APARTMENT_RESALE',
    sellerType: 'INDIVIDUAL',
    isInherited: false,
    hasActiveLoan: false,
    khataType: 'A_KHATA',
    isUnderConstruction: false
  });

  // Uploads State
  const [requiredDocs, setRequiredDocs] = React.useState<RequiredDocumentDef[]>([]);
  const [uploadedDocs, setUploadedDocs] = React.useState<Record<string, boolean>>({});
  
  // Messaging State
  const [messages, setMessages] = React.useState([
    { id: 1, sender: 'LAWYER', text: 'Hi, I noticed the EC is only for the last 15 years. Could you please upload the EC for the prior 15 years as well?', time: '10:30 AM' }
  ]);
  const [newMessage, setNewMessage] = React.useState('');

  const handleQuestionnaireSubmit = () => {
    const analysis = analyzeLegalScenario(qData);
    setRequiredDocs(analysis.documents);
    setStatus('UPLOADS');
  };

  const handleDocumentUpload = (docType: string) => {
    // Mocking file upload
    setUploadedDocs(prev => ({ ...prev, [docType]: true }));
  };

  const submitToReview = () => {
    setStatus('REVIEW');
    // Simulate AI moving to clarification after 3 seconds
    setTimeout(() => setStatus('CLARIFICATION'), 3000);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'USER', text: newMessage, time: 'Just now' }]);
    setNewMessage('');
    
    // Simulate Lawyer finishing the report after clarification
    setTimeout(() => setStatus('COMPLETED'), 4000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-8) 0' }}>
      
      {/* Progress Tracker */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-8)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '16px', left: '0', right: '0', height: '2px', backgroundColor: 'var(--border-color)', zIndex: 0 }} />
        {['QUESTIONNAIRE', 'UPLOADS', 'REVIEW', 'COMPLETED'].map((step, i) => {
          const isActive = status === step || (status === 'CLARIFICATION' && step === 'REVIEW');
          const isPast = ['QUESTIONNAIRE', 'UPLOADS', 'REVIEW', 'CLARIFICATION', 'COMPLETED'].indexOf(status) > ['QUESTIONNAIRE', 'UPLOADS', 'REVIEW', 'COMPLETED'].indexOf(step);
          
          return (
            <div key={step} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
              <div style={{ 
                width: '32px', height: '32px', borderRadius: '50%', 
                backgroundColor: isActive || isPast ? 'var(--primary-color)' : 'var(--bg-primary)',
                border: isActive || isPast ? 'none' : '2px solid var(--border-color)',
                color: isActive || isPast ? 'white' : 'var(--text-secondary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {isPast ? <CheckCircle2 size={16} /> : i + 1}
              </div>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: isActive ? 'bold' : 'normal', color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                {step}
              </span>
            </div>
          );
        })}
      </div>

      {/* STAGE 1: QUESTIONNAIRE */}
      {status === 'QUESTIONNAIRE' && (
        <Card>
          <CardHeader>
            <CardTitle>Legal Scenario Setup</CardTitle>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Help us understand the transaction so we can request the exact documents needed.
            </p>
          </CardHeader>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>Property Type</label>
                <select 
                  className="buywise-input"
                  value={qData.propertyType}
                  onChange={(e) => setQData({...qData, propertyType: e.target.value as any})}
                  style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                >
                  <option value="APARTMENT_RESALE">Apartment (Resale)</option>
                  <option value="APARTMENT_NEW">Apartment (Under Construction)</option>
                  <option value="PLOT_GATED">Plot (Gated Community)</option>
                  <option value="VILLA">Independent Villa</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>Seller Type</label>
                <select 
                  className="buywise-input"
                  value={qData.sellerType}
                  onChange={(e) => setQData({...qData, sellerType: e.target.value as any})}
                  style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                >
                  <option value="INDIVIDUAL">Individual Owner</option>
                  <option value="JOINT">Joint Owners</option>
                  <option value="NRI">NRI (Non-Resident Indian)</option>
                  <option value="BUILDER">Builder / Developer</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>Khata Type</label>
                <select 
                  className="buywise-input"
                  value={qData.khataType}
                  onChange={(e) => setQData({...qData, khataType: e.target.value as any})}
                  style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                >
                  <option value="A_KHATA">A-Khata</option>
                  <option value="B_KHATA">B-Khata</option>
                  <option value="E_KHATA">E-Khata</option>
                  <option value="UNKNOWN">I don't know</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <input type="checkbox" checked={qData.isInherited} onChange={(e) => setQData({...qData, isInherited: e.target.checked})} />
                <span style={{ fontSize: 'var(--text-sm)' }}>This is an inherited property (Ancestral or passed via Will)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <input type="checkbox" checked={qData.hasActiveLoan} onChange={(e) => setQData({...qData, hasActiveLoan: e.target.checked})} />
                <span style={{ fontSize: 'var(--text-sm)' }}>The property currently has an active bank loan</span>
              </label>
            </div>

          </CardContent>
          <CardFooter style={{ justifyContent: 'flex-end' }}>
            <Button variant="primary" onClick={handleQuestionnaireSubmit}>Generate Document List</Button>
          </CardFooter>
        </Card>
      )}

      {/* STAGE 2: UPLOADS */}
      {status === 'UPLOADS' && (
        <Card>
          <CardHeader>
            <CardTitle>Required Document Matrix</CardTitle>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Based on your scenario, please upload the following documents for legal review.
            </p>
          </CardHeader>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            
            {requiredDocs.map((doc) => (
              <div key={doc.type} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-secondary)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                    <h4 style={{ fontWeight: 'bold' }}>{doc.label}</h4>
                    {doc.isMandatory ? <Badge variant="warning">Mandatory</Badge> : <Badge variant="outline">Optional</Badge>}
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{doc.reason}</p>
                </div>
                <div>
                  {uploadedDocs[doc.type] ? (
                    <Button variant="ghost" disabled leftIcon={<CheckCircle2 size={16} color="var(--color-success-500)" />}>Uploaded</Button>
                  ) : (
                    <Button variant="outline" size="sm" leftIcon={<Upload size={16} />} onClick={() => handleDocumentUpload(doc.type)}>Upload PDF</Button>
                  )}
                </div>
              </div>
            ))}

          </CardContent>
          <CardFooter style={{ justifyContent: 'space-between' }}>
            <Button variant="ghost" onClick={() => setStatus('QUESTIONNAIRE')}>Back</Button>
            <Button variant="primary" onClick={submitToReview}>Submit for Verification</Button>
          </CardFooter>
        </Card>
      )}

      {/* STAGE 3: REVIEW / CLARIFICATION */}
      {(status === 'REVIEW' || status === 'CLARIFICATION') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <Card glass style={{ borderLeft: '4px solid var(--color-warning-500)' }}>
            <CardContent style={{ padding: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              {status === 'REVIEW' ? (
                <>
                  <Clock size={32} color="var(--color-warning-500)" />
                  <div>
                    <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', marginBottom: 'var(--space-1)' }}>AI & Lawyer Review in Progress</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Our AI is extracting the document data and assigning a Bar Council registered lawyer. Typical turnaround is 48 hours.</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle size={32} color="var(--color-error-500)" />
                  <div>
                    <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', marginBottom: 'var(--space-1)' }}>Clarification Required</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Your assigned lawyer needs some clarification before they can generate the final legal opinion.</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {status === 'CLARIFICATION' && (
            <Card>
              <CardHeader>
                <CardTitle style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}><FileText size={20} /> Secure Lawyer Messaging</CardTitle>
              </CardHeader>
              <CardContent style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                
                {messages.map((msg) => (
                  <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'USER' ? 'flex-end' : 'flex-start' }}>
                    <div style={{ 
                      backgroundColor: msg.sender === 'USER' ? 'var(--primary-color)' : 'var(--bg-primary)', 
                      color: msg.sender === 'USER' ? 'white' : 'var(--text-primary)',
                      padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', maxWidth: '80%',
                      border: msg.sender === 'USER' ? 'none' : '1px solid var(--border-color)'
                    }}>
                      <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.5 }}>{msg.text}</p>
                    </div>
                    <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>{msg.sender === 'USER' ? 'You' : 'Advocate Sharma'} • {msg.time}</span>
                  </div>
                ))}

              </CardContent>
              <CardFooter style={{ gap: 'var(--space-2)' }}>
                <Input 
                  placeholder="Type your response or attach documents..." 
                  style={{ flex: 1 }}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button variant="primary" onClick={sendMessage}><Send size={18} /></Button>
              </CardFooter>
            </Card>
          )}
        </div>
      )}

      {/* STAGE 4: COMPLETED */}
      {status === 'COMPLETED' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <Card style={{ backgroundColor: 'var(--color-success-50)', border: '1px solid var(--color-success-200)' }}>
            <CardContent style={{ padding: 'var(--space-8)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CheckCircle2 size={48} color="var(--color-success-600)" style={{ marginBottom: 'var(--space-4)' }} />
              <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-success-800)', marginBottom: 'var(--space-2)' }}>Verification Completed</h2>
              <p style={{ color: 'var(--color-success-700)' }}>Your Legal Opinion and Risk Summary are ready to download.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Final Deliverables</CardTitle>
            </CardHeader>
            <CardContent style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <FileText size={24} color="var(--primary-color)" />
                  <div>
                    <h4 style={{ fontWeight: 'bold' }}>Legal Opinion Letter.pdf</h4>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Signed by Adv. Sharma (KBC/1234/2010)</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" leftIcon={<Download size={16} />}>Download</Button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <AlertCircle size={24} color="var(--color-warning-500)" />
                  <div>
                    <h4 style={{ fontWeight: 'bold' }}>Risk Summary & Next Steps.pdf</h4>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>AI-generated breakdown of critical flags</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" leftIcon={<Download size={16} />}>Download</Button>
              </div>
            </CardContent>
          </Card>

          {/* Post-Service Journey Integration */}
          <Card glass style={{ border: '2px dashed var(--primary-color)' }}>
            <CardContent style={{ padding: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Badge variant="primary" style={{ marginBottom: 'var(--space-2)' }}>Recommended Next Step</Badge>
                <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', marginBottom: 'var(--space-1)' }}>Registration Assistance</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Let our lawyer accompany you to the Sub-Registrar office for a hassle-free registration.</p>
              </div>
              <Button variant="primary">Book Now</Button>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  );
}
