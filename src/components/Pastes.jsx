import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Pastes = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const pastes = useSelector((state) => state.paste.pastes);

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  function handleCopy(content) {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-900 mb-2 dark:text-gray-100'>My Pastes</h2>
        <p className='text-gray-600 dark:text-gray-300'>Manage and organize your saved notes and code snippets</p>
      </div>

      <div className='card mb-6'>
        <div className='relative'>
          <input
            type="search"
            className="input pl-10"
            placeholder="     Search pastes by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className='card text-center py-12'>
          <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-gray-700'>
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className='text-lg font-medium text-gray-900 mb-2 dark:text-gray-100'>No pastes found</h3>
          <p className='text-gray-600 mb-4 dark:text-gray-300'>
            {searchTerm ? 'Try adjusting your search terms' : 'Create your first paste to get started'}
          </p>
          {!searchTerm && (
            <Link to="/" className='btn btn-primary'>
              Create First Paste
            </Link>
          )}
        </div>
      ) : (
        <div className='grid gap-4'>
          {filteredData.map((paste) => (
            <div key={paste._id} className='card'>
              <div className='flex items-start justify-between mb-4'>
                <div className='flex-1'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2 dark:text-gray-100'>{paste.title}</h3>
                  <p className='text-gray-600 text-sm mb-3 line-clamp-3 dark:text-gray-300'>
                    {paste.content.length > 500 ? paste.content.substring(0, 500) + '...' : paste.content}
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    Created: {formatDate(paste.createdAt)}
                  </p>
                </div>
              </div>
              
              <div className='flex flex-wrap gap-2'>
                <Link 
                  to={`/?pasteId=${paste._id}`}
                  className='badge badge-blue'
                >
                  Edit
                </Link>
                <Link 
                  to={`/paste/${paste._id}`}
                  className='badge badge-green'
                >
                  View
                </Link>
                <button 
                  onClick={() => handleCopy(paste.content)}
                  className='badge badge-purple'
                >
                  Copy
                </button>
                <button 
                  onClick={() => handleDelete(paste._id)}
                  className='badge badge-red'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pastes;
