import React, { useState } from 'react';
import { X, Save, Calendar, MapPin, Tag, DollarSign, FileText, CreditCard } from 'lucide-react';
import './AddExpenseModal.css';

function AddExpenseModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    warehouse: '',
    category: '',
    amount: '',
    account: '',
    note: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      ...formData, 
      id: Date.now(), 
      referenceNo: `EXP-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: parseFloat(formData.amount)
    });
  };

  return (
    <div className="aex-modal-overlay fade-in">
      <div className="aex-modal-container slide-down">
        <div className="aex-modal-header">
          <h3 className="aex-modal-title">Add Expense</h3>
          <button className="aex-modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="aex-modal-body">
          <p className="aex-form-info">The field labels marked with * are required input fields.</p>
          
          <div className="aex-form-grid">
            {/* Date */}
            <div className="aex-form-group">
              <label className="aex-form-label"><Calendar size={14} className="inline mr-1" /> Date <span className="req-star">*</span></label>
              <input 
                type="date" 
                name="date"
                className="aex-form-input" 
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Expense Category */}
            <div className="aex-form-group">
              <label className="aex-form-label"><Tag size={14} className="inline mr-1" /> Expense Category <span className="req-star">*</span></label>
              <select 
                name="category"
                className="aex-form-input" 
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Expense Category...</option>
                <option value="Office Supplies">Office Supplies</option>
                <option value="Software Licenses">Software Licenses</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Hardware Repairs">Hardware Repairs</option>
              </select>
            </div>

            {/* Warehouse */}
            <div className="aex-form-group">
              <label className="aex-form-label"><MapPin size={14} className="inline mr-1" /> Warehouse <span className="req-star">*</span></label>
              <select 
                name="warehouse"
                className="aex-form-input" 
                value={formData.warehouse}
                onChange={handleChange}
                required
              >
                <option value="">Select Warehouse...</option>
                <option value="Main Warehouse">Main Warehouse</option>
                <option value="Store A">Store A</option>
                <option value="Store B">Store B</option>
              </select>
            </div>

            {/* Amount */}
            <div className="aex-form-group">
              <label className="aex-form-label"><DollarSign size={14} className="inline mr-1" /> Amount <span className="req-star">*</span></label>
              <input 
                type="number" 
                name="amount"
                step="0.01"
                className="aex-form-input" 
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>

            {/* Account */}
            <div className="aex-form-group">
              <label className="aex-form-label"><CreditCard size={14} className="inline mr-1" /> Account</label>
              <select 
                name="account"
                className="aex-form-input" 
                value={formData.account}
                onChange={handleChange}
              >
                <option value="">Select Account</option>
                <option value="Ventas [67665677]">Ventas [67665677]</option>
                <option value="Savings [11223344]">Savings [11223344]</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
          </div>
          
          {/* Note */}
          <div className="aex-form-group">
            <label className="aex-form-label"><FileText size={14} className="inline mr-1" /> Note</label>
            <textarea 
              name="note"
              className="aex-form-input aex-textarea" 
              placeholder="Type any additional notes here..."
              value={formData.note}
              onChange={handleChange}
              rows="3"
            />
          </div>
          
          <div className="aex-modal-footer">
            <button type="submit" className="aex-btn-submit">
              <Save size={16} /> Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddExpenseModal;
