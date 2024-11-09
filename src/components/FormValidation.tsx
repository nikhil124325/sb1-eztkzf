import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface FormValidationProps {
  error: string | null;
  validationErrors: string[];
}

const FormValidation = ({ error, validationErrors }: FormValidationProps) => {
  if (!error && validationErrors.length === 0) return null;

  return (
    <div className="bg-red-900/50 border border-red-500 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
        <p className="text-red-500 font-medium">Please fix the following errors:</p>
      </div>
      <ul className="list-disc list-inside text-red-500 text-sm space-y-1">
        {error && <li>{error}</li>}
        {validationErrors.map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </ul>
    </div>
  );
};

export default FormValidation;