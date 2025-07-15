import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useResume } from '../../context/ResumeContext';
import Navbar from '../layout/Navbar';
import SectionSidebar from './SectionSidebar';
import ResumeCanvas from './ResumeCanvas';
import AIPanel from './AIPanel';
import { ArrowLeft, Save, Download } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ResumeBuilder() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { currentResume, loadResume, saveResume } = useResume();
  const [activeSection, setActiveSection] = useState('header');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (id) {
      loadResume(id);
    }
  }, [user, id, navigate, loadResume]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [unsavedChanges]);

  const handleSave = () => {
    if (currentResume) {
      saveResume(currentResume);
      setUnsavedChanges(false);
    }
  };

  const handleDownload = () => {
    toast.success('PDF download started');
  };

  const handleBack = () => {
    if (unsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/dashboard');
      }
    } else {
      navigate('/dashboard');
    }
  };

  if (!user || !currentResume) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r">
          <div className="p-4 border-b">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </button>
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {currentResume.title}
            </h2>
          </div>
          <SectionSidebar 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Resume Canvas */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Resume Editor</h1>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </button>
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                </div>
              </div>
              
              <ResumeCanvas
                activeSection={activeSection}
                onUnsavedChange={() => setUnsavedChanges(true)}
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-80 bg-white shadow-sm border-l">
            <AIPanel />
          </div>
        </div>
      </div>
    </div>
  );
}