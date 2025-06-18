import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  function createMyPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    //after creation or updation
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  return (
    <div className='card mx-auto'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-900 mb-2 dark:text-gray-100'>
          {pasteId ? 'Edit Paste' : 'Create New Paste'}
        </h2>
        <p className='text-gray-600 dark:text-gray-300'>
          {pasteId ? 'Update your existing paste below' : 'Create and save your notes or code snippets'}
        </p>
      </div>

      <div className='space-y-6'>
        <div>
          <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200'>
            Title
          </label>
          <input
            id="title"
            className="input"
            type="text"
            placeholder="Enter a descriptive title for your paste..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="content" className='block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200'>
            Content
          </label>
          <textarea
            id="content"
            className="textarea"
            value={value}
            placeholder="Enter your content here... (code, notes, or any text)"
            onChange={(e) => setValue(e.target.value)}
            rows={20}
          />
        </div>

        <div className='flex justify-end'>
          <button 
            onClick={createMyPaste}
            className='btn btn-primary'
            disabled={!title.trim() || !value.trim()}
          >
            {pasteId ? 'Update Paste' : 'Create Paste'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
