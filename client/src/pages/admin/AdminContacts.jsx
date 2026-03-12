import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Download, Trash, X } from '../../components/Icons';

export default function AdminContacts() {
    const { authFetch } = useAuth();
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);

    useEffect(() => { loadContacts(); }, [statusFilter, pagination.page]);

    const loadContacts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: pagination.page,
                limit: 15,
                ...(search && { search }),
                ...(statusFilter !== 'all' && { status: statusFilter })
            });
            const res = await authFetch(`/api/admin/contacts?${params}`);
            if (res) {
                const data = await res.json();
                if (data.success) {
                    setContacts(data.contacts);
                    setPagination(data.pagination);
                }
            }
        } catch (err) {
            console.error('Failed to load contacts:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPagination(p => ({ ...p, page: 1 }));
        loadContacts();
    };

    const updateStatus = async (id, newStatus) => {
        const res = await authFetch(`/api/admin/contacts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ status: newStatus })
        });
        if (res) {
            setContacts(prev => prev.map(c => c._id === id ? { ...c, status: newStatus } : c));
            if (selected?._id === id) setSelected(prev => ({ ...prev, status: newStatus }));
        }
    };

    const deleteContact = async (id) => {
        if (!confirm('Permanently delete this contact?')) return;
        const res = await authFetch(`/api/admin/contacts/${id}`, { method: 'DELETE' });
        if (res) {
            setContacts(prev => prev.filter(c => c._id !== id));
            setSelected(null);
        }
    };

    const exportCSV = async () => {
        try {
            const res = await authFetch('/api/admin/export/contacts');
            if (res) {
                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'skylix-contacts.csv';
                a.click();
                URL.revokeObjectURL(url);
            }
        } catch (err) {
            console.error('Export failed:', err);
        }
    };

    return (
        <div style={s.page}>
            <div style={s.header}>
                <div>
                    <h1 style={s.title}>Contacts & Leads</h1>
                    <p style={s.subtitle}>{pagination.total} total inquiries</p>
                </div>
                <button style={s.exportBtn} onClick={exportCSV}><Download size={14} style={{ marginRight: '6px' }} /> Export CSV</button>
            </div>

            {/* Filters */}
            <div style={s.filters}>
                <form onSubmit={handleSearch} style={s.searchForm}>
                    <input
                        style={s.searchInput}
                        type="text"
                        placeholder="Search by name, email, company..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <button style={s.searchBtn} type="submit">Search</button>
                </form>
                <div style={s.statusFilters}>
                    {['all', 'new', 'read', 'replied', 'archived'].map(st => (
                        <button
                            key={st}
                            style={{ ...s.filterBtn, ...(statusFilter === st ? s.filterBtnActive : {}) }}
                            onClick={() => { setStatusFilter(st); setPagination(p => ({ ...p, page: 1 })); }}
                        >
                            {st === 'all' ? 'All' : st.charAt(0).toUpperCase() + st.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div style={s.tableWrapper}>
                {loading ? (
                    <div style={s.empty}>Loading...</div>
                ) : contacts.length === 0 ? (
                    <div style={s.empty}>No contacts found.</div>
                ) : (
                    <>
                        <div style={s.tableHeader}>
                            <span style={{ ...s.th, flex: 2 }}>Name</span>
                            <span style={{ ...s.th, flex: 3 }}>Email</span>
                            <span style={{ ...s.th, flex: 2 }}>Service</span>
                            <span style={{ ...s.th, flex: 1 }}>Status</span>
                            <span style={{ ...s.th, flex: 2 }}>Date</span>
                            <span style={{ ...s.th, flex: 1 }}>Actions</span>
                        </div>
                        {contacts.map(c => (
                            <div key={c._id} style={s.tableRow} onClick={() => setSelected(c)}>
                                <span style={{ ...s.td, flex: 2, fontWeight: 500, color: '#fff', cursor: 'pointer' }}>{c.name}</span>
                                <span style={{ ...s.td, flex: 3 }}>{c.email}</span>
                                <span style={{ ...s.td, flex: 2 }}>{c.service || '—'}</span>
                                <span style={{ ...s.td, flex: 1 }}>
                                    <span style={{ ...s.badge, ...statusColors[c.status] }}>{c.status}</span>
                                </span>
                                <span style={{ ...s.td, flex: 2, fontSize: '12px' }}>{new Date(c.createdAt).toLocaleString()}</span>
                                <span style={{ ...s.td, flex: 1, display: 'flex', gap: '4px' }}>
                                    <button style={s.iconBtn} onClick={(e) => { e.stopPropagation(); deleteContact(c._id); }} title="Delete"><Trash size={14} style={{ color: 'rgba(255,255,255,0.4)' }} /></button>
                                </span>
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
                <div style={s.pagination}>
                    <button style={s.pageBtn} disabled={pagination.page <= 1} onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}>← Prev</button>
                    <span style={s.pageInfo}>Page {pagination.page} of {pagination.pages}</span>
                    <button style={s.pageBtn} disabled={pagination.page >= pagination.pages} onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}>Next →</button>
                </div>
            )}

            {/* Detail Modal */}
            {selected && (
                <div style={s.overlay} onClick={() => setSelected(null)}>
                    <div style={s.modal} onClick={e => e.stopPropagation()}>
                        <div style={s.modalHeader}>
                            <h3 style={s.modalTitle}>{selected.name}</h3>
                            <button style={s.closeBtn} onClick={() => setSelected(null)}><X size={18} /></button>
                        </div>
                        <div style={s.modalBody}>
                            <div style={s.detailRow}><span style={s.detailLabel}>Email</span><span>{selected.email}</span></div>
                            {selected.phone && <div style={s.detailRow}><span style={s.detailLabel}>Phone</span><span>{selected.phone}</span></div>}
                            {selected.company && <div style={s.detailRow}><span style={s.detailLabel}>Company</span><span>{selected.company}</span></div>}
                            {selected.service && <div style={s.detailRow}><span style={s.detailLabel}>Service</span><span>{selected.service}</span></div>}
                            {selected.budget && <div style={s.detailRow}><span style={s.detailLabel}>Budget</span><span>{selected.budget}</span></div>}
                            <div style={s.detailRow}><span style={s.detailLabel}>Date</span><span>{new Date(selected.createdAt).toLocaleString()}</span></div>
                            <div style={{ marginTop: '16px' }}>
                                <span style={s.detailLabel}>Message</span>
                                <div style={s.messageBox}>{selected.message}</div>
                            </div>
                            <div style={{ marginTop: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                <span style={s.detailLabel}>Status: </span>
                                {['new', 'read', 'replied', 'archived'].map(st => (
                                    <button
                                        key={st}
                                        style={{ ...s.statusBtn, ...(selected.status === st ? { background: '#FF6B6B', color: '#fff' } : {}) }}
                                        onClick={() => updateStatus(selected._id, st)}
                                    >
                                        {st}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const statusColors = {
    new: { background: 'rgba(251,191,36,0.12)', color: '#fbbf24' },
    read: { background: 'rgba(125,211,252,0.12)', color: '#7dd3fc' },
    replied: { background: 'rgba(52,211,153,0.12)', color: '#34d399' },
    archived: { background: 'rgba(15, 20, 55, 0.45)', color: 'rgba(255,255,255,0.4)' }
};

const s = {
    page: { padding: '40px', marginLeft: '260px', maxWidth: '1200px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
    title: { fontSize: '28px', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", margin: 0 },
    subtitle: { color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '4px' },
    exportBtn: { background: 'rgba(15, 20, 55, 0.45)', border: '1px solid rgba(99, 120, 255, 0.14)', borderRadius: '10px', color: '#fff', padding: '10px 20px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif" },
    filters: { marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' },
    searchForm: { display: 'flex', gap: '8px', flex: 1, minWidth: '300px' },
    searchInput: { flex: 1, padding: '10px 16px', background: 'rgba(15, 20, 55, 0.45)', border: '1px solid rgba(99, 120, 255, 0.14)', borderRadius: '10px', color: '#fff', fontSize: '13px', fontFamily: "'Plus Jakarta Sans', sans-serif", outline: 'none', boxSizing: 'border-box' },
    searchBtn: { padding: '10px 20px', background: '#FF6B6B', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer' },
    statusFilters: { display: 'flex', gap: '4px' },
    filterBtn: { padding: '8px 16px', background: 'rgba(15, 20, 55, 0.35)', border: '1px solid rgba(99, 120, 255, 0.10)', borderRadius: '8px', color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 500, cursor: 'pointer', textTransform: 'capitalize' },
    filterBtnActive: { background: 'rgba(255,107,107,0.12)', borderColor: 'rgba(255,107,107,0.3)', color: '#FF6B6B' },
    tableWrapper: { background: 'rgba(15, 20, 55, 0.25)', border: '1px solid rgba(99, 120, 255, 0.10)', borderRadius: '14px', overflow: 'hidden', marginBottom: '24px' },
    tableHeader: { display: 'flex', padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
    th: { fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.05em' },
    tableRow: { display: 'flex', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)', alignItems: 'center', cursor: 'pointer', transition: 'background 0.15s' },
    td: { fontSize: '13px', color: 'rgba(255,255,255,0.6)' },
    badge: { padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 600, textTransform: 'capitalize' },
    iconBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', padding: '4px' },
    empty: { padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '14px' },
    pagination: { display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center' },
    pageBtn: { padding: '8px 16px', background: 'rgba(15, 20, 55, 0.45)', border: '1px solid rgba(99, 120, 255, 0.14)', borderRadius: '8px', color: '#fff', fontSize: '13px', cursor: 'pointer' },
    pageInfo: { color: 'rgba(255,255,255,0.4)', fontSize: '13px' },
    overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' },
    modal: { background: '#0D0320', border: '1px solid rgba(99, 120, 255, 0.12)', borderRadius: '20px', width: '100%', maxWidth: '600px', maxHeight: '80vh', overflow: 'auto' },
    modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
    modalTitle: { fontSize: '20px', fontWeight: 700, margin: 0 },
    closeBtn: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '18px', cursor: 'pointer', padding: '4px 8px' },
    modalBody: { padding: '24px 28px' },
    detailRow: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '14px', color: 'rgba(255,255,255,0.7)' },
    detailLabel: { color: 'rgba(255,255,255,0.35)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' },
    messageBox: { marginTop: '8px', padding: '16px', background: 'rgba(15, 20, 55, 0.35)', border: '1px solid rgba(99, 120, 255, 0.10)', borderRadius: '12px', fontSize: '14px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)' },
    statusBtn: { padding: '6px 14px', background: 'rgba(15, 20, 55, 0.45)', border: '1px solid rgba(99, 120, 255, 0.12)', borderRadius: '8px', color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 500, cursor: 'pointer', textTransform: 'capitalize' }
};
