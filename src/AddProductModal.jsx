import React, { useState, useEffect } from 'react';
import './AddProductModal.css';
import { X, Info, Upload, RotateCcw, HelpCircle, Plus } from 'lucide-react';

const AddProductModal = ({ isOpen, onClose }) => {
    const [fileName, setFileName] = useState('No file chosen');
    const [isAnimating, setIsAnimating] = useState(false);
    const [details, setDetails] = useState('');
    const [wordCount, setWordCount] = useState(0);

    const handleDetailsChange = (e) => {
        const text = e.target.innerText;
        setDetails(text);
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        setWordCount(words.length);
    };

    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value);
    };

    const generateCode = () => {
        const code = Math.floor(10000000 + Math.random() * 90000000).toString();
        // Here we would ideally update a state variable for the code input
        const input = document.getElementById('product-code-input');
        if (input) {
            input.value = code;
        }
    };

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
        } else {
            setFileName('No file chosen');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Adding Product...');
        onClose();
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
            <div 
                className={`modal-content add-product-premium-modal ${isOpen ? 'slide-up' : ''}`} 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h2 className="modal-title">Add Product</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="required-info">
                        <Info size={14} className="info-icon" />
                        <span>The field labels marked with * are required input fields.</span>
                    </div>

                    <form onSubmit={handleSubmit} className="add-product-form">
                        <div className="form-grid-three">
                            {/* Row 1 */}
                            <div className="form-group">
                                <label>Product Type *</label>
                                <select required>
                                    <option value="standard">Standard</option>
                                    <option value="combo">Combo</option>
                                    <option value="digital">Digital</option>
                                    <option value="service">Service</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Product Name *</label>
                                <input type="text" placeholder="Enter product name" required />
                            </div>
                            <div className="form-group">
                                <label>Product Code *</label>
                                <div className="input-with-action">
                                    <input type="text" id="product-code-input" placeholder="Enter product code" required />
                                    <button type="button" className="refresh-btn" title="Generate Code" onClick={generateCode}>
                                        <RotateCcw size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="form-group">
                                <label>Barcode Symbology *</label>
                                <select required>
                                    <option value="code128">Code 128</option>
                                    <option value="code39">Code 39</option>
                                    <option value="ean8">EAN 8</option>
                                    <option value="ean13">EAN 13</option>
                                    <option value="upca">UPC-A</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Brand</label>
                                <select>
                                    <option value="">Select Brand...</option>
                                    <option value="lotto">Lotto</option>
                                    <option value="nike">Nike</option>
                                    <option value="adidas">Adidas</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Category *</label>
                                <select required>
                                    <option value="">Select Category...</option>
                                    <option value="fish">Fish</option>
                                    <option value="accessories">Accessories</option>
                                    <option value="apparel">Apparel</option>
                                </select>
                            </div>

                            {/* Row 3 */}
                            <div className="form-group">
                                <label>Product Unit *</label>
                                <select required>
                                    <option value="">Select Product Unit...</option>
                                    <option value="pc">Piece</option>
                                    <option value="kg">Kilogram</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Sale Unit</label>
                                <select>
                                    <option value="">Nothing selected</option>
                                    <option value="pc">Piece</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Purchase Unit</label>
                                <select>
                                    <option value="">Nothing selected</option>
                                    <option value="pc">Piece</option>
                                </select>
                            </div>

                            {/* Row 4 */}
                            <div className="form-group">
                                <label>Product Cost *</label>
                                <input type="number" placeholder="0" required />
                            </div>
                            <div className="form-group">
                                <label>Product Price *</label>
                                <input type="number" placeholder="0" required />
                            </div>
                            <div className="form-group">
                                <label className="with-help">
                                    Daily Sale Objective <HelpCircle size={14} className="help-icon" />
                                </label>
                                <input type="number" placeholder="0" />
                            </div>

                            {/* Row 5 */}
                            <div className="form-group">
                                <label>Alert Quantity</label>
                                <input type="number" placeholder="0" />
                            </div>
                            <div className="form-group">
                                <label>Product Tax</label>
                                <select>
                                    <option value="no">No Tax</option>
                                    <option value="gst">GST 18%</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="with-help">
                                    Tax Method <HelpCircle size={14} className="help-icon" />
                                </label>
                                <select>
                                    <option value="exclusive">Exclusive</option>
                                    <option value="inclusive">Inclusive</option>
                                </select>
                            </div>
                        </div>

                        {/* Checkboxes Row */}
                        <div className="checkboxes-section">
                            <label className="checkbox-item">
                                <input type="checkbox" />
                                <span>Featured</span>
                            </label>
                            <label className="checkbox-item">
                                <input type="checkbox" />
                                <span className="with-help">
                                    Embedded Barcode <HelpCircle size={14} className="help-icon" />
                                </span>
                            </label>
                            <p className="helper-text">Featured product will be displayed in POS</p>
                        </div>

                        {/* Image Upload */}
                        <div className="form-group full-width mt-20">
                            <label className="with-help">
                                Product Image <HelpCircle size={14} className="help-icon" />
                            </label>
                            <div className="dropzone-premium">
                                <input 
                                    type="file" 
                                    id="product-image-upload" 
                                    onChange={handleFileChange}
                                    hidden
                                />
                                <label htmlFor="product-image-upload" className="dropzone-label">
                                    <Upload size={32} className="upload-icon" />
                                    <p>{fileName === 'No file chosen' ? 'Drop files here to upload' : fileName}</p>
                                </label>
                            </div>
                        </div>

                        {/* Product Details - Rich Text Area */}
                        <div className="form-group full-width mt-20">
                            <label>Product Details</label>
                            <div className="premium-editor">
                                <div className="editor-nav">
                                    <button type="button">File</button>
                                    <button type="button">Edit</button>
                                    <button type="button">View</button>
                                    <button type="button">Insert</button>
                                    <button type="button">Format</button>
                                    <button type="button">Tools</button>
                                    <button type="button">Table</button>
                                </div>
                                <div className="editor-toolbar">
                                    <div className="toolbar-group">
                                        <button type="button" className="tool-btn"><Plus size={14} /></button>
                                        <button type="button" className="tool-btn" onClick={() => execCommand('undo')}><RotateCcw size={14} /></button>
                                        <button type="button" className="tool-btn" onClick={() => execCommand('redo')}><RotateCcw size={14} className="flipped" /></button>
                                    </div>
                                    <div className="separator"></div>
                                    <div className="toolbar-group">
                                        <select defaultValue="paragraph" className="block-select">
                                            <option value="paragraph">Paragraph</option>
                                            <option value="h1">Heading 1</option>
                                            <option value="h2">Heading 2</option>
                                        </select>
                                    </div>
                                    <div className="separator"></div>
                                    <div className="toolbar-group">
                                        <button type="button" className="tool-btn bold" onClick={() => execCommand('bold')}>B</button>
                                        <button type="button" className="tool-btn italic" onClick={() => execCommand('italic')}>I</button>
                                        <button type="button" className="tool-btn underline" onClick={() => execCommand('underline')}>U</button>
                                        <button type="button" className="tool-btn" onClick={() => execCommand('justifyLeft')}>L</button>
                                        <button type="button" className="tool-btn" onClick={() => execCommand('justifyCenter')}>C</button>
                                        <button type="button" className="tool-btn" onClick={() => execCommand('justifyRight')}>R</button>
                                    </div>
                                </div>
                                <div 
                                    className="editor-content" 
                                    contentEditable 
                                    onInput={handleDetailsChange}
                                    data-placeholder="Enter product details..."
                                ></div>
                                <div className="editor-footer">
                                    {wordCount} WORDS
                                </div>
                            </div>
                        </div>

                        {/* Bottom Extra Checkboxes */}
                        <div className="extra-checkboxes-grid">
                            <label className="checkbox-item-block">
                                <input type="checkbox" />
                                <span>This product has variant</span>
                            </label>
                            <label className="checkbox-item-block">
                                <input type="checkbox" />
                                <span>This product has different price for different warehouse</span>
                            </label>
                            <label className="checkbox-item-block">
                                <input type="checkbox" />
                                <span>This product has batch and expired date</span>
                            </label>
                            <label className="checkbox-item-block">
                                <input type="checkbox" />
                                <span>This product has IMEI or Serial numbers</span>
                            </label>
                            <label className="checkbox-item-block">
                                <input type="checkbox" />
                                <span>Add Promotional Price</span>
                            </label>
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

export default AddProductModal;
