import React, { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Plus, X } from 'lucide-react';

interface CertificationsSectionProps {
  onUnsavedChange: () => void;
}

export default function CertificationsSection({ onUnsavedChange }: CertificationsSectionProps) {
  const { currentResume, updateResume } = useResume();
  const [newCertification, setNewCertification] = useState('');

  if (!currentResume) return null;

  const handleAddCertification = () => {
    if (newCertification.trim()) {
      updateResume({
        certifications: [...currentResume.certifications, newCertification.trim()]
      });
      setNewCertification('');
      onUnsavedChange();
    }
  };

  const handleRemoveCertification = (certToRemove: string) => {
    updateResume({
      certifications: currentResume.certifications.filter(cert => cert !== certToRemove)
    });
    onUnsavedChange();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCertification();
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ color: currentResume.themeColor }}>
        Certifications
      </h2>

      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newCertification}
            onChange={(e) => setNewCertification(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a certification..."
          />
          <button
            onClick={handleAddCertification}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {currentResume.certifications.map((cert, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
          >
            <span className="text-gray-800">{cert}</span>
            <button
              onClick={() => handleRemoveCertification(cert)}
              className="text-red-600 hover:text-red-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}