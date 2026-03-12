import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Mail, Bell, CheckCircle, Calendar, Clipboard, Globe, MessageCircle, Clock } from '../../components/Icons';

export default function AdminDashboard() {
    const { authFetch } = useAuth();
    const [stats, setStats] = useState(null);
    const [recent, setRecent] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const [statsRes, activityRes] = await Promise.all([
                authFetch('/api/admin/stats'),
                authFetch('/api/admin/activity?limit=8')
            ]);

            if (statsRes) {
                const data = await statsRes.json();
                if (data.success) {
                    setStats(data.stats);
                    setRecent(data.recentContacts);
                }
            }

            if (activityRes) {
                const data = await activityRes.json();
                if (data.success) {
                    setActivities(data.activities);
                }
            }
        } catch (err) {
            console.error('Failed to load dashboard:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div style={s.loading}><div className="admin-spinner" style={{ margin: '0 auto' }}></div></div>;

    return (
        <div style={s.page}>
            <div style={s.header}>
                <h1 style={s.title}>Dashboard</h1>
                <p style={s.subtitle}>Overview of your SKYLIX admin panel</p>
            </div>

            {/* Stats Grid */}
            <div style={s.statsGrid}>
                <StatCard label="Total Inquiries" value={stats?.totalContacts || 0} icon={<Mail size={20} />} color="#FF6B6B" />
                <StatCard label="New (Unread)" value={stats?.newContacts || 0} icon={<Bell size={20} />} color="#fbbf24" />
                <StatCard label="Replied" value={stats?.repliedContacts || 0} icon={<CheckCircle size={20} />} color="#34d399" />
                <StatCard label="This Month" value={stats?.monthlyContacts || 0} icon={<Calendar size={20} />} color="#7dd3fc" />
                <StatCard label="Chat Sessions" value={stats?.totalChatbotSessions || 0} icon={<MessageCircle size={20} />} color="#c4b5fd" />
            </div>

            {/* Recent Contacts */}
            <div style={s.section}>
                <div style={s.sectionHeader}>
                    <h2 style={s.sectionTitle}>Recent Inquiries</h2>
                    <Link to="/skylix-admin-portal/contacts" style={s.viewAll}>View All</Link>
                </div>

                {recent.length === 0 ? (
                    <div style={s.empty}>No inquiries yet. Contacts will appear here when submitted.</div>
                ) : (
                    <div style={s.table}>
                        <div style={s.tableHeader}>
                            <span style={{ ...s.th, flex: 2 }}>Name</span>
                            <span style={{ ...s.th, flex: 3 }}>Email</span>
                            <span style={{ ...s.th, flex: 2 }}>Service</span>
                            <span style={{ ...s.th, flex: 1 }}>Status</span>
                            <span style={{ ...s.th, flex: 2 }}>Date</span>
                        </div>
                        {recent.map((c) => (
                            <div key={c._id} style={s.tableRow}>
                                <span style={{ ...s.td, flex: 2, fontWeight: 500, color: '#fff' }}>{c.name}</span>
                                <span style={{ ...s.td, flex: 3 }}>{c.email}</span>
                                <span style={{ ...s.td, flex: 2 }}>{c.service || '—'}</span>
                                <span style={{ ...s.td, flex: 1 }}>
                                    <span style={{ ...s.statusBadge, ...statusColors[c.status] }}>{c.status}</span>
                                </span>
                                <span style={{ ...s.td, flex: 2 }}>{new Date(c.createdAt).toLocaleDateString()}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Recent Admin Activity */}
            <div style={s.section}>
                <div style={s.sectionHeader}>
                    <h2 style={s.sectionTitle}>Recent Activity</h2>
                </div>

                {activities.length === 0 ? (
                    <div style={s.empty}>No activity yet. Actions will be logged here.</div>
                ) : (
                    <div style={s.activityTimeline}>
                        {activities.map((act, i) => (
                            <div key={act._id || i} style={s.activityItem}>
                                <div style={{ ...s.activityDot, background: activityColor(act.action) }}></div>
                                <div style={s.activityContent}>
                                    <span style={s.activityAction}>
                                        <strong style={{ color: '#fff' }}>{act.adminUsername}</strong>
                                        {' '}{activityLabel(act.action)}
                                    </span>
                                    {act.details && <span style={s.activityDetails}>{act.details}</span>}
                                    <span style={s.activityTime}>
                                        <Clock size={10} style={{ marginRight: '4px' }} />
                                        {formatTimeAgo(act.timestamp)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div style={s.section}>
                <h2 style={s.sectionTitle}>Quick Actions</h2>
                <div style={s.actionsGrid}>
                    <Link to="/skylix-admin-portal/contacts" style={s.actionCard}>
                        <div style={{ ...s.actionIcon, background: 'rgba(255,107,107,0.1)', color: '#FF6B6B' }}><Clipboard size={20} /></div>
                        <span style={s.actionLabel}>Manage Contacts</span>
                    </Link>
                    <Link to="/skylix-admin-portal/chat-logs" style={s.actionCard}>
                        <div style={{ ...s.actionIcon, background: 'rgba(196,181,253,0.1)', color: '#c4b5fd' }}><MessageCircle size={20} /></div>
                        <span style={s.actionLabel}>View Chat Logs</span>
                    </Link>
                    <a href="/" target="_blank" rel="noreferrer" style={s.actionCard}>
                        <div style={{ ...s.actionIcon, background: 'rgba(52,211,153,0.1)', color: '#34d399' }}><Globe size={20} /></div>
                        <span style={s.actionLabel}>View Website</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, color }) {
    return (
        <div style={s.statCard}>
            <div style={{ ...s.statIcon, background: `${color}15`, color }}>{icon}</div>
            <div>
                <div style={{ ...s.statValue, color }}>{value}</div>
                <div style={s.statLabel}>{label}</div>
            </div>
        </div>
    );
}

function activityLabel(action) {
    const map = {
        login: 'logged in',
        status_change: 'changed contact status',
        delete_contact: 'deleted a contact',
        export_csv: 'exported contacts (CSV)',
        view_contacts: 'viewed contacts'
    };
    return map[action] || action;
}

function activityColor(action) {
    const map = {
        login: '#34d399',
        status_change: '#fbbf24',
        delete_contact: '#f87171',
        export_csv: '#7dd3fc',
        view_contacts: '#c4b5fd'
    };
    return map[action] || 'rgba(255,255,255,0.2)';
}

function formatTimeAgo(ts) {
    const now = Date.now();
    const diff = now - new Date(ts).getTime();
    const sec = Math.floor(diff / 1000);
    if (sec < 60) return 'just now';
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const d = Math.floor(hr / 24);
    return `${d}d ago`;
}

const statusColors = {
    new: { background: 'rgba(251,191,36,0.12)', color: '#fbbf24' },
    read: { background: 'rgba(125,211,252,0.12)', color: '#7dd3fc' },
    replied: { background: 'rgba(52,211,153,0.12)', color: '#34d399' },
    archived: { background: 'rgba(15, 20, 55, 0.45)', color: 'rgba(255,255,255,0.4)' }
};

const s = {
    page: { padding: '40px', marginLeft: '260px', maxWidth: '1100px' },
    loading: { marginLeft: '260px', padding: '80px', textAlign: 'center', color: 'rgba(255,255,255,0.5)' },
    header: { marginBottom: '40px' },
    title: { fontSize: '28px', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", margin: 0 },
    subtitle: { color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '4px' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' },
    statCard: {
        background: 'rgba(15, 20, 55, 0.30)', border: '1px solid rgba(99, 120, 255, 0.10)',
        borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px'
    },
    statIcon: { width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    statValue: { fontSize: '28px', fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 },
    statLabel: { fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' },
    section: { marginBottom: '40px' },
    sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
    sectionTitle: { fontSize: '18px', fontWeight: 600, margin: 0 },
    viewAll: { color: '#FF6B6B', fontSize: '13px', fontWeight: 500, textDecoration: 'none' },
    empty: { background: 'rgba(15, 20, 55, 0.30)', border: '1px solid rgba(99, 120, 255, 0.10)', borderRadius: '12px', padding: '32px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '14px' },
    table: { background: 'rgba(15, 20, 55, 0.25)', border: '1px solid rgba(99, 120, 255, 0.10)', borderRadius: '12px', overflow: 'hidden' },
    tableHeader: { display: 'flex', padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
    th: { fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.05em' },
    tableRow: { display: 'flex', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)', alignItems: 'center' },
    td: { fontSize: '13px', color: 'rgba(255,255,255,0.6)' },
    statusBadge: { padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 600, textTransform: 'capitalize' },
    actionsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
    actionCard: {
        background: 'rgba(15, 20, 55, 0.30)', border: '1px solid rgba(99, 120, 255, 0.10)',
        borderRadius: '14px', padding: '24px', textDecoration: 'none', color: '#fff',
        display: 'flex', alignItems: 'center', gap: '14px', transition: 'all 0.2s'
    },
    actionIcon: { width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    actionLabel: { fontSize: '14px', fontWeight: 500 },
    // Activity timeline
    activityTimeline: {
        background: 'rgba(15, 20, 55, 0.25)', border: '1px solid rgba(99, 120, 255, 0.10)',
        borderRadius: '14px', padding: '16px 20px'
    },
    activityItem: {
        display: 'flex', gap: '12px', padding: '12px 0',
        borderBottom: '1px solid rgba(255,255,255,0.03)', alignItems: 'flex-start'
    },
    activityDot: { width: '8px', height: '8px', borderRadius: '50%', marginTop: '5px', flexShrink: 0 },
    activityContent: { display: 'flex', flexDirection: 'column', gap: '2px' },
    activityAction: { fontSize: '13px', color: 'rgba(255,255,255,0.6)' },
    activityDetails: { fontSize: '12px', color: 'rgba(255,255,255,0.3)' },
    activityTime: { fontSize: '11px', color: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', marginTop: '2px' }
};
