'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react';

interface DocumentUploadMatrixProps {
  requiredDocuments: string[];
  optionalDocuments: string[];
  onUploadComplete: (documents: Record<string, string>) => void;
  isLoading?: boolean;
}

export function DocumentUploadMatrix({ requiredDocuments, optionalDocuments, onUploadComplete, isLoading }: DocumentUploadMatrixProps) {
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<string | null>(null);

  const handleMockUpload = (docType: string) => {
    setUploading(docType);
    // Simulate upload delay
    setTimeout(() => {
      setUploadedDocs(prev => ({
        ...prev,
        [docType]: `https://mock-storage.buywise.com/${docType.toLowerCase()}_${Date.now()}.pdf`
      }));
      setUploading(null);
    }, 1500);
  };

  const isComplete = requiredDocuments.every(doc => uploadedDocs[doc]);

  const handleSubmit = () => {
    if (isComplete) {
      onUploadComplete(uploadedDocs);
    }
  };

  const renderDocRow = (doc: string, isRequired: boolean) => {
    const isUploaded = !!uploadedDocs[doc];
    const isCurrentlyUploading = uploading === doc;

    return (
      <div key={doc} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 flex items-center gap-2">
            {doc.replace(/_/g, ' ')}
            {isRequired && <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">Required</span>}
            {!isRequired && <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full">Optional</span>}
          </span>
          {isUploaded && (
            <span className="text-xs text-green-600 flex items-center mt-1">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Uploaded successfully
            </span>
          )}
        </div>
        
        {isUploaded ? (
          <Button variant="outline" size="sm" onClick={() => {
            const newDocs = { ...uploadedDocs };
            delete newDocs[doc];
            setUploadedDocs(newDocs);
          }}>
            Remove
          </Button>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleMockUpload(doc)}
            disabled={isCurrentlyUploading || isLoading}
          >
            {isCurrentlyUploading ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-900 mr-2" />
                Uploading...
              </span>
            ) : (
              <span className="flex items-center">
                <UploadCloud className="w-4 h-4 mr-2" /> Upload
              </span>
            )}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">Document Upload</h3>
        <p className="text-sm text-gray-500 mt-1">Please provide the necessary documents for verification.</p>
      </div>

      <div className="space-y-3">
        {requiredDocuments.map(doc => renderDocRow(doc, true))}
        {optionalDocuments.map(doc => renderDocRow(doc, false))}
      </div>

      {!isComplete && requiredDocuments.length > 0 && (
        <div className="p-4 bg-amber-50 rounded-lg flex items-start text-amber-800">
          <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
          <p className="text-sm">Please upload all required documents to proceed to the next step.</p>
        </div>
      )}

      <div className="pt-4 flex justify-end">
        <Button 
          onClick={handleSubmit} 
          disabled={!isComplete || isLoading}
          className="px-8"
        >
          {isLoading ? 'Submitting...' : 'Submit Documents'}
        </Button>
      </div>
    </div>
  );
}
