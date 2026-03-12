import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MessageCircle, Search, Clock, ChevronDown } from '../../components/Icons';

export default function AdminChatLogs() {
    const { authFetch } = useAuth();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
    const [search, setSearch] = useState('');
    const [tabFilter, setTabFilter] = useState('all');
    const [expandedSession, setExpandedSession] = useState(null);
    const [expandedData, setExpandedData] = useState(null);
    const [expandLoading, setExpandLoading] = useState(false);

    const loadLogs = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ page, limit: 20 });
            if (search) params.set('search', search);
            if (tabFilter !== 'all') params.set('tab', tabFilter);
            const res = await authFetch(`/api/admin/chatbot-logs?${params}`);
            if (res) {
                const data = await res.json();
                if (data.success) {
                    setLogs(data.logs);
                    setPagination(data.pagination);
                }
            }
        } catch (err) {
            console.error('Failed to load chat logs:', err);
        } finally {
            setLoading(false);
        }
    }, [authFetch, search, tabFilter]);

    useEffect(() => {
        loadLogs(1);
    }, [tabFilter]);

    const handleSearch = (e) => {
        e.preventDefault();
        loadLogs(1);
    };

    const toggleExpand = async (sessionId) => {
        if (expandedSession === sessionId) {
            setExpandedSession(null);
            setExpandedData(null);
            return;
        }
        setExpandedSession(sessionId);
        setExpandLoading(true);
        try {
            const res = await authFetch(`/api/admin/chatbot-logs/${sessionId}`);
            if (res) {
                const data = await res.json();
                if (data.success) {
                    setExpandedData(data.log);
                }
            }
        } catch (err) {
            console.error('Failed to load session:', err);
        } finally {
            setExpandLoading(false);
        }
    };

    const formatDuration = (start, end) => {
        if (!start || !end) return '—';
        const ms = new Date(end) - new Date(start);
        const sec = Math.floor(ms / 1000);
        if (sec < 60) return `${sec}s`;
        const min = Math.floor(sec / 60);
        return `${min}m ${sec % 60}s`;
    };

    const formatDate = (d) => {
        if (!d) return '—';
        return new Date(d).toLocaleString('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div style={s.page}>
            <div style={s.header}>
                <h1 style={s.title}>Chat Logs</h1>
                <p style={s.subtitle}>All chatbot conversations from website visitors</p>
            </div>

            {/* Filters */}
            <div style={s.filtersRow}>
                <form onSubmit={handleSearch} style={s.searchForm}>
                    <Search size={16} style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                    <input
                        style={s.searchInput}
                        placeholder="Search messages..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </form>
                <div style={s.tabFilters}>
                    {['all', 'support', 'sales'].map(t => (
                        <button
                            key={t}
                            style={{ ...s.filterBtn, ...(tabFilter === t ? s.filterBtnActive : {}) }}
                            onClick={() => setTabFilter(t)}
                        >
                            {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            {loading ? (
                <div style={s.loadingState}>
                    <div className="admin-spinner" style={{ margin: '0 auto' }}></div>
                </div>
            ) : logs.length === 0 ? (
                <div style={s.empty}>
                    <MessageCircle size={32} style={{ color: 'rgba(255,255,255,0.15)', marginBottom: '12px' }} />
                    <p>No chat sessions found.</p>
                    <p style={{ fontSize: '12px', marginTop: '4px' }}>Sessions will appear here when visitors use the chatbot.</p>
                </div>
            ) : (
                <div style={s.table}>
                    <div style={s.tableHeader}>
                        <span style={{ ...s.th, flex: 3 }}>Date</span>
                        <span style={{ ...s.th, flex: 2 }}>Tab</span>
                        <span style={{ ...s.th, flex: 2 }}>Messages</span>
                        <span style={{ ...s.th, flex: 2 }}>Duration</span>
                        <span style={{ ...s.th, flex: 1, textAlign: 'center' }}></span>
                    </div>
                    {logs.map((log) => (
                        <div key={log.sessionId || log._id}>
                            <div
                                style={{ ...s.tableRow, cursor: 'pointer', background: expandedSession === log.sessionId ? 'rgba(255,255,255,0.03)' : 'transparent' }}
                                onClick={() => toggleExpand(log.sessionId)}
                            >
                                <span style={{ ...s.td, flex: 3, fontWeight: 500, color: '#fff' }}>
                                    {formatDate(log.startedAt)}
                                </span>
                                <span style={{ ...s.td, flex: 2 }}>
                                    <span style={{ ...s.tabBadge, ...(log.activeTab === 'sales' ? s.salesBadge : s.supportBadge) }}>
                                        {log.activeTab || 'support'}
                                    </span>
                                </span>
                                <span style={{ ...s.td, flex: 2 }}>{log.messageCount || 0}</span>
                                <span style={{ ...s.td, flex: 2 }}>{formatDuration(log.startedAt, log.endedAt)}</span>
                                <span style={{ ...s.td, flex: 1, textAlign: 'center' }}>
                                    <ChevronDown size={14} style={{
                                        color: 'rgba(255,255,255,0.3)',
                                        transition: 'transform 0.2s',
                                        transform: expandedSession === log.sessionId ? 'rotate(180deg)' : 'rotate(0deg)'
                                    }} />
                                </span>
                            </div>

                            {/* Expanded transcript */}
                            {expandedSession === log.sessionId && (
                                <div style={s.transcript}>
                                    {expandLoading ? (
                                        <div style={{ textAlign: 'center', padding: '20px' }}>
                                            <div className="admin-spinner" style={{ margin: '0 auto', width: '20px', height: '20px' }}></div>
                                        </div>
                                    ) : expandedData?.messages?.length ? (
                                        expandedData.messages.map((msg, i) => (
                                            <div key={i} style={{ ...s.msgRow, ...(msg.sender === 'user' ? s.msgUser : s.msgBot) }}>
                                                <span style={s.msgSender}>{msg.sender === 'user' ? 'Visitor' : 'SKYLIX AI'}</span>
                                                <p style={s.msgText}>{msg.text}</p>
                                                <span style={s.msgTime}>
                                                    {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : ''}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', textAlign: 'center', padding: '16px' }}>No messages in this session.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
                <div style={s.pagination}>
                    <button
                        style={{ ...s.pageBtn, opacity: pagination.page <= 1 ? 0.3 : 1 }}
                        disabled={pagination.page <= 1}
                        onClick={() => loadLogs(pagination.page - 1)}
                    >← Prev</button>
                    <span style={s.pageInfo}>Page {pagination.page} of {pagination.pages} ({pagination.total} total)</span>
                    <button
                        style={{ ...s.pageBtn, opacity: pagination.page >= pagination.pages ? 0.3 : 1 }}
                        disabled={pagination.page >= pagination.pages}
                        onClick={() => loadLogs(pagination.page + 1)}
                    >Next →</button>
                </div>
            )}
        </div>
    );
}

const s = {
    page: { padding: '40px', marginLeft: '260px', maxWidth: '1100px' },
    header: { marginBottom: '32px' },
    title: { fontSize: '28px', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", margin: 0 },
    subtitle: { color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '4px' },
    filtersRow: { display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' },
    searchForm: {
        display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '200px',
        background: 'rgba(15, 20, 55, 0.35)', border: '1px solid rgba(99, 120, 255, 0.12)',
        borderRadius: '12px', padding: '10px 16px'
    },
    searchInput: {
        flex: 1, background: 'none', border: 'none', color: '#fff', fontSize: '14px',
        fontFamily: "'Plus Jakarta Sans', sans-serif", outline: 'none'
    },
    tabFilters: { display: 'flex', gap: '6px' },
    filterBtn: {
        padding: '8px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 500,
        background: 'rgba(15, 20, 55, 0.35)', border: '1px solid rgba(99, 120, 255, 0.10)',
        color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.2s',
        fontFamily: "'Plus Jakarta Sans', sans-serif"
    },
    filterBtnActive: { background: 'rgba(255,107,107,0.12)', borderColor: 'rgba(255,107,107,0.3)', color: '#FF6B6B' },
    loadingState: { padding: '60px', textAlign: 'center' },
    empty: {
        background: 'rgba(15, 20, 55, 0.30)', border: '1px solid rgba(99, 120, 255, 0.10)',
        borderRadius: '14px', padding: '48px 32px', textAlign: 'center',
        color: 'rgba(255,255,255,0.3)', fontSize: '14px'
    },
    table: {
        background: 'rgba(15, 20, 55, 0.25)', border: '1px solid rgba(99, 120, 255, 0.10)',
        borderRadius: '14px', overflow: 'hidden'
    },
    tableHeader: { display: 'flex', padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
    th: { fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.05em' },
    tableRow: {
        display: 'flex', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)',
        alignItems: 'center', transition: 'background 0.15s'
    },
    td: { fontSize: '13px', color: 'rgba(255,255,255,0.6)' },
    tabBadge: { padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 600, textTransform: 'capitalize' },
    supportBadge: { background: 'rgba(125,211,252,0.12)', color: '#7dd3fc' },
    salesBadge: { background: 'rgba(251,191,36,0.12)', color: '#fbbf24' },
    transcript: {
        background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '400px', overflowY: 'auto'
    },
    msgRow: { padding: '10px 14px', borderRadius: '10px', maxWidth: '80%' },
    msgUser: { background: 'rgba(255,107,107,0.08)', alignSelf: 'flex-end', borderBottomRightRadius: '2px' },
    msgBot: { background: 'rgba(15, 20, 55, 0.35)', alignSelf: 'flex-start', borderBottomLeftRadius: '2px' },
    msgSender: { fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.05em' },
    msgText: { fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', margin: '4px 0 2px' },
    msgTime: { fontSize: '10px', color: 'rgba(255,255,255,0.2)' },
    pagination: {
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px',
        marginTop: '24px', padding: '16px'
    },
    pageBtn: {
        padding: '8px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 500,
        background: 'rgba(15, 20, 55, 0.35)', border: '1px solid rgba(99, 120, 255, 0.10)',
        color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif"
    },
    pageInfo: { fontSize: '12px', color: 'rgba(255,255,255,0.3)' }
};
