import React from 'react';
import { X, LayoutGrid, ShoppingBag, Leaf, Fish, Shirt, Box, Layers, Zap, Watch, Utensils } from 'lucide-react';
import './CategorySelector.css';

const categories = [
    { id: 1, name: 'Biscuit', count: 12, icon: <Layers size={24} />, color: 'purple' },
    { id: 2, name: 'Flower', count: 8, icon: <Leaf size={24} />, color: 'green' },
    { id: 3, name: 'Fish', count: 5, icon: <Fish size={24} />, color: 'blue' },
    { id: 4, name: 'Apparel', count: 24, icon: <Shirt size={24} />, color: 'orange' },
    { id: 5, name: 'Urn', count: 3, icon: <Box size={24} />, color: 'pink' },
    { id: 6, name: 'Rty', count: 7, icon: <Zap size={24} />, color: 'yellow' },
    { id: 7, name: 'Fhj', count: 9, icon: <Watch size={24} />, color: 'cyan' },
    { id: 8, name: 'Accessories', count: 18, icon: <ShoppingBag size={24} />, color: 'indigo' },
    { id: 9, name: 'Chocolate', count: 15, icon: <Utensils size={24} />, color: 'red' },
];

function CategorySelector({ onClose, onSelect }) {
    return (
        <div className="cat-overlay fade-in" onClick={onClose}>
            <div className="cat-container scale-in" onClick={(e) => e.stopPropagation()}>
                {/* ─── Header ─── */}
                <div className="cat-header">
                    <div className="cat-header-left">
                        <div className="cat-header-icon">
                            <LayoutGrid size={20} />
                        </div>
                        <div>
                            <h2 className="cat-title">Choose Category</h2>
                            <p className="cat-subtitle">Select a category to browse products</p>
                        </div>
                    </div>
                    <button className="cat-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* ─── Grid ─── */}
                <div className="cat-grid">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className={`cat-card cat-card-${cat.color}`}
                            onClick={() => {
                                onSelect(cat.name);
                                onClose();
                            }}
                        >
                            <div className="cat-card-inner">
                                <div className="cat-icon-wrap">
                                    {cat.icon}
                                </div>
                                <h3 className="cat-name">{cat.name}</h3>
                                <span className="cat-count">{cat.count} Products</span>
                            </div>
                            <div className="cat-card-bg-icon">
                                {cat.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ─── Footer ─── */}
                <div className="cat-footer">
                    <button className="cat-back-btn" onClick={onClose}>
                        Back to Products
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CategorySelector;
