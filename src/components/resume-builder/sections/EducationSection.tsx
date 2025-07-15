import React from 'react';
import { useResume, type Education } from '../../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

interface EducationSectionProps {
  onUnsavedChange: () => void;
}

export default function EducationSection({ onUnsavedChange }: EducationSectionProps) {
  const { currentResume, updateResume } = useResume();

  if (!currentResume) return null;

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
    };
    
    updateResume({
      education: [...currentResume.education, newEducation]
    });
    onUnsavedChange();
  };

  const handleUpdateEducation = (id: string, field: keyof Education, value: string) => {
    const updated = currentResume.education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateResume({ education: updated });
    onUnsavedChange();
  };

  const handleDeleteEducation = (id: string) => {
    const updated = currentResume.education.filter(edu => edu.id !== id);
    updateResume({ education: updated });
    onUnsavedChange();
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900" style={{ color: currentResume.themeColor }}>
          Education
        </h2>
        <button
          onClick={handleAddEducation}
          className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Education
        </button>
      </div>

      <div className="space-y-4">
        {currentResume.education.map((edu) => (
          <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => handleUpdateEducation(edu.id, 'school', e.target.value)}
                  className="font-semibold text-lg border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                  placeholder="School Name"
                />
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleUpdateEducation(edu.id, 'degree', e.target.value)}
                  className="font-medium text-gray-700 border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                  placeholder="Degree"
                />
                <input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => handleUpdateEducation(edu.id, 'startDate', e.target.value)}
                  className="text-gray-600 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => handleUpdateEducation(edu.id, 'endDate', e.target.value)}
                  className="text-gray-600 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => handleDeleteEducation(edu.id)}
                className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}