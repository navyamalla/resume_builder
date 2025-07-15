import React from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Sparkles } from 'lucide-react';

interface SummarySectionProps {
  onUnsavedChange: () => void;
}

export default function SummarySection({ onUnsavedChange }: SummarySectionProps) {
  const { currentResume, updateResume, generateAIContent, loading } = useResume();

  if (!currentResume) return null;

  const handleChange = (value: string) => {
    updateResume({ summary: value });
    onUnsavedChange();
  };

  const handleAIGenerate = async () => {
    try {
      const aiSummary = await generateAIContent('summary');
      updateResume({ summary: aiSummary });
      onUnsavedChange();
    } catch (error) {
      console.error('AI generation failed:', error);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900" style={{ color: currentResume.themeColor }}>
          Professional Summary
        </h2>
        <button
          onClick={handleAIGenerate}
          disabled={loading}
          className="flex items-center px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4 mr-1" />
          {loading ? 'Generating...' : 'Generate with AI'}
        </button>
      </div>
      
      <textarea
        value={currentResume.summary}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows={4}
        placeholder="Write a compelling professional summary that highlights your key achievements and career objectives..."
      />
    </div>
  );
}