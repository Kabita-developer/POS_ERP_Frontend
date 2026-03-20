import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import './AddExpenseCategoryModal.css';

function EditExpenseCategoryModal({ category, onClose, onSubmit }) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (category) {
      setCode(category.code || '');
      setName(category.name || '');
    }
  }, [category]);

  const generateCode = () => {
    const randomCode = Math.floor(10000000 + Math.random() * 90000000);
    setCode(randomCode.toString());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code && name) {
      onSubmit({ ...category, code, name });
    }
  };

  if (!category) return null;

  return (
    <div className="ec-modal-overlay fade-in">
      <div className="ec-modal-container slide-down">
        <div className="ec-modal-header">
          <h3 className="ec-modal-title">Edit Expense Category</h3>
          <button className="ec-modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="ec-modal-body">
          <p className="ec-form-info">The field labels marked with * are required input fields.</p>
          
          <div className="ec-form-group">
            <label className="ec-form-label">Code <span className="req-star">*</span></label>
            <div className="ec-input-group">
              <input 
                type="text" 
                className="ec-form-input with-addon" 
                placeholder="Type expense category code..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="ec-btn-generate"
                onClick={generateCode}
              >
                Generate
              </button>
            </div>
          </div>
          
          <div className="ec-form-group">
            <label className="ec-form-label">Name <span className="req-star">*</span></label>
            <input 
              type="text" 
              className="ec-form-input" 
              placeholder="Type expense category name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="ec-modal-footer">
            <button type="submit" className="ec-btn-submit">
              <Save size={16} /> Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditExpenseCategoryModal;
