import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume, type Resume } from '../../context/ResumeContext';
import { Edit, Download, Trash2, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

interface ResumeCardProps {
  resume: Resume;
}

export default function ResumeCard({ resume }: ResumeCardProps) {
  const { deleteResume } = useResume();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/resume/${resume.id}`);
  };

  const handleDownload = () => {
    // Simulate PDF download
    toast.success('PDF download started');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      deleteResume(resume.id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {resume.title}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="Edit Resume"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
              title="Download PDF"
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Delete Resume"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="bg-gray-50 rounded-md p-4 min-h-[120px] border-2 border-dashed border-gray-200">
            <div className="text-xs text-gray-500 mb-2">Preview</div>
            <div className="space-y-1">
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
              <div className="h-2 bg-gray-200 rounded w-1/2"></div>
              <div className="h-2 bg-gray-200 rounded w-2/3"></div>
              <div className="h-2 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {formatDate(resume.lastModified)}
          </div>
          <div className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: resume.themeColor }}
            ></div>
            <span className="capitalize">{resume.template}</span>
          </div>
        </div>
      </div>
    </div>
  );
}