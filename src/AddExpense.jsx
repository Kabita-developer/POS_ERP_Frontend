import React, { useState } from 'react';
import { Calendar, MapPin, Tag, DollarSign, FileText, CreditCard, Save, X } from 'lucide-react';
import './AddExpense.css';

function AddExpense({ onClose }) {
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
    console.log('Expense Submitted:', formData);
    // Add logic to save it (e.g., to local storage or API)
    alert('Expense added successfully!');
  };

  return (
    <div className="add-expense-page-overlay fade-in">
      <div className="add-expense-card-modal slide-down">
        <div className="aex-modal-header">
          <h3 className="aex-modal-title">Add Expense</h3>
          <button className="aex-modal-close-btn" aria-label="Close modal" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="aex-modal-body">
          <div className="card-body">
            <div className="required-disclaimer">
              <span className="disclaimer-text">The field labels marked with <span className="req-star">*</span> are required input fields.</span>
            </div>

            <div className="form-grid-layout">
              {/* Date Field */}
              <div className="form-group-item">
                <label className="standard-label">Date <span className="req-star">*</span></label>
                <div className="input-group-with-icon">
                  <Calendar size={18} className="field-icon" />
                  <input 
                    type="date" 
                    name="date"
                    className="premium-input-field" 
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Expense Category Field */}
              <div className="form-group-item">
                <label className="standard-label">Expense Category <span className="req-star">*</span></label>
                <div className="input-group-with-icon">
                  <Tag size={18} className="field-icon" />
                  <select 
                    name="category"
                    className="premium-select-field" 
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
              </div>

              {/* Warehouse Field */}
              <div className="form-group-item">
                <label className="standard-label">Warehouse <span className="req-star">*</span></label>
                <div className="input-group-with-icon">
                  <MapPin size={18} className="field-icon" />
                  <select 
                    name="warehouse"
                    className="premium-select-field" 
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
              </div>

              {/* Amount Field */}
              <div className="form-group-item">
                <label className="standard-label">Amount <span className="req-star">*</span></label>
                <div className="input-group-with-icon">
                  <DollarSign size={18} className="field-icon" />
                  <input 
                    type="number" 
                    name="amount"
                    step="0.01"
                    className="premium-input-field" 
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Account Field */}
              <div className="form-group-item">
                <label className="standard-label">Account</label>
                <div className="input-group-with-icon">
                  <CreditCard size={18} className="field-icon" />
                  <select 
                    name="account"
                    className="premium-select-field" 
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
            </div>

            {/* Note Field */}
            <div className="form-group-item mt-6">
              <label className="standard-label">Note</label>
              <div className="input-group-with-icon align-start">
                <FileText size={18} className="field-icon mt-3" />
                <textarea 
                  name="note"
                  className="premium-textarea-field" 
                  placeholder="Type any additional notes here..."
                  value={formData.note}
                  onChange={handleChange}
                  rows="4"
                />
              </div>
            </div>
          </div>

          <div className="form-action-footer">
            <button type="submit" className="premium-submit-btn">
              <Save size={18} /> Submit Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddExpense;
