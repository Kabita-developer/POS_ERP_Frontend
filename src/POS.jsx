import React, { useState } from 'react';
import './POS.css';
import TodaySaleModal from './TodaySaleModal';
import TodaysProfitModal from './TodaysProfitModal';
import UserProfileDropdown from './UserProfileDropdown';
import CategorySelector from './CategorySelector';
import BrandSelector from './BrandSelector';
import FeaturedProducts from './FeaturedProducts';
import CouponModal from './CouponModal';
import OrderTaxModal from './OrderTaxModal';
import OrderDiscountModal from './OrderDiscountModal';
import ShippingModal from './ShippingModal';
import ProductEditModal from './ProductEditModal';
import FinalizeSaleCardModal from './FinalizeSaleCardModal';
import FinalizeSaleCashModal from './FinalizeSaleCashModal';
import FinalizeSalePaypalModal from './FinalizeSalePaypalModal';
import FinalizeSaleChequeModal from './FinalizeSaleChequeModal';
import FinalizeSaleGiftCardModal from './FinalizeSaleGiftCardModal';
import RecentTransactionModal from './RecentTransactionModal';
import {
  Menu, Maximize, Settings, Printer, ShoppingBag, LineChart, User, ChevronDown,
  Search, Plus, CreditCard, Banknote, Edit3, FileSignature, Gift, Landmark,
  Star, XCircle, Clock, Edit2, ShoppingBasket, Package,
  Warehouse, UserCircle, Receipt, Lock, Key, Smartphone, Save, X,
  Building2, Hash, Eye, EyeOff
} from 'lucide-react';

function POS({ onBackToDashboard }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isWarehouseOpen, setIsWarehouseOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState('tyuy');
  const warehouses = ['rrrr', 'gudam', 'tyuy', 'yui'];

  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState('ghghgh (bhghhgj)');
  const customers = ['ghghgh (bhghhgj)', 'modon (mogaTel)', 'bhjhghj (uyyu)', 'bhvv (bcxc)'];

  const [isTestOpen, setIsTestOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState('test (1234575575)');
  const tests = ['test (1234575575)', 'unit_test_A', 'performance_check', 'security_audit'];

  const [warehouseSearch, setWarehouseSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [testSearch, setTestSearch] = useState('');

  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isTodaySaleOpen, setIsTodaySaleOpen] = useState(false);
  const [isSaleReportOpen, setIsSaleReportOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCategorySelectorOpen, setIsCategorySelectorOpen] = useState(false);
  const [isBrandSelectorOpen, setIsBrandSelectorOpen] = useState(false);
  const [isFeaturedOpen, setIsFeaturedOpen] = useState(false);
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [isOrderTaxOpen, setIsOrderTaxOpen] = useState(false);
  const [isOrderDiscountOpen, setIsOrderDiscountOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [isProductEditOpen, setIsProductEditOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isCashModalOpen, setIsCashModalOpen] = useState(false);
  const [isPaypalModalOpen, setIsPaypalModalOpen] = useState(false);
  const [isChequeModalOpen, setIsChequeModalOpen] = useState(false);
  const [isGiftCardModalOpen, setIsGiftCardModalOpen] = useState(false);
  const [isRecentTransactionOpen, setIsRecentTransactionOpen] = useState(false);
  const [chequeModalMethod, setChequeModalMethod] = useState('cheque');
  const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
  const [showStripeSecret, setShowStripeSecret] = useState(false);
  const [showPaypalPass, setShowPaypalPass] = useState(false);

  const filteredWarehouses = warehouses.filter(wh => wh.toLowerCase().includes(warehouseSearch.toLowerCase()));
  const filteredCustomers = customers.filter(cust => cust.toLowerCase().includes(customerSearch.toLowerCase()));
  const filteredTests = tests.filter(test => test.toLowerCase().includes(testSearch.toLowerCase()));

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="pos-container">
      {/* HEADER IS NOW GLOBAL IN POS CONTAINER TO STAY ABOVE SETTINGS AS WELL */}
      <header className="pos-header global-header">
        <button
          className="pos-icon-btn outline pos-tooltip-btn"
          data-tooltip={isSettingsOpen ? 'Close Settings' : 'Back to Dashboard'}
          onClick={isSettingsOpen ? toggleSettings : onBackToDashboard}
        >
          <Menu size={20} />
        </button>
        <div className="pos-header-actions">
          <button className="pos-icon-btn pos-tooltip-btn" data-tooltip="Fullscreen" onClick={toggleFullScreen}>
            <Maximize size={18} />
          </button>
          <button
            className={`pos-icon-btn pos-tooltip-btn ${isSettingsOpen ? 'active' : ''}`}
            data-tooltip="POS Settings"
            onClick={toggleSettings}
          >
            <Settings size={18} />
          </button>
          <button className="pos-icon-btn pos-tooltip-btn" data-tooltip="Print Receipt">
            <Printer size={18} />
          </button>
          <button className="pos-icon-btn pos-tooltip-btn" data-tooltip="Cash Register" onClick={() => setIsRegisterModalOpen(true)}>
            <ShoppingBag size={18} />
          </button>
          <button className="pos-icon-btn pos-tooltip-btn" data-tooltip="Today's Sale" onClick={() => setIsTodaySaleOpen(true)}>
            <ShoppingBasket size={18} />
          </button>
          <button className="pos-icon-btn pos-tooltip-btn" data-tooltip="Sales Report" onClick={() => setIsSaleReportOpen(true)}>
            <LineChart size={18} />
          </button>
          <div className="pos-user-profile" onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <div className="profile-trigger">
              <User size={18} />
              <span>Admin</span>
              <ChevronDown size={14} className={isProfileOpen ? 'rotate-180' : ''} />
            </div>

            {isProfileOpen && (
              <UserProfileDropdown
                onClose={() => setIsProfileOpen(false)}
                onLogout={() => {
                  console.log('Logging out...');
                  setIsProfileOpen(false);
                  onBackToDashboard();
                }}
              />
            )}
          </div>
        </div>
      </header>

      {isSettingsOpen ? (
        <div className="pos-settings-view fade-in">
          <div className="settings-content-wrapper">

            {/* Hero Header */}
            <div className="settings-hero">
              <div className="settings-hero-icon">
                <Settings size={26} />
              </div>
              <div className="settings-hero-text">
                <h2 className="settings-hero-title">POS Settings</h2>
                <p className="settings-hero-sub">Configure your point-of-sale preferences</p>
              </div>
              <button className="settings-close-btn" onClick={toggleSettings}>
                <X size={20} />
              </button>
            </div>

            {/* Section 1 — General Configuration */}
            <div className="settings-section-card">
              <div className="settings-section-head">
                <div className="section-icon-wrap purple"><Building2 size={15} /></div>
                <div>
                  <h3 className="section-title">General Configuration</h3>
                  <p className="section-subtitle">Basic POS setup and defaults</p>
                </div>
                <span className="section-required-note">Fields marked <span className="req-star">*</span> are required</span>
              </div>
              <div className="settings-form-grid">
                <div className="sform-group">
                  <label className="sform-label"><UserCircle size={13} className="label-icon" />Default Customer <span className="req-star">*</span></label>
                  <div className="sselect-wrapper">
                    <select className="sform-select">
                      <option>test (1234575575)</option>
                      <option>Walking Customer</option>
                    </select>
                    <ChevronDown size={13} className="sselect-arrow" />
                  </div>
                </div>
                <div className="sform-group">
                  <label className="sform-label"><Warehouse size={13} className="label-icon" />Default Warehouse <span className="req-star">*</span></label>
                  <div className="sselect-wrapper">
                    <select className="sform-select">
                      <option>rrrr</option>
                      <option>Main Warehouse</option>
                    </select>
                    <ChevronDown size={13} className="sselect-arrow" />
                  </div>
                </div>
                <div className="sform-group">
                  <label className="sform-label"><Receipt size={13} className="label-icon" />Default Biller <span className="req-star">*</span></label>
                  <div className="sselect-wrapper">
                    <select className="sform-select">
                      <option>ghghgh (bhghhgj)</option>
                      <option>Biller Admin</option>
                    </select>
                    <ChevronDown size={13} className="sselect-arrow" />
                  </div>
                </div>
                <div className="sform-group">
                  <label className="sform-label"><Hash size={13} className="label-icon" />Displayed Number of Product Row <span className="req-star">*</span></label>
                  <input type="number" className="sform-input" defaultValue="4" min="1" />
                </div>
              </div>
            </div>

            {/* Section 2 — Payment Gateway */}
            <div className="settings-section-card">
              <div className="settings-section-head">
                <div className="section-icon-wrap teal"><CreditCard size={15} /></div>
                <div>
                  <h3 className="section-title">Payment Gateway</h3>
                  <p className="section-subtitle">Stripe &amp; PayPal integration keys</p>
                </div>
              </div>
              <div className="settings-form-grid">
                <div className="sform-group">
                  <label className="sform-label"><Key size={13} className="label-icon" />Stripe Publishable Key</label>
                  <input type="text" className="sform-input" defaultValue="pk_test_ITN7KOYilsHSCQ0UMRcgaYUB" />
                </div>
                <div className="sform-group">
                  <label className="sform-label"><Lock size={13} className="label-icon" />Stripe Secret Key <span className="req-star">*</span></label>
                  <div className="spassword-wrapper">
                    <input type={showStripeSecret ? 'text' : 'password'} className="sform-input" defaultValue="sk_test_TtQQaawhEYRwa3mU9CzttreEy" />
                    <button className="seye-btn" onClick={() => setShowStripeSecret(p => !p)}>
                      {showStripeSecret ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
                <div className="sform-group">
                  <label className="sform-label"><UserCircle size={13} className="label-icon" />PayPal Pro API Username</label>
                  <input type="text" className="sform-input" placeholder="Enter PayPal API Username" />
                </div>
                <div className="sform-group">
                  <label className="sform-label"><Lock size={13} className="label-icon" />PayPal Pro API Password</label>
                  <div className="spassword-wrapper">
                    <input type={showPaypalPass ? 'text' : 'password'} className="sform-input" placeholder="Enter PayPal API Password" />
                    <button className="seye-btn" onClick={() => setShowPaypalPass(p => !p)}>
                      {showPaypalPass ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
                <div className="sform-group sform-group--full">
                  <label className="sform-label"><Key size={13} className="label-icon" />PayPal Pro API Signature</label>
                  <input type="text" className="sform-input" placeholder="Enter PayPal API Signature" />
                </div>
              </div>
            </div>

            {/* Section 3 — Preferences */}
            <div className="settings-section-card">
              <div className="settings-section-head">
                <div className="section-icon-wrap orange"><Smartphone size={15} /></div>
                <div>
                  <h3 className="section-title">Preferences</h3>
                  <p className="section-subtitle">Interface &amp; peripheral settings</p>
                </div>
              </div>
              <div className="stoggle-row">
                <div className="stoggle-info">
                  <Smartphone size={18} className="stoggle-icon" />
                  <div>
                    <p className="stoggle-name">Touchscreen Keyboard</p>
                    <p className="stoggle-desc">Enable on-screen keyboard for touch devices</p>
                  </div>
                </div>
                <label className="stoggle-switch">
                  <input type="checkbox" />
                  <span className="stoggle-slider" />
                </label>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="settings-footer-actions">
              <button className="sbtn-cancel" onClick={toggleSettings}><X size={15} /> Cancel</button>
              <button className="sbtn-save" onClick={toggleSettings}><Save size={15} /> Save Changes</button>
            </div>

          </div>
        </div>
      ) : (
        <div className="pos-main-layout">
          <div className="pos-left-pane">
            <div className="pos-inputs-group">
              <div className="input-row">
                <input type="date" placeholder="Choose date" className="pos-input choose-date-input" />
                <input type="text" placeholder="Type reference number" className="pos-input" />
                <div className="custom-select-container">
                  <div
                    className={`custom-select-header ${isWarehouseOpen ? 'open' : ''}`}
                    onClick={() => setIsWarehouseOpen(!isWarehouseOpen)}
                  >
                    <span className={selectedWarehouse ? 'has-value' : ''}>{selectedWarehouse || 'rrrr'}</span>
                    <ChevronDown size={14} className="dropdown-icon" />
                  </div>

                  {isWarehouseOpen && (
                    <div className="custom-select-dropdown">
                      <div className="custom-select-search">
                        <input
                          type="text"
                          value={warehouseSearch}
                          onChange={(e) => setWarehouseSearch(e.target.value)}
                        />
                      </div>
                      <ul className="custom-select-list">
                        {filteredWarehouses.length > 0 ? filteredWarehouses.map(wh => (
                          <li
                            key={wh}
                            className={selectedWarehouse === wh ? 'selected' : ''}
                            onClick={() => {
                              setSelectedWarehouse(wh);
                              setIsWarehouseOpen(false);
                              setWarehouseSearch(''); // Clear search on select
                            }}
                          >
                            {wh}
                          </li>
                        )) : <li className="no-options">No options found</li>}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="input-row">
                <div className="custom-select-container">
                  <div
                    className={`custom-select-header ${isCustomerOpen ? 'open' : ''}`}
                    onClick={() => setIsCustomerOpen(!isCustomerOpen)}
                  >
                    <span className={selectedCustomer ? 'has-value' : ''}>{selectedCustomer || 'ghghgh (bhghhgj)'}</span>
                    <ChevronDown size={14} className="dropdown-icon" />
                  </div>

                  {isCustomerOpen && (
                    <div className="custom-select-dropdown">
                      <div className="custom-select-search">
                        <input
                          type="text"
                          value={customerSearch}
                          onChange={(e) => setCustomerSearch(e.target.value)}
                        />
                      </div>
                      <ul className="custom-select-list">
                        {filteredCustomers.length > 0 ? filteredCustomers.map(cust => (
                          <li
                            key={cust}
                            className={selectedCustomer === cust ? 'selected' : ''}
                            onClick={() => {
                              setSelectedCustomer(cust);
                              setIsCustomerOpen(false);
                              setCustomerSearch(''); // Clear search on select
                            }}
                          >
                            {cust}
                          </li>
                        )) : <li className="no-options">No options found</li>}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="custom-select-container">
                  <div
                    className={`custom-select-header ${isTestOpen ? 'open' : ''}`}
                    onClick={() => setIsTestOpen(!isTestOpen)}
                  >
                    <span className={selectedTest ? 'has-value' : ''}>{selectedTest || 'test (1234575575)'}</span>
                    <ChevronDown size={14} className="dropdown-icon" />
                  </div>

                  {isTestOpen && (
                    <div className="custom-select-dropdown">
                      <div className="custom-select-search">
                        <input
                          type="text"
                          value={testSearch}
                          onChange={(e) => setTestSearch(e.target.value)}
                        />
                      </div>
                      <ul className="custom-select-list">
                        {filteredTests.length > 0 ? filteredTests.map(test => (
                          <li
                            key={test}
                            className={selectedTest === test ? 'selected' : ''}
                            onClick={() => {
                              setSelectedTest(test);
                              setIsTestOpen(false);
                              setTestSearch(''); // Clear search on select
                            }}
                          >
                            {test}
                          </li>
                        )) : <li className="no-options">No options found</li>}
                      </ul>
                    </div>
                  )}
                </div>
                <button
                  className="add-customer-btn"
                  onClick={() => setIsAddCustomerModalOpen(true)}
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="pos-search-product">
                <div className="search-input-wrapper">
                  <Search size={18} className="search-icon" />
                  <input type="text" placeholder="Scan/Search product by name/code" />
                </div>
              </div>
            </div>

            <div className="pos-cart-table-container">
              <table className="pos-cart-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Batch No</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>SubTotal</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Empty state for now */}
                  <tr className="cart-item-row">
                    <td
                      className="cart-item-name"
                      onClick={() => {
                        setSelectedProductForEdit({ name: 'Umbrella', code: '4321', price: '5236.00' });
                        setIsProductEditOpen(true);
                      }}
                      style={{ color: '#4f46e5', fontWeight: '600', cursor: 'pointer' }}
                    >
                      umbrella<br /><span style={{ fontSize: '0.75rem', color: '#64748b' }}>4321</span><br /><span style={{ fontSize: '0.75rem', color: '#64748b' }}>In Stock: 0</span>
                    </td>
                    <td><div style={{ width: '40px', height: '24px', background: '#e2e8f0', borderRadius: '4px' }}></div></td>
                    <td>5236.00</td>
                    <td>
                      <div className="cart-qty-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: 'none', background: '#e0e7ff', color: '#4f46e5' }}>-</button>
                        <span>7</span>
                        <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: 'none', background: '#e0e7ff', color: '#4f46e5' }}>+</button>
                      </div>
                    </td>
                    <td>36652.00 <X size={16} color="#ef4444" style={{ cursor: 'pointer', float: 'right', background: '#fee2e2', borderRadius: '4px', padding: '2px' }} /></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pos-summary-section">
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="label">Items</span>
                  <span className="value">0</span>
                </div>
                <div className="summary-item">
                  <span className="label">Total</span>
                  <span className="value">0.00</span>
                </div>
                <div className="summary-item">
                  <span className="label">Discount <Edit2 size={12} className="edit-icon" onClick={() => setIsOrderDiscountOpen(true)} /></span>
                  <span className="value">0.00</span>
                </div>
                <div className="summary-item">
                  <span className="label">Coupon <Edit2 size={12} className="edit-icon" onClick={() => setIsCouponOpen(true)} /></span>
                  <span className="value">0.00</span>
                </div>
                <div className="summary-item">
                  <span className="label">Tax <Edit2 size={12} className="edit-icon" onClick={() => setIsOrderTaxOpen(true)} /></span>
                  <span className="value">0.00</span>
                </div>
                <div className="summary-item">
                  <span className="label">Shipping <Edit2 size={12} className="edit-icon" onClick={() => setIsShippingOpen(true)} /></span>
                  <span className="value">0.00</span>
                </div>
              </div>
              <div className="grand-total-banner">
                <span>Grand Total</span>
                <span>$0.00</span>
              </div>
            </div>

            {/* BOTTOM ACTION BUTTONS */}
            <div className="pos-action-buttons">
              <button
                className="pos-action-btn bg-blue"
                onClick={() => setIsCardModalOpen(true)}
              >
                <CreditCard size={16} /> Card
              </button>
              <button
                className="pos-action-btn bg-teal"
                onClick={() => setIsCashModalOpen(true)}
              >
                <Banknote size={16} /> Cash
              </button>
              <button
                className="pos-action-btn bg-dark-blue"
                onClick={() => setIsPaypalModalOpen(true)}
              >
                <CreditCard size={16} /> PayPal
              </button>
              <button
                className="pos-action-btn bg-orange"
                onClick={() => {
                  setChequeModalMethod('draft');
                  setIsChequeModalOpen(true);
                }}
              >
                <Edit3 size={16} /> Draft
              </button>
              <button
                className="pos-action-btn bg-pink"
                onClick={() => {
                  setChequeModalMethod('cheque');
                  setIsChequeModalOpen(true);
                }}
              >
                <FileSignature size={16} /> Cheque
              </button>
              <button
                className="pos-action-btn bg-purple"
                onClick={() => setIsGiftCardModalOpen(true)}
              >
                <Gift size={16} /> Gift Card
              </button>
              <button className="pos-action-btn bg-magenta"><Landmark size={16} /> Deposit</button>
              <button className="pos-action-btn bg-teal-dark"><Star size={16} /> Points</button>
              <button className="pos-action-btn bg-red"><XCircle size={16} /> Cancel</button>
              <button
                className="pos-action-btn bg-yellow"
                onClick={() => setIsRecentTransactionOpen(true)}
              >
                <Clock size={16} /> Recent Transaction
              </button>
            </div>
          </div>

          {/* RIGHT PANE - Product Catalog */}
          <div className="pos-right-pane">
            <div className="pos-catalog-header">
              <div className="pos-catalog-filters">
                <button
                  className="filter-pill active purple"
                  onClick={() => setIsCategorySelectorOpen(true)}
                >
                  All Categories
                </button>
                <button
                  className="filter-pill teal"
                  onClick={() => setIsBrandSelectorOpen(true)}
                >
                  Brands
                </button>
                <button
                  className="filter-pill red"
                  onClick={() => setIsFeaturedOpen(true)}
                >
                  Featured
                </button>
              </div>
            </div>

            <div className="pos-product-grid">
              {/* Sample Product 1 */}
              <div
                className="pos-product-card"
                onClick={() => {
                  setSelectedProductForEdit({ name: 'Umbrella', code: 'P-4321', price: '25.00' });
                  setIsProductEditOpen(true);
                }}
              >
                <div className="product-image-container">
                  <div className="product-placeholder-bg">
                    <ShoppingBasket size={32} strokeWidth={1} />
                  </div>
                  <div className="product-badge">Top</div>
                </div>
                <div className="product-info">
                  <div className="product-meta">
                    <span className="product-name">Umbrella</span>
                    <span className="product-price">$25.00</span>
                  </div>
                  <span className="product-code">P-4321</span>
                </div>
              </div>

              {/* Sample Product 2 */}
              <div
                className="pos-product-card"
                onClick={() => {
                  setSelectedProductForEdit({ name: 'Leather Bag', code: 'P-8821', price: '89.99' });
                  setIsProductEditOpen(true);
                }}
              >
                <div className="product-image-container">
                  <div className="product-placeholder-bg">
                    <ShoppingBag size={32} strokeWidth={1} />
                  </div>
                </div>
                <div className="product-info">
                  <div className="product-meta">
                    <span className="product-name">Leather Bag</span>
                    <span className="product-price">$89.99</span>
                  </div>
                  <span className="product-code">P-8821</span>
                </div>
              </div>

              {/* Sample Product 3 */}
              <div
                className="pos-product-card"
                onClick={() => {
                  setSelectedProductForEdit({ name: 'Gift Box', code: 'P-1290', price: '12.50' });
                  setIsProductEditOpen(true);
                }}
              >
                <div className="product-image-container">
                  <div className="product-placeholder-bg">
                    <Package size={32} strokeWidth={1} />
                  </div>
                  <div className="product-badge" style={{ background: '#ef4444' }}>New</div>
                </div>
                <div className="product-info">
                  <div className="product-meta">
                    <span className="product-name">Gift Box</span>
                    <span className="product-price">$12.50</span>
                  </div>
                  <span className="product-code">P-1290</span>
                </div>
              </div>

              {/* Sample Product 4 */}
              <div
                className="pos-product-card"
                onClick={() => {
                  setSelectedProductForEdit({ name: 'Smart Watch', code: 'P-7723', price: '199.00' });
                  setIsProductEditOpen(true);
                }}
              >
                <div className="product-image-container">
                  <div className="product-placeholder-bg">
                    <Star size={32} strokeWidth={1} />
                  </div>
                </div>
                <div className="product-info">
                  <div className="product-meta">
                    <span className="product-name">Smart Watch</span>
                    <span className="product-price">$199.00</span>
                  </div>
                  <span className="product-code">P-7723</span>
                </div>
              </div>

              {/* Sample Product 5 */}
              <div
                className="pos-product-card"
                onClick={() => {
                  setSelectedProductForEdit({ name: 'Premium Coffee', code: 'P-9901', price: '45.00' });
                  setIsProductEditOpen(true);
                }}
              >
                <div className="product-image-container">
                  <div className="product-placeholder-bg">
                    <Gift size={32} strokeWidth={1} />
                  </div>
                </div>
                <div className="product-info">
                  <div className="product-meta">
                    <span className="product-name">Premium Coffee</span>
                    <span className="product-price">$45.00</span>
                  </div>
                  <span className="product-code">P-9901</span>
                </div>
              </div>

              {/* Sample Product 6 */}
              <div
                className="pos-product-card"
                onClick={() => {
                  setSelectedProductForEdit({ name: 'Gift Card', code: 'P-5521', price: '50.00' });
                  setIsProductEditOpen(true);
                }}
              >
                <div className="product-image-container">
                  <div className="product-placeholder-bg">
                    <CreditCard size={32} strokeWidth={1} />
                  </div>
                  <div className="product-badge" style={{ background: '#10b981' }}>Hot</div>
                </div>
                <div className="product-info">
                  <div className="product-meta">
                    <span className="product-name">Gift Card</span>
                    <span className="product-price">$50.00</span>
                  </div>
                  <span className="product-code">P-5521</span>
                </div>
              </div>
            </div>

            <div className="pos-pagination">
              <button className="page-btn-small disabled">&lt;</button>
              <button className="page-btn-small active">1</button>
              <button className="page-btn-small">&gt;</button>
            </div>
          </div>
          {/* ADD CUSTOMER MODAL */}
          {isAddCustomerModalOpen && (
            <div className="pos-modal-overlay">
              <div className="pos-modal-content customer-modal scale-in">
                <div className="pos-modal-header">
                  <h3>Add Customer</h3>
                  <button className="close-modal-btn" onClick={() => setIsAddCustomerModalOpen(false)}>
                    <XCircle size={20} />
                  </button>
                </div>

                <div className="pos-modal-body">
                  <p className="form-info">The field labels marked with * are required input fields.</p>

                  <div className="modal-form">
                    <div className="form-group">
                      <label>Customer Group *</label>
                      <div className="styled-select-wrapper">
                        <select><option>Test</option></select>
                        <ChevronDown size={16} className="select-arrow" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Name *</label>
                      <input type="text" placeholder="Enter Full Name" />
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" placeholder="example@example.com" />
                    </div>

                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input type="tel" placeholder="Enter Phone Number" />
                    </div>

                    <div className="form-group">
                      <label>Address *</label>
                      <input type="text" placeholder="House/Street/Area" />
                    </div>

                    <div className="form-group">
                      <label>City *</label>
                      <input type="text" placeholder="Enter City Name" />
                    </div>

                    <div className="form-actions">
                      <button className="btn-submit" onClick={() => setIsAddCustomerModalOpen(false)}>
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CASH REGISTER DETAILS MODAL — MOVED OUTSIDE FOR TOP LAYERING */}
      {isRegisterModalOpen && (
        <div className="pos-modern-modal-overlay fade-in">
          <div className="pos-modern-modal-container scale-in">
            <div className="pos-modern-modal-head">
              <div className="modal-title-wrap">
                <ShoppingBag size={22} className="modal-title-icon" />
                <div>
                  <h3 className="modal-title-text">Cash Register Details</h3>
                  <p className="modal-title-sub">Review transactions &amp; payments summary</p>
                </div>
              </div>
              <button className="modal-x-btn" onClick={() => setIsRegisterModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="pos-modern-modal-body">
              <div className="modal-info-alert">
                <p>Current register status and payment breakdowns.</p>
              </div>

              <div className="register-details-grid">
                <div className="reg-detail-item">
                  <span className="reg-label">Cash in Hand:</span>
                  <span className="reg-value">$ 1.00</span>
                </div>
                <div className="reg-detail-item highlight-row">
                  <span className="reg-label">Total Sale Amount:</span>
                  <span className="reg-value">$ 5,663.00</span>
                </div>
                <div className="reg-detail-item">
                  <span className="reg-label">Total Payment:</span>
                  <span className="reg-value">$ 1,881.20</span>
                </div>
                <div className="reg-detail-item">
                  <span className="reg-label">Cash Payment:</span>
                  <span className="reg-value">$ 1,881.20</span>
                </div>
                <div className="reg-detail-item">
                  <span className="reg-label">Credit Card Payment:</span>
                  <span className="reg-value">$ 0.00</span>
                </div>
                <div className="reg-detail-item">
                  <span className="reg-label">Cheque Payment:</span>
                  <span className="reg-value">$ 0.00</span>
                </div>
                <div className="reg-detail-item">
                  <span className="reg-label">Gift Card Payment:</span>
                  <span className="reg-value">$ 0.00</span>
                </div>
                <div className="reg-detail-item">
                  <span className="reg-label">Deposit Payment:</span>
                  <span className="reg-value">$ 0.00</span>
                </div>
                <div className="reg-detail-item">
                  <span className="reg-label">Paypal Payment:</span>
                  <span className="reg-value">$ 0.00</span>
                </div>
                <div className="reg-detail-item">
                  <span className="reg-label">Total Sale Return:</span>
                  <span className="reg-value">$ 0.00</span>
                </div>
                <div className="reg-detail-item">
                  <span className="reg-label">Total Expense:</span>
                  <span className="reg-value">$ 0.00</span>
                </div>

                <div className="reg-total-summary">
                  <span className="reg-total-label">Total Cash in Register:</span>
                  <span className="reg-total-value">$ 1,882.20</span>
                </div>
              </div>
            </div>

            <div className="pos-modern-modal-foot">
              <button className="btn-modern-close" onClick={() => setIsRegisterModalOpen(false)}>
                Close Register
              </button>
            </div>
          </div>
        </div>
      )}
      {/* TODAY'S SALE MODAL */}
      {isTodaySaleOpen && (
        <TodaySaleModal onClose={() => setIsTodaySaleOpen(false)} />
      )}

      {/* SALES REPORT / TODAY'S PROFIT MODAL */}
      {isSaleReportOpen && (
        <TodaysProfitModal onClose={() => setIsSaleReportOpen(false)} />
      )}
      {/* CATEGORY SELECTOR MODAL */}
      {isCategorySelectorOpen && (
        <CategorySelector
          onClose={() => setIsCategorySelectorOpen(false)}
          onSelect={(category) => {
            console.log('Selected Category:', category);
          }}
        />
      )}
      {/* BRAND SELECTOR MODAL */}
      {isBrandSelectorOpen && (
        <BrandSelector
          onClose={() => setIsBrandSelectorOpen(false)}
          onSelect={(brand) => {
            console.log('Selected Brand:', brand);
          }}
        />
      )}
      {/* FEATURED PRODUCTS MODAL */}
      {isFeaturedOpen && (
        <FeaturedProducts
          onClose={() => setIsFeaturedOpen(false)}
          onAddToCart={(item) => {
            console.log('Added Featured Product:', item);
          }}
        />
      )}
      {/* COUPON MODAL */}
      {isCouponOpen && (
        <CouponModal
          onClose={() => setIsCouponOpen(false)}
          onApply={(code) => {
            console.log('Applied Coupon:', code);
          }}
        />
      )}
      {/* ORDER TAX MODAL */}
      {isOrderTaxOpen && (
        <OrderTaxModal
          onClose={() => setIsOrderTaxOpen(false)}
          onApply={(tax) => {
            console.log('Applied Tax:', tax);
          }}
        />
      )}
      {/* ORDER DISCOUNT MODAL */}
      {isOrderDiscountOpen && (
        <OrderDiscountModal
          onClose={() => setIsOrderDiscountOpen(false)}
          onApply={(discount) => {
            console.log('Applied Discount:', discount);
          }}
        />
      )}
      {/* SHIPPING MODAL */}
      {isShippingOpen && (
        <ShippingModal
          onClose={() => setIsShippingOpen(false)}
          onApply={(cost) => {
            console.log('Applied Shipping Cost:', cost);
          }}
        />
      )}
      {/* PRODUCT EDIT MODAL */}
      {isProductEditOpen && selectedProductForEdit && (
        <ProductEditModal
          product={selectedProductForEdit}
          onClose={() => setIsProductEditOpen(false)}
          onUpdate={(product) => {
            console.log('Updated Product:', product);
          }}
        />
      )}

      {/* FINALIZE SALE CHEQUE/DRAFT MODAL */}
      {isChequeModalOpen && (
        <FinalizeSaleChequeModal
          defaultMethod={chequeModalMethod}
          onClose={() => setIsChequeModalOpen(false)}
          onApply={(data) => {
            console.log(`Finalized Sale (${chequeModalMethod}):`, data);
          }}
        />
      )}

      {/* FINALIZE SALE GIFT CARD MODAL */}
      {isGiftCardModalOpen && (
        <FinalizeSaleGiftCardModal
          onClose={() => setIsGiftCardModalOpen(false)}
          onApply={(data) => {
            console.log('Finalized Sale (Gift Card):', data);
          }}
        />
      )}

      {/* FINALIZE SALE PAYPAL MODAL */}
      {isPaypalModalOpen && (
        <FinalizeSalePaypalModal
          onClose={() => setIsPaypalModalOpen(false)}
          onApply={(data) => {
            console.log('Finalized Sale (PayPal):', data);
          }}
        />
      )}

      {/* FINALIZE SALE CASH MODAL */}
      {isCashModalOpen && (
        <FinalizeSaleCashModal
          onClose={() => setIsCashModalOpen(false)}
          onApply={(data) => {
            console.log('Finalized Sale (Cash):', data);
          }}
        />
      )}

      {/* FINALIZE SALE CARD MODAL */}
      {isCardModalOpen && (
        <FinalizeSaleCardModal
          onClose={() => setIsCardModalOpen(false)}
          onApply={(data) => {
            console.log('Finalized Sale (Card):', data);
          }}
        />
      )}

      {/* RECENT TRANSACTION MODAL */}
      {isRecentTransactionOpen && (
        <RecentTransactionModal
          onClose={() => setIsRecentTransactionOpen(false)}
        />
      )}
    </div>
  );
}

export default POS;
