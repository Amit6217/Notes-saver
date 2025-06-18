import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const allPastes = useSelector((state) => state.paste.pastes);
  
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    toast.error("Paste not found");
    navigate("/paste");
    return null;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className='card max-w-4xl mx-auto'>
      <div className='mb-6'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>View Paste</h2>
          <button 
            onClick={() => navigate('/paste')}
            className='btn btn-secondary'
          >
            ← Back to Pastes
          </button>
        </div>
        <p className='text-gray-600 dark:text-gray-300'>View and read your saved paste content</p>
      </div>

      <div className='space-y-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200'>
            Title
          </label>
          <input
            className="input"
            type="text"
            value={paste.title}
            disabled
            readOnly
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200'>
            Content
          </label>
          <textarea
            className="textarea"
            value={paste.content}
            disabled
            readOnly
            rows={20}
          />
        </div>

        <div className='flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700'>
          <div className='text-sm text-gray-500 dark:text-gray-400'>
            Created: {formatDate(paste.createdAt)}
          </div>
          <div className='flex gap-2'>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(paste.content);
                toast.success('Content copied to clipboard!');
              }}
              className='btn btn-primary'
            >
              Copy Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
