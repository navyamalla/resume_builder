import React from 'react';
import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award, 
  Languages, 
  Heart,
  Plus
} from 'lucide-react';

interface SectionSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: 'header', label: 'Header', icon: User },
  { id: 'summary', label: 'Summary', icon: FileText },
  { id: 'experience', label: 'Work Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'languages', label: 'Languages', icon: Languages },
  { id: 'hobbies', label: 'Hobbies', icon: Heart },
];

export default function SectionSidebar({ activeSection, onSectionChange }: SectionSidebarProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-4">Resume Sections</h3>
      <nav className="space-y-2">
        {sections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSectionChange(id)}
            className={`w-full flex items-center px-3 py-2 text-left text-sm font-medium rounded-md transition-colors ${
              activeSection === id
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon className="h-4 w-4 mr-3" />
            {label}
          </button>
        ))}
      </nav>
      
      <div className="mt-6 pt-6 border-t">
        <button className="w-full flex items-center px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
          <Plus className="h-4 w-4 mr-3" />
          Add Section
        </button>
      </div>
    </div>
  );
}