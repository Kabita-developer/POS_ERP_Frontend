import React, { useState, useEffect } from 'react';
import './AddCategoryModal.css';
import { X, Upload, Info } from 'lucide-react';

const AddCategoryModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        parentCategory: '',
        image: null
    });
    const [fileName, setFileName] = useState('No file chosen');
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen && !isAnimating) return null;

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFileName('No file chosen');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting Category:', formData);
        // Add your submission logic here
        onClose();
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
            <div 
                className={`modal-content add-category-modal ${isOpen ? 'slide-up' : ''}`} 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h2 className="modal-title">Add Category</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="required-info">
                        <Info size={14} className="info-icon" />
                        <span>The field labels marked with * are required input fields.</span>
                    </div>

                    <form onSubmit={handleSubmit} className="add-category-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Name *</label>
                                <input 
                                    type="text" 
                                    placeholder="Type category name..." 
                                    required 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>

                            <div className="form-group">
                                <label>Image</label>
                                <div className="custom-file-upload">
                                    <label htmlFor="category-image" className="file-label">
                                        <div className="choose-btn">Choose File</div>
                                        <span className="file-name">{fileName}</span>
                                    </label>
                                    <input 
                                        type="file" 
                                        id="category-image" 
                                        onChange={handleFileChange}
                                        hidden
                                    />
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label>Parent Category</label>
                                <select 
                                    value={formData.parentCategory}
                                    onChange={(e) => setFormData({...formData, parentCategory: e.target.value})}
                                >
                                    <option value="">No Parent Category</option>
                                    <option value="accessories">Accessories</option>
                                    <option value="apparel">Apparel</option>
                                    <option value="biscuit">Biscuit</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-footer">
                            <button type="submit" className="submit-btn">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCategoryModal;
