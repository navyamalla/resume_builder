import React, { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Plus, X } from 'lucide-react';

interface SkillsSectionProps {
  onUnsavedChange: () => void;
}

export default function SkillsSection({ onUnsavedChange }: SkillsSectionProps) {
  const { currentResume, updateResume } = useResume();
  const [newSkill, setNewSkill] = useState('');

  if (!currentResume) return null;

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      updateResume({
        skills: [...currentResume.skills, newSkill.trim()]
      });
      setNewSkill('');
      onUnsavedChange();
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    updateResume({
      skills: currentResume.skills.filter(skill => skill !== skillToRemove)
    });
    onUnsavedChange();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSkill();
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ color: currentResume.themeColor }}>
        Skills
      </h2>

      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a skill..."
          />
          <button
            onClick={handleAddSkill}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {currentResume.skills.map((skill, index) => (
          <div
            key={index}
            className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
          >
            {skill}
            <button
              onClick={() => handleRemoveSkill(skill)}
              className="ml-2 text-gray-500 hover:text-red-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}