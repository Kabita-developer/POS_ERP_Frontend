import React, { useState } from 'react';
import { X, Globe, Search, Award, Zap, Anchor, Shield, Star, Rocket, Target, Heart } from 'lucide-react';
import './BrandSelector.css';

const brands = [
    { id: 1, name: 'Lotto', products: 45, icon: <Award size={24} />, color: 'red' },
    { id: 2, name: 'Nike', products: 120, icon: <Zap size={24} />, color: 'blue' },
    { id: 3, name: 'Adidas', products: 95, icon: <Anchor size={24} />, color: 'black' },
    { id: 4, name: 'Puma', products: 67, icon: <Shield size={24} />, color: 'orange' },
    { id: 5, name: 'Reebok', products: 38, icon: <Star size={24} />, color: 'indigo' },
    { id: 6, name: 'Levi\'s', products: 52, icon: <Target size={24} />, color: 'green' },
    { id: 7, name: 'Zara', products: 89, icon: <Heart size={24} />, color: 'pink' },
    { id: 8, name: 'Gucci', products: 23, icon: <Rocket size={24} />, color: 'gold' },
];

function BrandSelector({ onClose, onSelect }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBrands = brands.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="brnd-overlay fade-in" onClick={onClose}>
            <div className="brnd-container scale-in" onClick={(e) => e.stopPropagation()}>
                {/* ─── Header ─── */}
                <div className="brnd-header">
                    <div className="brnd-header-left">
                        <div className="brnd-header-icon">
                            <Globe size={20} />
                        </div>
                        <div>
                            <h2 className="brnd-title">Choose Brand</h2>
                            <p className="brnd-subtitle">Browse products by their manufacturer</p>
                        </div>
                    </div>
                    <button className="brnd-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* ─── Search Bar ─── */}
                <div className="brnd-search-wrap">
                    <div className="brnd-search-inner">
                        <Search size={18} className="brnd-search-icon" />
                        <input
                            type="text"
                            placeholder="Search brands..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* ─── Grid ─── */}
                <div className="brnd-grid">
                    {filteredBrands.length > 0 ? (
                        filteredBrands.map((brand) => (
                            <div
                                key={brand.id}
                                className={`brnd-card brnd-card-${brand.color}`}
                                onClick={() => {
                                    onSelect(brand.name);
                                    onClose();
                                }}
                            >
                                <div className="brnd-card-top">
                                    <div className="brnd-badge">{brand.products} Items</div>
                                </div>
                                <div className="brnd-icon-circle">
                                    {brand.icon}
                                </div>
                                <h3 className="brnd-name">{brand.name}</h3>
                                <div className="brnd-select-hint">Select Brand</div>
                            </div>
                        ))
                    ) : (
                        <div className="brnd-no-results">
                            <p>No brands found matching "{searchTerm}"</p>
                        </div>
                    )}
                </div>

                {/* ─── Footer ─── */}
                <div className="brnd-footer">
                    <button className="brnd-all-btn" onClick={() => { onSelect('All Brands'); onClose(); }}>
                        View All Brands
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BrandSelector;
