import React from 'react';
import { useResume } from '../../context/ResumeContext';
import HeaderSection from './sections/HeaderSection';
import SummarySection from './sections/SummarySection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import SkillsSection from './sections/SkillsSection';
import CertificationsSection from './sections/CertificationsSection';
import LanguagesSection from './sections/LanguagesSection';
import HobbiesSection from './sections/HobbiesSection';

interface ResumeCanvasProps {
  activeSection: string;
  onUnsavedChange: () => void;
}

export default function ResumeCanvas({ activeSection, onUnsavedChange }: ResumeCanvasProps) {
  const { currentResume } = useResume();

  if (!currentResume) return null;

  const renderSection = () => {
    switch (activeSection) {
      case 'header':
        return <HeaderSection onUnsavedChange={onUnsavedChange} />;
      case 'summary':
        return <SummarySection onUnsavedChange={onUnsavedChange} />;
      case 'experience':
        return <ExperienceSection onUnsavedChange={onUnsavedChange} />;
      case 'education':
        return <EducationSection onUnsavedChange={onUnsavedChange} />;
      case 'skills':
        return <SkillsSection onUnsavedChange={onUnsavedChange} />;
      case 'certifications':
        return <CertificationsSection onUnsavedChange={onUnsavedChange} />;
      case 'languages':
        return <LanguagesSection onUnsavedChange={onUnsavedChange} />;
      case 'hobbies':
        return <HobbiesSection onUnsavedChange={onUnsavedChange} />;
      default:
        return <HeaderSection onUnsavedChange={onUnsavedChange} />;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Resume Preview */}
        <div className="bg-white p-8" style={{ minHeight: '11in' }}>
          {renderSection()}
        </div>
      </div>
    </div>
  );
}