import React from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Mail, Phone, MapPin } from 'lucide-react';

interface HeaderSectionProps {
  onUnsavedChange: () => void;
}

export default function HeaderSection({ onUnsavedChange }: HeaderSectionProps) {
  const { currentResume, updateResume } = useResume();

  if (!currentResume) return null;

  const handleChange = (field: string, value: string) => {
    updateResume({ [field]: value });
    onUnsavedChange();
  };

  return (
    <div className="border-b pb-6 mb-6">
      <div className="text-center">
        <input
          type="text"
          value={currentResume.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="text-4xl font-bold text-gray-900 text-center w-full border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
          placeholder="Your Full Name"
        />
        
        <div className="flex justify-center items-center space-x-6 mt-4 text-gray-600">
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            <input
              type="email"
              value={currentResume.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
              placeholder="email@example.com"
            />
          </div>
          
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            <input
              type="tel"
              value={currentResume.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
              placeholder="(555) 123-4567"
            />
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <input
              type="text"
              value={currentResume.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
              placeholder="City, State"
            />
          </div>
        </div>
      </div>
    </div>
  );
}