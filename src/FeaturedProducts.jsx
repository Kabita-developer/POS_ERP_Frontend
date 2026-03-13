import React from 'react';
import { X, Star, Flame, Award, Heart, TrendingUp, ShoppingCart, Info } from 'lucide-react';
import './FeaturedProducts.css';

const featuredItems = [
    { id: 1, name: 'Premium Espresso', price: 45.00, tag: 'Best Seller', icon: <Flame size={20} />, color: 'orange' },
    { id: 2, name: 'Smart Watch Series 7', price: 199.00, tag: 'New', icon: <Award size={20} />, color: 'blue' },
    { id: 3, name: 'Leather Messenger Bag', price: 89.99, tag: 'Hot', icon: <TrendingUp size={20} />, color: 'red' },
    { id: 4, name: 'Organic Green Tea', price: 12.50, tag: 'Eco', icon: <Heart size={20} />, color: 'green' },
    { id: 5, name: 'Wireless Headphones', price: 129.00, tag: 'Top Rated', icon: <Star size={20} />, color: 'indigo' },
];

function FeaturedProducts({ onClose, onAddToCart }) {
    return (
        <div className="feat-overlay fade-in" onClick={onClose}>
            <div className="feat-container scale-in" onClick={(e) => e.stopPropagation()}>
                {/* ─── Header ─── */}
                <div className="feat-header">
                    <div className="feat-header-left">
                        <div className="feat-header-icon">
                            <Star size={22} fill="currentColor" />
                        </div>
                        <div>
                            <h2 className="feat-title">Featured Selection</h2>
                            <p className="feat-subtitle">Handpicked products for your customers today</p>
                        </div>
                    </div>
                    <button className="feat-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* ─── List Section ─── */}
                <div className="feat-body">
                    <div className="feat-section-label">Top Highlighted Products</div>

                    <div className="feat-list">
                        {featuredItems.map((item) => (
                            <div key={item.id} className={`feat-item feat-item-${item.color}`}>
                                <div className="feat-item-main">
                                    <div className="feat-item-icon-wrap">
                                        {item.icon}
                                    </div>
                                    <div className="feat-item-info">
                                        <div className="feat-item-tag">{item.tag}</div>
                                        <h3 className="feat-item-name">{item.name}</h3>
                                    </div>
                                </div>

                                <div className="feat-item-actions">
                                    <div className="feat-item-price">${item.price.toFixed(2)}</div>
                                    <button
                                        className="feat-add-btn"
                                        onClick={() => {
                                            onAddToCart(item);
                                            onClose();
                                        }}
                                    >
                                        <ShoppingCart size={16} />
                                        Add
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="feat-info-banner">
                        <Info size={16} />
                        <span>Featured products are updated based on recent sales trends.</span>
                    </div>
                </div>

                {/* ─── Footer ─── */}
                <div className="feat-footer">
                    <button className="feat-view-all" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FeaturedProducts;
