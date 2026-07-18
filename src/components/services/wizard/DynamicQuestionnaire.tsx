'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';

export interface QuestionnaireSchema {
  title: string;
  fields: {
    name: string;
    label: string;
    type: 'text' | 'number' | 'boolean' | 'select' | 'date';
    options?: string[];
  }[];
}

interface DynamicQuestionnaireProps {
  schema: QuestionnaireSchema;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function DynamicQuestionnaire({ schema, onSubmit, isLoading }: DynamicQuestionnaireProps) {
  const [formData, setFormData] = useState<any>({});

  const handleChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">{schema.title}</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {schema.fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            {field.type === 'text' && (
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required
              />
            )}
            {field.type === 'number' && (
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, Number(e.target.value))}
                required
              />
            )}
            {field.type === 'date' && (
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required
              />
            )}
            {field.type === 'boolean' && (
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={field.name}
                    checked={formData[field.name] === true}
                    onChange={() => handleChange(field.name, true)}
                    className="text-blue-600"
                    required
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={field.name}
                    checked={formData[field.name] === false}
                    onChange={() => handleChange(field.name, false)}
                    className="text-blue-600"
                  />
                  <span>No</span>
                </label>
              </div>
            )}
            {field.type === 'select' && field.options && (
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required
              >
                <option value="" disabled>Select an option</option>
                {field.options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}
          </div>
        ))}
        
        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={isLoading} className="px-8">
            {isLoading ? 'Saving...' : 'Continue'}
          </Button>
        </div>
      </form>
    </div>
  );
}
