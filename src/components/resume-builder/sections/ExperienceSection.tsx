import React from 'react';
import { useResume, type WorkExperience } from '../../../context/ResumeContext';
import { Plus, Trash2, Sparkles } from 'lucide-react';

interface ExperienceSectionProps {
  onUnsavedChange: () => void;
}

export default function ExperienceSection({ onUnsavedChange }: ExperienceSectionProps) {
  const { currentResume, updateResume, generateAIContent, loading } = useResume();

  if (!currentResume) return null;

  const handleAddExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    
    updateResume({
      workExperience: [...currentResume.workExperience, newExperience]
    });
    onUnsavedChange();
  };

  const handleUpdateExperience = (id: string, field: keyof WorkExperience, value: string) => {
    const updated = currentResume.workExperience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateResume({ workExperience: updated });
    onUnsavedChange();
  };

  const handleDeleteExperience = (id: string) => {
    const updated = currentResume.workExperience.filter(exp => exp.id !== id);
    updateResume({ workExperience: updated });
    onUnsavedChange();
  };

  const handleAIRewrite = async (id: string) => {
    try {
      const aiDescription = await generateAIContent('bulletPoint');
      handleUpdateExperience(id, 'description', aiDescription);
    } catch (error) {
      console.error('AI generation failed:', error);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900" style={{ color: currentResume.themeColor }}>
          Work Experience
        </h2>
        <button
          onClick={handleAddExperience}
          className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {currentResume.workExperience.map((exp) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                  className="font-semibold text-lg border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                  placeholder="Company Name"
                />
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => handleUpdateExperience(exp.id, 'role', e.target.value)}
                  className="font-medium text-gray-700 border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                  placeholder="Job Title"
                />
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => handleUpdateExperience(exp.id, 'startDate', e.target.value)}
                  className="text-gray-600 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => handleUpdateExperience(exp.id, 'endDate', e.target.value)}
                  className="text-gray-600 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => handleDeleteExperience(exp.id)}
                className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <button
                onClick={() => handleAIRewrite(exp.id)}
                disabled={loading}
                className="flex items-center px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 disabled:opacity-50"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                {loading ? 'Rewriting...' : 'Rewrite with AI'}
              </button>
            </div>
            
            <textarea
              value={exp.description}
              onChange={(e) => handleUpdateExperience(exp.id, 'description', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>
        ))}
      </div>
    </div>
  );
}