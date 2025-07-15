import React, { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Plus, X } from 'lucide-react';

interface HobbiesSectionProps {
  onUnsavedChange: () => void;
}

export default function HobbiesSection({ onUnsavedChange }: HobbiesSectionProps) {
  const { currentResume, updateResume } = useResume();
  const [newHobby, setNewHobby] = useState('');

  if (!currentResume) return null;

  const handleAddHobby = () => {
    if (newHobby.trim()) {
      updateResume({
        hobbies: [...currentResume.hobbies, newHobby.trim()]
      });
      setNewHobby('');
      onUnsavedChange();
    }
  };

  const handleRemoveHobby = (hobbyToRemove: string) => {
    updateResume({
      hobbies: currentResume.hobbies.filter(hobby => hobby !== hobbyToRemove)
    });
    onUnsavedChange();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddHobby();
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ color: currentResume.themeColor }}>
        Hobbies & Interests
      </h2>

      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a hobby or interest..."
          />
          <button
            onClick={handleAddHobby}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {currentResume.hobbies.map((hobby, index) => (
          <div
            key={index}
            className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
          >
            {hobby}
            <button
              onClick={() => handleRemoveHobby(hobby)}
              className="ml-2 text-green-600 hover:text-red-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}