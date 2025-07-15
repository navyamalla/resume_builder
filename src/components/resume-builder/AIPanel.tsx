import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Sparkles, Palette, FileText, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AIPanel() {
  const { currentResume, updateResume, generateAIContent, loading } = useResume();
  const [tone, setTone] = useState('professional');
  const [jobTitle, setJobTitle] = useState('');
  const [experience, setExperience] = useState('');

  if (!currentResume) return null;

  const handleGenerateSummary = async () => {
    try {
      const summary = await generateAIContent('summary', { tone, jobTitle, experience });
      updateResume({ summary });
      toast.success('Summary generated successfully!');
    } catch (error) {
      toast.error('Failed to generate summary');
    }
  };

  const handleAutoFill = async () => {
    if (!jobTitle || !experience) {
      toast.error('Please fill in job title and experience');
      return;
    }

    try {
      const summary = await generateAIContent('summary', { jobTitle, experience });
      updateResume({ summary });
      toast.success('Resume auto-filled successfully!');
    } catch (error) {
      toast.error('Failed to auto-fill resume');
    }
  };

  const handleTemplateChange = (template: string) => {
    updateResume({ template });
    toast.success(`Template changed to ${template}`);
  };

  const handleColorChange = (color: string) => {
    updateResume({ themeColor: color });
  };

  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
    '#8B5CF6', '#06B6D4', '#F97316', '#84CC16'
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
          AI Tools
        </h3>
        
        <div className="space-y-4">
          <button
            onClick={handleGenerateSummary}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {loading ? 'Generating...' : 'Generate Summary'}
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="professional">Professional</option>
              <option value="creative">Creative</option>
              <option value="friendly">Friendly</option>
              <option value="technical">Technical</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Zap className="h-5 w-5 mr-2 text-orange-600" />
          Auto-Fill
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Software Engineer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years Experience
            </label>
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 5+ years"
            />
          </div>
          
          <button
            onClick={handleAutoFill}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50"
          >
            <Zap className="h-4 w-4 mr-2" />
            {loading ? 'Auto-filling...' : 'Auto-fill Resume'}
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-600" />
          Template
        </h3>
        
        <div className="space-y-2">
          {['modern', 'minimal', 'professional', 'creative'].map((template) => (
            <button
              key={template}
              onClick={() => handleTemplateChange(template)}
              className={`w-full text-left px-3 py-2 rounded-md border transition-colors ${
                currentResume.template === template
                  ? 'bg-blue-100 border-blue-300 text-blue-800'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="capitalize">{template}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Palette className="h-5 w-5 mr-2 text-green-600" />
          Theme Color
        </h3>
        
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              className={`w-8 h-8 rounded-full border-2 ${
                currentResume.themeColor === color
                  ? 'border-gray-800'
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}