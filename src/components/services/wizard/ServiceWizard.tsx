'use client';

import React, { useState } from 'react';
import { DynamicQuestionnaire, QuestionnaireSchema } from './DynamicQuestionnaire';
import { DocumentUploadMatrix } from './DocumentUploadMatrix';
import { Button } from '@/components/ui/Button/Button';
import { CheckCircle2, ChevronRight, FileText, UploadCloud, CreditCard, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface ServiceWizardProps {
  transactionId: string;
  serviceConfig: {
    code: string;
    name: string;
    description: string;
    questionnaireSchema: any;
    requiredDocuments: string[];
    optionalDocuments: string[];
    price?: number;
    deliverables?: any;
  };
  onSubmit: (data: { questionnaire: any; documents: Record<string, string> }) => Promise<void>;
}

export function ServiceWizard({ transactionId, serviceConfig, onSubmit }: ServiceWizardProps) {
  const router = useRouter();
  
  // Define available steps based on config
  const steps = ['education'];
  if (serviceConfig.questionnaireSchema) steps.push('questionnaire');
  if (serviceConfig.requiredDocuments?.length || serviceConfig.optionalDocuments?.length) steps.push('documents');
  steps.push('payment'); // Mock payment
  steps.push('success');

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [docs, setDocs] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStep = steps[currentStepIndex];

  const nextStep = async () => {
    if (currentStepIndex === steps.length - 2) {
      // About to go to success, submit to backend
      setIsSubmitting(true);
      try {
        await onSubmit({ questionnaire: formData, documents: docs });
        setCurrentStepIndex(prev => prev + 1);
      } catch (err) {
        console.error("Submission failed", err);
        alert("Failed to submit service request");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 mb-8 overflow-x-auto py-2">
      {steps.map((step, idx) => (
        <React.Fragment key={step}>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
            idx < currentStepIndex ? 'bg-green-100 text-green-700' : 
            idx === currentStepIndex ? 'bg-blue-600 text-white' : 
            'bg-gray-100 text-gray-500'
          }`}>
            {idx < currentStepIndex ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
          </div>
          {idx < steps.length - 1 && (
            <div className={`w-12 h-1 ${idx < currentStepIndex ? 'bg-green-100' : 'bg-gray-100'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderEducationStep = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center max-w-2xl mx-auto">
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <FileText className="w-8 h-8 text-blue-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{serviceConfig.name}</h2>
      <p className="text-gray-600 mb-8">{serviceConfig.description}</p>
      
      {serviceConfig.deliverables?.items && (
        <div className="text-left bg-gray-50 p-6 rounded-xl mb-8">
          <h4 className="font-semibold text-gray-900 mb-4">What you will receive:</h4>
          <ul className="space-y-3">
            {serviceConfig.deliverables.items.map((item: any) => (
              <li key={item.name} className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-900 block">{item.name}</span>
                  <span className="text-sm text-gray-500">{item.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button onClick={nextStep} size="lg" className="w-full sm:w-auto px-8">
        Get Started <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center max-w-lg mx-auto">
      <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <CreditCard className="w-8 h-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Checkout</h2>
      <p className="text-gray-600 mb-8">Complete payment to initiate the service workflow.</p>
      
      <div className="bg-gray-50 p-6 rounded-xl mb-8 text-left">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">{serviceConfig.name}</span>
          <span className="font-medium">₹{serviceConfig.price || 0}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">GST (18%)</span>
          <span className="font-medium">₹{((serviceConfig.price || 0) * 0.18).toFixed(2)}</span>
        </div>
        <div className="border-t pt-4 flex justify-between items-center">
          <span className="font-bold text-gray-900">Total</span>
          <span className="font-bold text-xl text-gray-900">₹{((serviceConfig.price || 0) * 1.18).toFixed(2)}</span>
        </div>
      </div>

      <Button onClick={nextStep} size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Pay & Submit Request'}
      </Button>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center max-w-lg mx-auto">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Submitted!</h2>
      <p className="text-gray-600 mb-8">
        Your request for {serviceConfig.name} has been successfully initiated and is now in our system.
      </p>
      
      <div className="p-4 bg-blue-50 text-blue-800 rounded-lg flex items-start mb-8 text-left">
        <Clock className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
        <p className="text-sm">You can track the live status of this service in your workspace. Our automated systems and expert partners are already on it.</p>
      </div>

      <Button 
        onClick={() => router.push(`/dashboard/transactions/${transactionId}/services`)} 
        variant="outline" 
        size="lg" 
        className="w-full"
      >
        View Request Status
      </Button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8">
      {currentStep !== 'success' && renderStepIndicator()}
      
      {currentStep === 'education' && renderEducationStep()}
      
      {currentStep === 'questionnaire' && (
        <DynamicQuestionnaire 
          schema={serviceConfig.questionnaireSchema} 
          onSubmit={(data) => {
            setFormData(data);
            nextStep();
          }} 
        />
      )}
      
      {currentStep === 'documents' && (
        <DocumentUploadMatrix 
          requiredDocuments={serviceConfig.requiredDocuments || []} 
          optionalDocuments={serviceConfig.optionalDocuments || []} 
          onUploadComplete={(uploaded) => {
            setDocs(uploaded);
            nextStep();
          }} 
        />
      )}
      
      {currentStep === 'payment' && renderPaymentStep()}
      
      {currentStep === 'success' && renderSuccessStep()}
    </div>
  );
}
