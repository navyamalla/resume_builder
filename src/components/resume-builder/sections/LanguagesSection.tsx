import React, { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Plus, X } from 'lucide-react';

interface LanguagesSectionProps {
  onUnsavedChange: () => void;
}

export default function LanguagesSection({ onUnsavedChange }: LanguagesSectionProps) {
  const { currentResume, updateResume } = useResume();
  const [newLanguage, setNewLanguage] = useState('');

  if (!currentResume) return null;

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      updateResume({
        languages: [...currentResume.languages, newLanguage.trim()]
      });
      setNewLanguage('');
      onUnsavedChange();
    }
  };

  const handleRemoveLanguage = (langToRemove: string) => {
    updateResume({
      languages: currentResume.languages.filter(lang => lang !== langToRemove)
    });
    onUnsavedChange();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddLanguage();
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ color: currentResume.themeColor }}>
        Languages
      </h2>

      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a language..."
          />
          <button
            onClick={handleAddLanguage}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {currentResume.languages.map((language, index) => (
          <div
            key={index}
            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {language}
            <button
              onClick={() => handleRemoveLanguage(language)}
              className="ml-2 text-blue-600 hover:text-red-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}