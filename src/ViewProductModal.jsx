import React, { useState, useEffect } from 'react';
import './ViewProductModal.css';
import { X, Printer, Package, Tag, Hash, Layout, Layers, Box, Info, Image as ImageIcon } from 'lucide-react';

const ViewProductModal = ({ isOpen, onClose, productData }) => {
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

    return (
        <div className={`modal-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
            <div 
                className={`modal-content view-product-premium-modal ${isOpen ? 'slide-up' : ''}`} 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <div className="header-left">
                        <h2 className="modal-title">Product Details</h2>
                        <button className="print-header-btn">
                            <Printer size={16} />
                            <span>Print</span>
                        </button>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="product-view-layout">
                        {/* Left Side: Product Image */}
                        <div className="product-image-section">
                            <div className="main-image-preview">
                                {productData?.image ? (
                                    <img src={productData.image} alt={productData.name} />
                                ) : (
                                    <div className="image-placeholder">
                                        <ImageIcon size={64} />
                                        <span>No Image Available</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Side: Product Details */}
                        <div className="product-info-section">
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Type:</span>
                                    <span className="info-value">{productData?.type || 'digital'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Name:</span>
                                    <span className="info-value highlight">{productData?.name || 'umbrella'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Code:</span>
                                    <span className="info-value code">{productData?.code || '4321'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Brand:</span>
                                    <span className="info-value">{productData?.brand || 'Lotto'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Category:</span>
                                    <span className="info-value">{productData?.category || 'fish'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Quantity:</span>
                                    <span className="info-value">{productData?.quantity || '0'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Unit:</span>
                                    <span className="info-value">{productData?.unit || 'N/A'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Cost:</span>
                                    <span className="info-value">INR {productData?.cost || '0'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Price:</span>
                                    <span className="info-value price-tag">INR {productData?.price || '56'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Tax:</span>
                                    <span className="info-value">{productData?.tax || 'N/A'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Tax Method:</span>
                                    <span className="info-value">{productData?.taxMethod || 'Inclusive'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Alert Quantity:</span>
                                    <span className="info-value alert-val">{productData?.alertQuantity || '0'}</span>
                                </div>
                            </div>

                            <div className="product-description-view">
                                <h3 className="section-title">Product Details:</h3>
                                <div className="description-content">
                                    {productData?.details || 'bnbhjghhgygfgvh hgyyfvrdr gytvse hftydrrs gfdxcvbmkm'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProductModal;
