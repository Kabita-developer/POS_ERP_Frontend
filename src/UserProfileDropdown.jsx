import React from 'react';
import {
    User,
    Settings,
    ArrowLeftRight,
    Waves,
    LogOut,
    ChevronRight,
    ShieldCheck,
    CreditCard
} from 'lucide-react';
import './UserProfileDropdown.css';

function UserProfileDropdown({ onClose, onLogout }) {
    return (
        <div className="upd-dropdown-container fade-in">
            {/* ─── Profile Header ─── */}
            <div className="upd-header">
                <div className="upd-avatar-wrap">
                    <div className="upd-avatar">
                        <User size={24} />
                    </div>
                    <div className="upd-status-dot"></div>
                </div>
                <div className="upd-user-info">
                    <h4 className="upd-name">Admin User</h4>
                    <p className="upd-role">System Administrator</p>
                </div>
            </div>

            <div className="upd-divider" />

            {/* ─── Menu Options ─── */}
            <div className="upd-menu-list">
                <button className="upd-menu-item">
                    <div className="upd-item-left">
                        <div className="upd-icon-box accent-purple">
                            <User size={16} />
                        </div>
                        <span>Profile</span>
                    </div>
                    <ChevronRight size={14} className="upd-chevron" />
                </button>

                <button className="upd-menu-item">
                    <div className="upd-item-left">
                        <div className="upd-icon-box accent-blue">
                            <Settings size={16} />
                        </div>
                        <span>Settings</span>
                    </div>
                    <ChevronRight size={14} className="upd-chevron" />
                </button>

                <button className="upd-menu-item">
                    <div className="upd-item-left">
                        <div className="upd-icon-box accent-green">
                            <ArrowLeftRight size={16} />
                        </div>
                        <span>My Transactions</span>
                    </div>
                    <ChevronRight size={14} className="upd-chevron" />
                </button>

                <button className="upd-menu-item">
                    <div className="upd-item-left">
                        <div className="upd-icon-box accent-orange">
                            <Waves size={16} />
                        </div>
                        <span>My Holiday</span>
                    </div>
                    <ChevronRight size={14} className="upd-chevron" />
                </button>
            </div>

            <div className="upd-divider" />

            {/* ─── Footer Action ─── */}
            <div className="upd-footer">
                <button className="upd-logout-btn" onClick={onLogout}>
                    <div className="upd-logout-icon">
                        <LogOut size={16} />
                    </div>
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
}

export default UserProfileDropdown;
