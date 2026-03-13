import React, { useState, useEffect } from 'react';
import './UpdateProductModal.css';
import { X, Info, Upload, RotateCcw, HelpCircle, Plus, Trash2, ImageIcon } from 'lucide-react';

const UpdateProductModal = ({ isOpen, onClose, productData }) => {
    const [fileName, setFileName] = useState('No file chosen');
    const [isAnimating, setIsAnimating] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [showPromoInputs, setShowPromoInputs] = useState(false);
    const [hasWarehouse, setHasWarehouse] = useState(false);
    const [hasBatch, setHasBatch] = useState(false);
    const [hasImei, setHasImei] = useState(false);
    const [hasVariant, setHasVariant] = useState(false);
    
    // Form States
    const [details, setDetails] = useState(productData?.details || 'bnbhjghhgygfgvh hgyyfvrdr gytvse hftydrrs gfdxcvbmkm');

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            // Calculate initial word count
            const words = (productData?.details || details).trim().split(/\s+/).filter(word => word.length > 0);
            setWordCount(words.length);
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen, productData, details]);

    if (!isOpen && !isAnimating) return null;

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
        const input = document.getElementById('update-product-code-input');
        if (input) input.value = code;
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('No file chosen');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updating Product:', productData?.id);
        onClose();
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
            <div 
                className={`modal-content update-product-premium-modal ${isOpen ? 'slide-up' : ''}`} 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h2 className="modal-title">Update Product</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body custom-scrollbar">
                    <div className="required-info">
                        <Info size={14} className="info-icon" />
                        <span>The field labels marked with * are required input fields.</span>
                    </div>

                    <form onSubmit={handleSubmit} className="update-product-form">
                        <div className="form-grid-three">
                            {/* Product Type */}
                            <div className="form-group">
                                <label>Product Type *</label>
                                <select defaultValue={productData?.type?.toLowerCase() || 'digital'} required>
                                    <option value="standard">Standard</option>
                                    <option value="combo">Combo</option>
                                    <option value="digital">Digital</option>
                                    <option value="service">Service</option>
                                </select>
                            </div>
                            
                            {/* Product Name */}
                            <div className="form-group">
                                <label>Product Name *</label>
                                <input type="text" defaultValue={productData?.name || 'umbrella'} required />
                            </div>

                            {/* Product Code */}
                            <div className="form-group">
                                <label>Product Code *</label>
                                <div className="input-with-action">
                                    <input type="text" id="update-product-code-input" defaultValue={productData?.code || '4321'} required />
                                    <button type="button" className="refresh-btn" title="Generate Code" onClick={generateCode}>
                                        <RotateCcw size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Barcode Symbology */}
                            <div className="form-group">
                                <label>Barcode Symbology *</label>
                                <select defaultValue="ean13" required>
                                    <option value="code128">Code 128</option>
                                    <option value="code39">Code 39</option>
                                    <option value="ean8">EAN 8</option>
                                    <option value="ean13">EAN 13</option>
                                    <option value="upca">UPC-A</option>
                                </select>
                            </div>

                            {/* Attach File */}
                            <div className="form-group">
                                <label>Attach File</label>
                                <div className="custom-file-input">
                                    <label htmlFor="update-attach-file" className="file-label">
                                        <div className="choose-btn">Choose File</div>
                                        <span className="file-name">{fileName}</span>
                                    </label>
                                    <input type="file" id="update-attach-file" onChange={handleFileChange} hidden />
                                </div>
                            </div>

                            {/* Brand */}
                            <div className="form-group">
                                <label>Brand</label>
                                <select defaultValue={productData?.brand?.toLowerCase() || 'lotto'}>
                                    <option value="">Select Brand...</option>
                                    <option value="lotto">Lotto</option>
                                    <option value="nike">Nike</option>
                                </select>
                            </div>

                            {/* Category */}
                            <div className="form-group">
                                <label>Category *</label>
                                <select defaultValue={productData?.category?.toLowerCase() || 'fish'} required>
                                    <option value="fish">Fish</option>
                                    <option value="accessories">Accessories</option>
                                </select>
                            </div>

                            {/* Product Price */}
                            <div className="form-group">
                                <label>Product Price *</label>
                                <input type="number" defaultValue={productData?.price || '56'} required />
                            </div>

                            {/* Daily Sale Objective */}
                            <div className="form-group">
                                <label>Daily Sale Objective</label>
                                <input type="number" defaultValue="98" />
                            </div>

                            {/* Product Tax */}
                            <div className="form-group">
                                <label>Product Tax</label>
                                <select defaultValue="no">
                                    <option value="no">No Tax</option>
                                    <option value="gst">GST 18%</option>
                                </select>
                            </div>

                            {/* Tax Method */}
                            <div className="form-group">
                                <label>Tax Method</label>
                                <select defaultValue="inclusive">
                                    <option value="exclusive">Exclusive</option>
                                    <option value="inclusive">Inclusive</option>
                                </select>
                            </div>
                        </div>

                        <div className="checkboxes-aligned-row mt-20">
                            <label className="premium-checkbox">
                                <input type="checkbox" defaultChecked={productData?.featured} />
                                <span className="checkmark"></span>
                                <span className="label-text">Featured</span>
                            </label>
                            <label className="premium-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                <span className="label-text with-help">
                                    Embedded Barcode <HelpCircle size={14} className="help-icon" />
                                </span>
                            </label>
                        </div>

                        {/* Image dropzone */}
                        <div className="form-group full-width mt-30">
                            <label className="with-help">
                                Product Image <HelpCircle size={14} className="help-icon" />
                            </label>
                            <div className="dropzone-modern">
                                <Upload size={32} className="upload-icon" />
                                <p>Drop files here to upload</p>
                                <input type="file" hidden />
                            </div>
                        </div>

                        {/* Image preview List */}
                        <div className="image-preview-list-container mt-20">
                            <table className="preview-table">
                                <thead>
                                    <tr>
                                        <th style={{width: '50px'}}><Plus size={14} /></th>
                                        <th>Image</th>
                                        <th style={{textAlign: 'right'}}>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><Plus size={14} /></td>
                                        <td>
                                            <div className="preview-thumbnail">
                                                <ImageIcon size={20} />
                                            </div>
                                        </td>
                                        <td style={{textAlign: 'right'}}>
                                            <button type="button" className="remove-img-btn"><X size={14} /></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Product Details Editor */}
                        <div className="form-group full-width mt-30">
                            <label>Product Details</label>
                            <div className="premium-editor">
                                <div className="editor-nav">
                                    <button type="button">File</button><button type="button">Edit</button>
                                    <button type="button">View</button><button type="button">Insert</button>
                                    <button type="button">Format</button><button type="button">Tools</button>
                                    <button type="button">Table</button>
                                </div>
                                <div className="editor-toolbar">
                                    <div className="toolbar-group">
                                        <button type="button" className="tool-btn" onClick={() => execCommand('undo')}><RotateCcw size={14} /></button>
                                        <button type="button" className="tool-btn" onClick={() => execCommand('redo')}><RotateCcw size={14} className="flipped" /></button>
                                    </div>
                                    <div className="separator"></div>
                                    <div className="toolbar-group">
                                        <select className="block-select">
                                            <option>Paragraph</option>
                                        </select>
                                    </div>
                                    <div className="separator"></div>
                                    <div className="toolbar-group">
                                        <button type="button" className="tool-btn bold" onClick={() => execCommand('bold')}>B</button>
                                        <button type="button" className="tool-btn italic" onClick={() => execCommand('italic')}>I</button>
                                        <button type="button" className="tool-btn underline" onClick={() => execCommand('underline')}>U</button>
                                        <button type="button" className="tool-btn">A</button>
                                    </div>
                                    <div className="toolbar-group">
                                        <button type="button" className="tool-btn" onClick={() => execCommand('justifyLeft')}>L</button>
                                        <button type="button" className="tool-btn" onClick={() => execCommand('justifyCenter')}>C</button>
                                        <button type="button" className="tool-btn" onClick={() => execCommand('justifyRight')}>R</button>
                                    </div>
                                </div>
                                <div 
                                    className="editor-content" 
                                    contentEditable 
                                    onInput={handleDetailsChange}
                                    dangerouslySetInnerHTML={{ __html: productData?.details || 'bnbhjghhgygfgvh hgyyfvrdr gytvse hftydrrs gfdxcvbmkm' }}
                                ></div>
                                <div className="editor-footer">{wordCount} WORDS</div>
                            </div>
                        </div>

                        {/* Extra Options Checkbox List */}
                        <div className="extra-options-container mt-30">
                            <div className="checkbox-block-row">
                                <input
                                    type="checkbox"
                                    id="chk-warehouse"
                                    checked={hasWarehouse}
                                    onChange={(e) => setHasWarehouse(e.target.checked)}
                                />
                                <label htmlFor="chk-warehouse" className="label-text">This product has different price for different warehouse</label>
                            </div>
                            <div className="checkbox-block-row">
                                <input
                                    type="checkbox"
                                    id="chk-batch"
                                    checked={hasBatch}
                                    onChange={(e) => setHasBatch(e.target.checked)}
                                />
                                <label htmlFor="chk-batch" className="label-text">This product has batch and expired date</label>
                            </div>
                            <div className="checkbox-block-row">
                                <input
                                    type="checkbox"
                                    id="chk-imei"
                                    checked={hasImei}
                                    onChange={(e) => setHasImei(e.target.checked)}
                                />
                                <label htmlFor="chk-imei" className="label-text">This product has IMEI or Serial numbers</label>
                            </div>
                            <div className="checkbox-block-row">
                                <input
                                    type="checkbox"
                                    id="chk-variant"
                                    checked={hasVariant}
                                    onChange={(e) => setHasVariant(e.target.checked)}
                                />
                                <label htmlFor="chk-variant" className="label-text">This product has variant</label>
                            </div>
                            <div className="checkbox-block-row">
                                <input
                                    type="checkbox"
                                    id="chk-promo"
                                    checked={showPromoInputs}
                                    onChange={(e) => setShowPromoInputs(e.target.checked)}
                                />
                                <label htmlFor="chk-promo" className="label-text">Add Promotional Price</label>
                            </div>
                        </div>

                        {/* Promotional Fields - shown when checkbox is checked */}
                        {showPromoInputs && (
                            <div className="promo-fields-row mt-15">
                                <div className="promo-field-group">
                                    <label className="promo-label">Promotional Price</label>
                                    <input
                                        type="number"
                                        className="promo-input"
                                        placeholder="20"
                                        defaultValue={productData?.promoPrice || ''}
                                    />
                                </div>
                                <div className="promo-field-group">
                                    <label className="promo-label">Promotion Starts</label>
                                    <input
                                        type="date"
                                        className="promo-input"
                                        defaultValue={productData?.promoStart || '2025-01-19'}
                                    />
                                </div>
                                <div className="promo-field-group">
                                    <label className="promo-label">Promotion Ends</label>
                                    <input
                                        type="date"
                                        className="promo-input"
                                        defaultValue={productData?.promoEnd || '2025-01-29'}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="modal-actions mt-30">
                            <button type="submit" className="submit-btn-premium">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductModal;
