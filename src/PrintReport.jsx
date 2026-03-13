import React, { useState } from 'react';
import './PrintReport.css';
import {
    FileText, FileDown, Printer, FileSpreadsheet, Columns,
    Search, Eye, ChevronLeft, ChevronRight, CheckSquare, Square
} from 'lucide-react';
import CashRegisterDetailsModal from './CashRegisterDetailsModal';

const mockData = [
    {
        id: 1,
        user: 'admin',
        warehouse: 'w1',
        cashInHand: '0',
        openedAt: '29-10-2024 01:21:42',
        closedAt: 'N/A',
        status: 'Active'
    },
    {
        id: 2,
        user: 'admin',
        warehouse: 'w2',
        cashInHand: '1000',
        openedAt: '30-10-2024 10:41:43',
        closedAt: 'N/A',
        status: 'Active'
    }
];

function PrintReport() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleRow = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const toggleAll = () => {
        if (selectedRows.length === mockData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(mockData.map(d => d.id));
        }
    };

    return (
        <div className="print-report-container fade-in">
            <div className="report-header">
                <h2 className="report-title">Cash Register Report</h2>
                <p className="report-subtitle">Manage and print your active register sessions.</p>
            </div>

            <div className="report-card">
                {/* Toolbar */}
                <div className="report-toolbar">
                    <div className="toolbar-left">
                        <select className="premium-select">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <span className="records-text">records per page</span>
                    </div>

                    <div className="toolbar-center">
                        <div className="premium-search">
                            <Search size={16} />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="toolbar-right">
                        <button className="action-btn pdf" title="Export PDF"><FileText size={16} /></button>
                        <button className="action-btn csv" title="Export CSV"><FileDown size={16} /></button>
                        <button className="action-btn print" title="Print"><Printer size={16} /></button>
                        <button className="action-btn excel" title="Export Excel"><FileSpreadsheet size={16} /></button>
                        <button className="action-btn columns" title="Column Visibility"><Columns size={16} /></button>
                    </div>
                </div>

                {/* Data Table */}
                <div className="premium-table-wrapper">
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th className="checkbox-col">
                                    <button className="checkbox-btn" onClick={toggleAll}>
                                        {selectedRows.length === mockData.length ? <CheckSquare size={18} /> : <Square size={18} />}
                                    </button>
                                </th>
                                <th>User</th>
                                <th>Warehouse</th>
                                <th>Cash in Hand</th>
                                <th>Opened at</th>
                                <th>Closed at</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockData.map((row) => (
                                <tr key={row.id} className={selectedRows.includes(row.id) ? 'selected' : ''}>
                                    <td className="checkbox-col">
                                        <button className="checkbox-btn" onClick={() => toggleRow(row.id)}>
                                            {selectedRows.includes(row.id) ? <CheckSquare size={18} /> : <Square size={18} />}
                                        </button>
                                    </td>
                                    <td className="font-medium text-purple">{row.user}</td>
                                    <td>{row.warehouse}</td>
                                    <td className="font-semibold">{row.cashInHand}</td>
                                    <td>{row.openedAt}</td>
                                    <td>{row.closedAt}</td>
                                    <td>
                                        <span className="premium-badge active-badge">{row.status}</span>
                                    </td>
                                    <td>
                                        <button className="icon-action-btn view" onClick={() => setIsModalOpen(true)}>
                                            <Eye size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination */}
                <div className="report-footer">
                    <div className="showing-text">
                        Showing 1 - {mockData.length} of {mockData.length}
                    </div>
                    <div className="premium-pagination">
                        <button className="page-btn disabled"><ChevronLeft size={16} /></button>
                        <button className="page-btn active">1</button>
                        <button className="page-btn disabled"><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>

            <CashRegisterDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div >
    );
}

export default PrintReport;
