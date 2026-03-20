import React, { useState, useEffect } from 'react';
import { X, Save, Calendar, MapPin, Tag, DollarSign, FileText } from 'lucide-react';
import './EditExpenseModal.css';

function EditExpenseModal({ expense, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    date: '',
    referenceNo: '',
    warehouse: '',
    category: '',
    amount: '',
    note: ''
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        date: expense.date || '',
        referenceNo: expense.referenceNo || '',
        warehouse: expense.warehouse || '',
        category: expense.category || '',
        amount: expense.amount || '',
        note: expense.note || ''
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...expense, ...formData });
  };

  if (!expense) return null;

  return (
    <div className="eex-modal-overlay fade-in">
      <div className="eex-modal-container slide-down">
        <div className="eex-modal-header">
          <h3 className="eex-modal-title">Edit Expense</h3>
          <button className="eex-modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="eex-modal-body">
          <p className="eex-form-info">The field labels marked with * are required input fields.</p>
          
          <div className="eex-form-grid">
            {/* Date */}
            <div className="eex-form-group">
              <label className="eex-form-label"><Calendar size={14} className="inline mr-1" /> Date <span className="req-star">*</span></label>
              <input 
                type="date" 
                name="date"
                className="eex-form-input" 
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Warehouse */}
            <div className="eex-form-group">
              <label className="eex-form-label"><MapPin size={14} className="inline mr-1" /> Warehouse <span className="req-star">*</span></label>
              <select 
                name="warehouse"
                className="eex-form-input" 
                value={formData.warehouse}
                onChange={handleChange}
                required
              >
                <option value="">Select Warehouse</option>
                <option value="Main Warehouse">Main Warehouse</option>
                <option value="Store A">Store A</option>
                <option value="Store B">Store B</option>
              </select>
            </div>

            {/* Category */}
            <div className="eex-form-group">
              <label className="eex-form-label"><Tag size={14} className="inline mr-1" /> Category <span className="req-star">*</span></label>
              <select 
                name="category"
                className="eex-form-input" 
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Office Supplies">Office Supplies</option>
                <option value="Software Licenses">Software Licenses</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Hardware Repairs">Hardware Repairs</option>
              </select>
            </div>

            {/* Amount */}
            <div className="eex-form-group">
              <label className="eex-form-label"><DollarSign size={14} className="inline mr-1" /> Amount <span className="req-star">*</span></label>
              <input 
                type="number" 
                name="amount"
                step="0.01"
                className="eex-form-input" 
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          {/* Note */}
          <div className="eex-form-group">
            <label className="eex-form-label"><FileText size={14} className="inline mr-1" /> Note</label>
            <textarea 
              name="note"
              className="eex-form-input eex-textarea" 
              placeholder="Type any additional notes here..."
              value={formData.note}
              onChange={handleChange}
              rows="3"
            />
          </div>
          
          <div className="eex-modal-footer">
            <button type="submit" className="eex-btn-submit">
              <Save size={16} /> Update Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditExpenseModal;
