import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface Resume {
  id: string;
  title: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  certifications: string[];
  languages: string[];
  hobbies: string[];
  template: string;
  themeColor: string;
  lastModified: string;
}

interface ResumeContextType {
  currentResume: Resume | null;
  resumes: Resume[];
  loadResume: (id: string) => void;
  saveResume: (resume: Resume) => void;
  createResume: () => string;
  deleteResume: (id: string) => void;
  updateResume: (updates: Partial<Resume>) => void;
  generateAIContent: (type: string, context?: any) => Promise<string>;
  loading: boolean;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}

interface ResumeProviderProps {
  children: ReactNode;
}

export function ResumeProvider({ children }: ResumeProviderProps) {
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    if (currentResume) {
      const autoSaveTimer = setInterval(() => {
        saveResume(currentResume);
      }, 15000);

      return () => clearInterval(autoSaveTimer);
    }
  }, [currentResume]);

  const loadResume = (id: string) => {
    const resume = resumes.find(r => r.id === id);
    if (resume) {
      setCurrentResume(resume);
    }
  };

  const saveResume = (resume: Resume) => {
    setLoading(true);
    try {
      const updatedResume = { ...resume, lastModified: new Date().toISOString() };
      setResumes(prev => prev.map(r => r.id === resume.id ? updatedResume : r));
      setCurrentResume(updatedResume);
      toast.success('Resume saved successfully');
    } catch (error) {
      toast.error('Error saving resume');
    } finally {
      setLoading(false);
    }
  };

  const createResume = (): string => {
    const newResume: Resume = {
      id: Date.now().toString(),
      title: 'New Resume',
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      workExperience: [],
      education: [],
      skills: [],
      certifications: [],
      languages: [],
      hobbies: [],
      template: 'modern',
      themeColor: '#3B82F6',
      lastModified: new Date().toISOString(),
    };
    
    setResumes(prev => [...prev, newResume]);
    setCurrentResume(newResume);
    return newResume.id;
  };

  const deleteResume = (id: string) => {
    setResumes(prev => prev.filter(r => r.id !== id));
    if (currentResume?.id === id) {
      setCurrentResume(null);
    }
    toast.success('Resume deleted');
  };

  const updateResume = (updates: Partial<Resume>) => {
    if (currentResume) {
      const updatedResume = { ...currentResume, ...updates };
      setCurrentResume(updatedResume);
    }
  };

  const generateAIContent = async (type: string, context?: any): Promise<string> => {
    setLoading(true);
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResponses = {
        summary: "Dynamic software engineer with 5+ years of experience in full-stack development. Proven track record of delivering scalable web applications and leading cross-functional teams. Passionate about emerging technologies and continuous learning.",
        bulletPoint: "• Developed and maintained 15+ web applications using React, Node.js, and MongoDB, resulting in 40% improved user engagement",
        jobDescription: "Led development of e-commerce platform serving 10,000+ daily users, implementing responsive design and optimizing performance for 50% faster load times"
      };
      
      return mockResponses[type as keyof typeof mockResponses] || "AI-generated content";
    } catch (error) {
      throw new Error('AI generation failed');
    } finally {
      setLoading(false);
    }
  };

  // Initialize with sample data
  useEffect(() => {
    const sampleResume: Resume = {
      id: '1',
      title: 'Software Engineer Resume',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '(555) 123-4567',
      location: 'San Francisco, CA',
      summary: 'Experienced software engineer with expertise in full-stack development.',
      workExperience: [{
        id: '1',
        company: 'Tech Company',
        role: 'Senior Software Engineer',
        startDate: '2020-01',
        endDate: '2024-01',
        description: 'Led development of scalable web applications using React and Node.js.'
      }],
      education: [{
        id: '1',
        school: 'University of California',
        degree: 'Bachelor of Science in Computer Science',
        startDate: '2016-08',
        endDate: '2020-05'
      }],
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
      certifications: ['AWS Certified Developer'],
      languages: ['English', 'Spanish'],
      hobbies: ['Photography', 'Hiking'],
      template: 'modern',
      themeColor: '#3B82F6',
      lastModified: new Date().toISOString(),
    };
    
    setResumes([sampleResume]);
  }, []);

  const value = {
    currentResume,
    resumes,
    loadResume,
    saveResume,
    createResume,
    deleteResume,
    updateResume,
    generateAIContent,
    loading,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}