import React, { useState, useRef } from 'react';
import { X, Info, Upload, RotateCcw, HelpCircle, Plus, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Redo, Undo } from 'lucide-react';
import './AddProduct.css';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        productType: 'standard',
        productName: '',
        productCode: '',
        barcodeSymbology: 'code128',
        brand: '',
        category: '',
        productUnit: '',
        saleUnit: '',
        purchaseUnit: '',
        productCost: '',
        productPrice: '',
        dailySaleObjective: '',
        alertQuantity: '',
        productTax: 'no',
        taxMethod: 'exclusive',
        featured: false,
        embeddedBarcode: false,
        hasVariant: false,
        differentWarehousePrice: false,
        hasBatchExpire: false,
        hasIMEI: false,
        addPromotionalPrice: false
    });

    const [fileName, setFileName] = useState('No file chosen');
    const [wordCount, setWordCount] = useState(0);
    const editorRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const generateCode = () => {
        const code = Math.floor(10000000 + Math.random() * 90000000).toString();
        setFormData(prev => ({ ...prev, productCode: code }));
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('No file chosen');
        }
    };

    const handleDetailsChange = () => {
        if (editorRef.current) {
            const text = editorRef.current.innerText;
            const words = text.trim().split(/\s+/).filter(word => word.length > 0);
            setWordCount(words.length);
        }
    };

    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Product Data Submitted:', formData);
        alert('Product added successfully (check console for data)');
    };

    return (
        <div className="add-product-container">
            <div className="add-product-card">
                <div className="page-header">
                    <h1 className="page-title">Add Product</h1>
                </div>

                <div className="required-info-bar">
                    <Info size={14} className="info-icon" />
                    <span>The field labels marked with * are required input fields.</span>
                </div>

                <form onSubmit={handleSubmit} className="add-product-form">
                    <div className="form-grid-three">
                        {/* Row 1 */}
                        <div className="form-group">
                            <label>Product Type *</label>
                            <select 
                                name="productType" 
                                value={formData.productType} 
                                onChange={handleInputChange} 
                                required
                            >
                                <option value="standard">Standard</option>
                                <option value="combo">Combo</option>
                                <option value="digital">Digital</option>
                                <option value="service">Service</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Product Name *</label>
                            <input 
                                type="text" 
                                name="productName" 
                                value={formData.productName} 
                                onChange={handleInputChange} 
                                placeholder="Enter product name" 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Product Code *</label>
                            <div className="input-with-action">
                                <input 
                                    type="text" 
                                    name="productCode" 
                                    value={formData.productCode} 
                                    onChange={handleInputChange} 
                                    placeholder="Enter product code" 
                                    required 
                                />
                                <button type="button" className="action-btn" title="Generate Code" onClick={generateCode}>
                                    <RotateCcw size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="form-group">
                            <label>Barcode Symbology *</label>
                            <select 
                                name="barcodeSymbology" 
                                value={formData.barcodeSymbology} 
                                onChange={handleInputChange} 
                                required
                            >
                                <option value="code128">Code 128</option>
                                <option value="code39">Code 39</option>
                                <option value="ean8">EAN 8</option>
                                <option value="ean13">EAN 13</option>
                                <option value="upca">UPC-A</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Brand</label>
                            <select 
                                name="brand" 
                                value={formData.brand} 
                                onChange={handleInputChange}
                            >
                                <option value="">Select Brand...</option>
                                <option value="lotto">Lotto</option>
                                <option value="nike">Nike</option>
                                <option value="adidas">Adidas</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Category *</label>
                            <select 
                                name="category" 
                                value={formData.category} 
                                onChange={handleInputChange} 
                                required
                            >
                                <option value="">Select Category...</option>
                                <option value="fish">Fish</option>
                                <option value="accessories">Accessories</option>
                                <option value="apparel">Apparel</option>
                            </select>
                        </div>

                        {/* Row 3 */}
                        <div className="form-group">
                            <label>Product Unit *</label>
                            <select 
                                name="productUnit" 
                                value={formData.productUnit} 
                                onChange={handleInputChange} 
                                required
                            >
                                <option value="">Select Product Unit...</option>
                                <option value="pc">Piece</option>
                                <option value="kg">Kilogram</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Sale Unit</label>
                            <select 
                                name="saleUnit" 
                                value={formData.saleUnit} 
                                onChange={handleInputChange}
                            >
                                <option value="">Nothing selected</option>
                                <option value="pc">Piece</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Purchase Unit</label>
                            <select 
                                name="purchaseUnit" 
                                value={formData.purchaseUnit} 
                                onChange={handleInputChange}
                            >
                                <option value="">Nothing selected</option>
                                <option value="pc">Piece</option>
                            </select>
                        </div>

                        {/* Row 4 */}
                        <div className="form-group">
                            <label>Product Cost *</label>
                            <input 
                                type="number" 
                                name="productCost" 
                                value={formData.productCost} 
                                onChange={handleInputChange} 
                                placeholder="0" 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Product Price *</label>
                            <input 
                                type="number" 
                                name="productPrice" 
                                value={formData.productPrice} 
                                onChange={handleInputChange} 
                                placeholder="0" 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Daily Sale Objective <HelpCircle size={14} className="help-icon" />
                            </label>
                            <input 
                                type="number" 
                                name="dailySaleObjective" 
                                value={formData.dailySaleObjective} 
                                onChange={handleInputChange} 
                                placeholder="0" 
                            />
                        </div>

                        {/* Row 5 */}
                        <div className="form-group">
                            <label>Alert Quantity</label>
                            <input 
                                type="number" 
                                name="alertQuantity" 
                                value={formData.alertQuantity} 
                                onChange={handleInputChange} 
                                placeholder="0" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Product Tax</label>
                            <select 
                                name="productTax" 
                                value={formData.productTax} 
                                onChange={handleInputChange}
                            >
                                <option value="no">No Tax</option>
                                <option value="gst">GST 18%</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>
                                Tax Method <HelpCircle size={14} className="help-icon" />
                            </label>
                            <select 
                                name="taxMethod" 
                                value={formData.taxMethod} 
                                onChange={handleInputChange}
                            >
                                <option value="exclusive">Exclusive</option>
                                <option value="inclusive">Inclusive</option>
                            </select>
                        </div>
                    </div>

                    <div className="checkbox-row">
                        <label className="checkbox-item">
                            <input 
                                type="checkbox" 
                                name="featured" 
                                checked={formData.featured} 
                                onChange={handleInputChange} 
                            />
                            <span>Featured</span>
                        </label>
                        <label className="checkbox-item">
                            <input 
                                type="checkbox" 
                                name="embeddedBarcode" 
                                checked={formData.embeddedBarcode} 
                                onChange={handleInputChange} 
                            />
                            <span>Embedded Barcode <HelpCircle size={14} className="help-icon" /></span>
                        </label>
                    </div>
                    {formData.featured && (
                        <p className="featured-helper">Featured product will be displayed in POS</p>
                    )}

                    <div className="form-group full-width">
                        <label>Product Image <HelpCircle size={14} className="help-icon" /></label>
                        <div className="dropzone-area" onClick={() => document.getElementById('image-upload').click()}>
                            <input 
                                type="file" 
                                id="image-upload" 
                                hidden 
                                onChange={handleFileChange} 
                            />
                            <Upload size={36} className="upload-icon" />
                            <p>{fileName === 'No file chosen' ? 'Drop files here to upload' : fileName}</p>
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label>Product Details</label>
                        <div className="editor-container">
                            <div className="editor-menu">
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
                                    <button type="button" className="tool-btn"><Plus size={16} /></button>
                                    <button type="button" className="tool-btn" onClick={() => execCommand('undo')}><Undo size={16} /></button>
                                    <button type="button" className="tool-btn" onClick={() => execCommand('redo')}><Redo size={16} /></button>
                                </div>
                                <div className="toolbar-group">
                                    <select defaultValue="paragraph" className="block-select">
                                        <option value="paragraph">Paragraph</option>
                                        <option value="h1">Heading 1</option>
                                        <option value="h2">Heading 2</option>
                                    </select>
                                </div>
                                <div className="toolbar-group">
                                    <button type="button" className="tool-btn bold" onClick={() => execCommand('bold')}><Bold size={16} /></button>
                                    <button type="button" className="tool-btn italic" onClick={() => execCommand('italic')}><Italic size={16} /></button>
                                    <button type="button" className="tool-btn" onClick={() => execCommand('underline')}><Underline size={16} /></button>
                                    <button type="button" className="tool-btn" onClick={() => execCommand('justifyLeft')}><AlignLeft size={16} /></button>
                                    <button type="button" className="tool-btn" onClick={() => execCommand('justifyCenter')}><AlignCenter size={16} /></button>
                                    <button type="button" className="tool-btn" onClick={() => execCommand('justifyRight')}><AlignRight size={16} /></button>
                                </div>
                            </div>
                            <div 
                                className="editor-content" 
                                contentEditable 
                                ref={editorRef}
                                onInput={handleDetailsChange}
                            ></div>
                            <div className="editor-footer">
                                {wordCount} WORDS
                            </div>
                        </div>
                    </div>

                    <div className="extra-options">
                        <label className="checkbox-item">
                            <input 
                                type="checkbox" 
                                name="hasVariant" 
                                checked={formData.hasVariant} 
                                onChange={handleInputChange} 
                            />
                            <span>This product has variant</span>
                        </label>
                        <label className="checkbox-item">
                            <input 
                                type="checkbox" 
                                name="differentWarehousePrice" 
                                checked={formData.differentWarehousePrice} 
                                onChange={handleInputChange} 
                            />
                            <span>This product has different price for different warehouse</span>
                        </label>
                        <label className="checkbox-item">
                            <input 
                                type="checkbox" 
                                name="hasBatchExpire" 
                                checked={formData.hasBatchExpire} 
                                onChange={handleInputChange} 
                            />
                            <span>This product has batch and expired date</span>
                        </label>
                        <label className="checkbox-item">
                            <input 
                                type="checkbox" 
                                name="hasIMEI" 
                                checked={formData.hasIMEI} 
                                onChange={handleInputChange} 
                            />
                            <span>This product has IMEI or Serial numbers</span>
                        </label>
                        <label className="checkbox-item">
                            <input 
                                type="checkbox" 
                                name="addPromotionalPrice" 
                                checked={formData.addPromotionalPrice} 
                                onChange={handleInputChange} 
                            />
                            <span>Add Promotional Price</span>
                        </label>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-button">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
