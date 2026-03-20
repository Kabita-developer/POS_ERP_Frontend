import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css';
import {
    Search, LayoutDashboard, Package, ShoppingCart, CreditCard, FileText,
    ArrowLeftRight, RotateCcw, Calculator, Users, User, Menu, ShoppingBag,
    Sun, Moon, Maximize, Minimize, Printer, Globe, UserCircle, ChevronDown, BarChart3,
    ArrowRightLeft, ArrowUpRight, Trophy, LogOut, Tag, List, PlusCircle,
    ClipboardList, SlidersHorizontal, BarChart2, TrendingUp, RefreshCcw,
    Wallet, BookOpen, UserCheck, UserPlus, Building2, Phone, Truck, DollarSign,
    ArrowUpCircle
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import PrintReport from './PrintReport';
import POS from './POS';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import AdjustmentList from './AdjustmentList';
import AddAdjustment from './AddAdjustment';
import StockCount from './StockCount';
import PurchaseList from './PurchaseList';
import AddPurchase from './AddPurchase';
import ImportPurchase from './ImportPurchase';
import ExpenseCategory from './ExpenseCategory';
import ExpenseList from './ExpenseList';
import AddExpense from './AddExpense';
import QuotationList from './QuotationList';




const navConfig = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        children: []
    },
    {
        id: 'product',
        label: 'Product',
        icon: Package,
        children: [
            { id: 'product-category', label: 'Category', icon: Tag },
            { id: 'product-list', label: 'Product List', icon: List },
            { id: 'product-add', label: 'Add Product', icon: PlusCircle },
            { id: 'product-adjustment-list', label: 'Adjustment List', icon: ClipboardList },
            { id: 'product-adjustment-add', label: 'Add Adjustment', icon: SlidersHorizontal },
            { id: 'product-stock-count', label: 'Stock Count', icon: BarChart2 },
        ]
    },
    {
        id: 'purchase',
        label: 'Purchase',
        icon: CreditCard,
        children: [
            { id: 'purchase-list', label: 'Purchase List', icon: List },
            { id: 'purchase-add', label: 'Add Purchase', icon: PlusCircle },
            { id: 'purchase-import', label: 'Import Purchase by CSV', icon: ArrowUpCircle },
        ]
    },
    {
        id: 'sale',
        label: 'Sale',
        icon: ShoppingCart,
        children: [
            { label: 'Sale List', icon: List },
            { label: 'Add Sale', icon: PlusCircle },
            { label: 'Sale Return', icon: RefreshCcw },
        ]
    },
    {
        id: 'expense',
        label: 'Expense',
        icon: Wallet,
        children: [
            { id: 'expense-category', label: 'Expense category', icon: Tag },
            { id: 'expense-list', label: 'Expense List', icon: List },
            { id: 'expense-add', label: 'Add Expense', icon: PlusCircle },
        ]
    },
    {
        id: 'quotation',
        label: 'Quotation',
        icon: FileText,
        children: [
            { id: 'quotation-list', label: 'Quotation List', icon: List },
            { id: 'quotation-add', label: 'Add Quotation', icon: PlusCircle },
        ]
    },
    {
        id: 'transfer',
        label: 'Transfer',
        icon: ArrowLeftRight,
        children: [
            { label: 'Transfer List', icon: List },
            { label: 'Add Transfer', icon: PlusCircle },
        ]
    },
    {
        id: 'return',
        label: 'Return',
        icon: RotateCcw,
        children: [
            { label: 'Sale Return', icon: RefreshCcw },
            { label: 'Purchase Return', icon: RefreshCcw },
        ]
    },
    {
        id: 'accounting',
        label: 'Accounting',
        icon: Calculator,
        children: [
            { label: 'Accounts', icon: BookOpen },
            { label: 'Transactions', icon: ArrowRightLeft },
            { label: 'Balance Sheet', icon: TrendingUp },
        ]
    },
    {
        id: 'hrm',
        label: 'HRM',
        icon: Users,
        children: [
            { label: 'Employee List', icon: UserCheck },
            { label: 'Add Employee', icon: UserPlus },
            { label: 'Departments', icon: Building2 },
        ]
    },
    {
        id: 'people',
        label: 'People',
        icon: User,
        children: [
            { label: 'Customers', icon: Users },
            { label: 'Suppliers', icon: Truck },
            { label: 'Billers', icon: DollarSign },
            { label: 'Contact', icon: Phone },
        ]
    },
];

const cashFlowData = [
    { month: 'September', received: 0, sent: 0 },
    { month: 'October', received: 0, sent: 0 },
    { month: 'November', received: 0, sent: 0 },
    { month: 'December', received: 0, sent: 0 },
    { month: 'January', received: 0, sent: 0 },
    { month: 'February', received: 0, sent: 0 },
    { month: 'March', received: 0, sent: 0 },
];

const yearlyReportData = [
    { month: 'January', purchased: 0, sold: 0 },
    { month: 'February', purchased: 0, sold: 0 },
    { month: 'March', purchased: 0, sold: 0 },
    { month: 'April', purchased: 0, sold: 0 },
    { month: 'May', purchased: 0, sold: 0 },
    { month: 'June', purchased: 0, sold: 0 },
    { month: 'July', purchased: 0, sold: 0 },
    { month: 'August', purchased: 0, sold: 0 },
    { month: 'September', purchased: 0, sold: 0 },
    { month: 'October', purchased: 0, sold: 0 },
    { month: 'November', purchased: 0, sold: 0 },
    { month: 'December', purchased: 0, sold: 0 },
];

const recentTransactions = [
    { date: '30-06-2025', ref: 'posr-20250630-072148', customer: 'test', status: 'Completed', total: 492.8 },
    { date: '30-06-2025', ref: 'posr-20250630-071554', customer: 'test', status: 'Completed', total: 56.6 },
    { date: '30-06-2025', ref: 'posr-20250630-071543', customer: 'test', status: 'Completed', total: 56.6 },
    { date: '30-06-2025', ref: 'posr-20250630-071542', customer: 'test', status: 'Completed', total: 56.6 },
    { date: '22-04-2025', ref: 'posr-20250422-011157', customer: 'test', status: 'Completed', total: 369.6 },
];

/* ── Smooth Accordion Nav Item ── */
function NavItem({ item, isOpen, onToggle, onChildClick, activeView }) {
    const innerRef = useRef(null);
    const [height, setHeight] = useState(0);
    const IconComp = item.icon;
    const hasChildren = item.children.length > 0;

    // Measure exact height whenever isOpen changes
    useEffect(() => {
        if (innerRef.current) {
            setHeight(innerRef.current.scrollHeight);
        }
    }, [isOpen]);

    const panelStyle = {
        height: isOpen ? height + 'px' : '0px',
        opacity: isOpen ? 1 : 0,
        overflow: 'hidden',
        transition: 'height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.28s ease',
        willChange: 'height, opacity',
    };

    return (
        <div className="nav-group">
            <div
                className={`nav-item ${item.active ? 'active' : ''} ${isOpen ? 'nav-item-open' : ''}`}
                onClick={onToggle}
            >
                <IconComp size={18} />
                <span>{item.label}</span>
                {hasChildren && (
                    <ChevronDown
                        size={14}
                        className={`chevron ${isOpen ? 'chevron-rotated' : ''}`}
                    />
                )}
            </div>

            {hasChildren && (
                <div style={panelStyle}>
                    <div className="nav-submenu-inner" ref={innerRef}>
                        {item.children.map((child) => {
                            const ChildIcon = child.icon;
                            return (
                                <div
                                    key={child.label}
                                    className={`nav-subitem ${activeView === child.id ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onChildClick(child.id);
                                    }}
                                >
                                    <ChildIcon size={14} className="subitem-icon" />
                                    <span>{child.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

function Dashboard({ onLogout }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState('Sale');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [activeView, setActiveView] = useState('dashboard');
    const [openNavItem, setOpenNavItem] = useState(null);

    const toggleNavItem = (id) => {
        if (id === 'dashboard') {
            setActiveView('dashboard');
            setOpenNavItem(null);
            return;
        }
        setOpenNavItem(prev => prev === id ? null : id);
    };

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

    // Optional: Apply a data-theme to body if you want app-wide styling
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }, [isDarkMode]);

    if (activeView === 'pos') {
        return <POS onBackToDashboard={() => setActiveView('dashboard')} />;
    }

    return (
        <div className={`dashboard-layout ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <div className="logo-container">
                        <span className="logo-text">POS ERP</span>
                        <div className="panda-icon">🐼</div>
                    </div>
                </div>

                <div className="sidebar-search">
                    <Search size={16} className="search-icon" />
                    <input type="text" placeholder="Search menu..." />
                </div>

                <nav className="sidebar-nav">
                    {navConfig.map((item) => (
                        <NavItem
                            key={item.id}
                            item={{
                                ...item,
                                active: (item.id === 'dashboard' && activeView === 'dashboard') || 
                                        (item.children && item.children.some(child => child.id === activeView)),
                            }}
                            isOpen={openNavItem === item.id}
                            onToggle={() => toggleNavItem(item.id)}
                            onChildClick={(childId) => setActiveView(childId)}
                            activeView={activeView}
                        />
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                {/* Top Header */}
                <header className="top-header">
                    <div className="header-left">
                        <button className="icon-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <Menu size={20} />
                        </button>
                    </div>
                    <div className="header-right">
                        <button className="pos-btn" onClick={() => setActiveView('pos')}>
                            <ShoppingBag size={16} /> POS
                        </button>
                        <button className="icon-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button className="icon-btn" onClick={toggleFullScreen} title="Toggle Fullscreen">
                            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                        </button>
                        <button
                            className={`icon-btn ${activeView === 'printReport' ? 'text-primary' : ''}`}
                            onClick={() => setActiveView('printReport')}
                            title="Print Report"
                        >
                            <Printer size={18} />
                        </button>
                        <button className="icon-btn"><Globe size={18} /></button>

                        <div className="user-profile">
                            <UserCircle size={20} />
                            <span>Admin</span>
                            <ChevronDown size={14} />
                        </div>

                        <button className="icon-btn text-error" onClick={onLogout} title="Logout">
                            <LogOut size={18} />
                        </button>
                    </div>
                </header>

                {/* Conditional Content */}
                {activeView === 'dashboard' ? (
                    <div className="dashboard-content">
                        <div className="welcome-banner">
                            <div>
                                <h2 className="welcome-text">WELCOME <span className="text-primary">ADMIN</span></h2>
                            </div>
                            <div className="time-filters">
                                <button className="filter-btn active">Today</button>
                                <button className="filter-btn">Last 7 Days</button>
                                <button className="filter-btn">This Month</button>
                                <button className="filter-btn">This Year</button>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon-container" style={{ color: '#8b5cf6' }}>
                                    <BarChart3 size={32} />
                                </div>
                                <div className="stat-info">
                                    <h3>0.00</h3>
                                    <p>Revenue</p>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon-container" style={{ color: '#f97316' }}>
                                    <ArrowRightLeft size={32} />
                                </div>
                                <div className="stat-info">
                                    <h3>0.00</h3>
                                    <p>Sale Return</p>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon-container" style={{ color: '#10b981' }}>
                                    <ArrowUpRight size={32} />
                                </div>
                                <div className="stat-info">
                                    <h3>0.00</h3>
                                    <p>Purchase Return</p>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon-container" style={{ color: '#3b82f6' }}>
                                    <Trophy size={32} />
                                </div>
                                <div className="stat-info">
                                    <h3>0.00</h3>
                                    <p>Profit</p>
                                </div>
                            </div>
                        </div>

                        {/* Charts Row */}
                        <div className="charts-grid">
                            {/* Cash Flow Chart */}
                            <div className="chart-card large">
                                <h3 className="chart-title">Cash Flow</h3>
                                <div className="chart-container">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={cashFlowData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} domain={[-1, 1]} ticks={[-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1.0]} />
                                            <RechartsTooltip />
                                            <Legend iconType="rect" align="center" verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
                                            <Line type="monotone" dataKey="received" name="Payment Received" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                            <Line type="monotone" dataKey="sent" name="Payment Sent" stroke="#f97316" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Monthly Summary */}
                            <div className="chart-card">
                                <h3 className="chart-title">March 2026</h3>
                                <div className="monthly-summary-legend">
                                    <div className="legend-item"><span className="dot" style={{ background: '#8b5cf6' }}></span> Purchase</div>
                                    <div className="legend-item"><span className="dot" style={{ background: '#f97316' }}></span> Revenue</div>
                                    <div className="legend-item"><span className="dot" style={{ background: '#9ca3af' }}></span> Expense</div>
                                </div>
                                <div className="empty-chart-placeholder">
                                    <div className="pie-placeholder"></div>
                                </div>
                            </div>
                        </div>

                        {/* Yearly Report Row */}
                        <div className="chart-card mt-6">
                            <h3 className="chart-title">Yearly Report</h3>
                            <div className="chart-container">
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={yearlyReportData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} domain={[-1, 1]} ticks={[-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1.0]} />
                                        <RechartsTooltip cursor={{ fill: 'var(--hover-bg)' }} contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
                                        <Legend iconType="rect" align="center" verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
                                        <Bar dataKey="purchased" name="Purchased Amount" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                        <Bar dataKey="sold" name="Sold Amount" fill="#f97316" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Bottom Widgets Row 1 */}
                        <div className="widgets-grid mt-6">
                            <div className="chart-card table-card large">
                                <div className="card-header-flex">
                                    <h3 className="chart-title mb-0">Recent Transaction</h3>
                                    <span className="badge-purple">Latest 5</span>
                                </div>
                                <div className="tabs-container">
                                    {['Sale', 'Purchase', 'Quotation', 'Payment'].map(tab => (
                                        <button
                                            key={tab}
                                            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                                            onClick={() => setActiveTab(tab)}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                                <div className="table-wrapper">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Reference</th>
                                                <th>Customer</th>
                                                <th>Status</th>
                                                <th>Grand Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentTransactions.map((trx, idx) => (
                                                <tr key={idx}>
                                                    <td>{trx.date}</td>
                                                    <td>{trx.ref}</td>
                                                    <td>{trx.customer}</td>
                                                    <td><span className="status-badge completed">{trx.status}</span></td>
                                                    <td>{trx.total}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="chart-card table-card">
                                <div className="card-header-flex">
                                    <h3 className="chart-title mb-0">Best Seller March</h3>
                                    <span className="badge-purple">Top 5</span>
                                </div>
                                <div className="table-wrapper mt-4">
                                    <table className="data-table simple">
                                        <thead>
                                            <tr>
                                                <th>Product Details</th>
                                                <th className="text-right">Qty</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td colSpan="2" className="text-center empty-state">No Data Found</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Widgets Row 2 */}
                        <div className="widgets-grid mt-6">
                            <div className="chart-card table-card">
                                <div className="card-header-flex">
                                    <h3 className="chart-title mb-0">Best Seller 2026(Qty)</h3>
                                    <span className="badge-purple">Top 5</span>
                                </div>
                                <div className="table-wrapper mt-4">
                                    <table className="data-table simple">
                                        <thead>
                                            <tr>
                                                <th>Product Details</th>
                                                <th className="text-right">Qty</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td colSpan="2" className="text-center empty-state">No Data Found</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="chart-card table-card">
                                <div className="card-header-flex">
                                    <h3 className="chart-title mb-0">Best Seller 2026(Price)</h3>
                                    <span className="badge-purple">Top 5</span>
                                </div>
                                <div className="table-wrapper mt-4">
                                    <table className="data-table simple">
                                        <thead>
                                            <tr>
                                                <th>Product Details</th>
                                                <th className="text-right">Grand Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td colSpan="2" className="text-center empty-state">No Data Found</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : activeView === 'product-category' ? (
                    <CategoryList />
                ) : activeView === 'product-list' ? (
                    <ProductList />
                ) : activeView === 'product-add' ? (
                    <AddProduct />
                ) : activeView === 'product-adjustment-list' ? (
                    <AdjustmentList />
                ) : activeView === 'product-adjustment-add' ? (
                    <AddAdjustment />
                ) : activeView === 'product-stock-count' ? (
                    <StockCount />
                ) : activeView === 'purchase-list' ? (
                    <PurchaseList 
                        onAddPurchase={() => setActiveView('purchase-add')} 
                        onImportPurchase={() => setActiveView('purchase-import')}
                    />
                ) : activeView === 'purchase-add' ? (
                    <AddPurchase />
                ) : activeView === 'purchase-import' ? (
                    <ImportPurchase />
                ) : activeView === 'expense-category' ? (
                    <ExpenseCategory />
                ) : activeView === 'expense-list' ? (
                    <ExpenseList />
                ) : activeView === 'expense-add' ? (
                    <AddExpense onClose={() => setActiveView('expense-list')} />
                ) : activeView === 'quotation-list' ? (
                    <QuotationList />
                ) : (
                    <PrintReport />
                )}




            </main>
        </div>
    );
}

export default Dashboard;
