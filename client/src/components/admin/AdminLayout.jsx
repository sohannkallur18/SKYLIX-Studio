import { Navigate, Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Users, LogOut, MessageCircle } from '../../components/Icons';

export default function AdminLayout() {
    const { isAuthenticated, loading, admin, logout } = useAuth();

    if (loading) {
        return (
            <div style={styles.loadingWrapper}>
                <div className="admin-spinner"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/skylix-admin-portal" replace />;
    }

    return (
        <div style={styles.layout}>
            {/* Sidebar */}
            <aside style={styles.sidebar}>
                <div>
                    <div style={styles.brand}>
                        <div style={styles.brandDot}></div>
                        <span style={styles.brandName}>SKYLIX</span>
                    </div>
                    <p style={styles.brandSub}>Admin Portal</p>

                    <nav style={styles.nav}>
                        <NavLink to="/skylix-admin-portal/dashboard" style={({ isActive }) => ({ ...styles.navLink, ...(isActive ? styles.navLinkActive : {}) })}>
                            <LayoutDashboard size={16} /> Dashboard
                        </NavLink>
                        <NavLink to="/skylix-admin-portal/chat-logs" style={({ isActive }) => ({ ...styles.navLink, ...(isActive ? styles.navLinkActive : {}) })}>
                            <MessageCircle size={16} /> Chat Logs
                        </NavLink>
                        <NavLink to="/skylix-admin-portal/contacts" style={({ isActive }) => ({ ...styles.navLink, ...(isActive ? styles.navLinkActive : {}) })}>
                            <Users size={16} /> Contacts
                        </NavLink>
                    </nav>
                </div>

                <div style={styles.sidebarFooter}>
                    <div style={styles.adminInfo}>
                        <span style={styles.adminAvatar}>{(admin?.username || 'A')[0].toUpperCase()}</span>
                        <div>
                            <span style={styles.adminName}>{admin?.username}</span>
                            <span style={styles.adminRole}>{admin?.role}</span>
                        </div>
                    </div>
                    <button style={styles.logoutBtn} onClick={logout}>
                        <LogOut size={14} style={{ marginRight: '8px' }} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={styles.main}>
                <Outlet />
            </main>
        </div>
    );
}

const styles = {
    loadingWrapper: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#06010F' },
    layout: { display: 'flex', minHeight: '100vh', background: '#06010F', color: '#fff' },
    sidebar: {
        width: '260px', minHeight: '100vh', background: 'rgba(255,255,255,0.03)',
        borderRight: '1px solid rgba(255,255,255,0.06)', padding: '32px 20px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'fixed', left: 0, top: 0
    },
    brand: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' },
    brandDot: { width: '10px', height: '10px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)' },
    brandName: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '18px', letterSpacing: '0.08em' },
    brandSub: { color: 'rgba(255,255,255,0.3)', fontSize: '11px', fontWeight: 500, marginBottom: '40px' },
    nav: { display: 'flex', flexDirection: 'column', gap: '4px' },
    navLink: {
        display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px',
        borderRadius: '12px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
        fontSize: '14px', fontWeight: 500, transition: 'all 0.2s', fontFamily: "'Plus Jakarta Sans', sans-serif"
    },
    navLinkActive: { background: 'rgba(255,107,107,0.1)', color: '#FF6B6B' },
    sidebarFooter: { borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' },
    adminInfo: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' },
    adminAvatar: {
        width: '36px', height: '36px', borderRadius: '10px',
        background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '14px', fontWeight: 700
    },
    adminName: { display: 'block', fontSize: '13px', fontWeight: 600 },
    adminRole: { display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.3)' },
    logoutBtn: {
        width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px',
        color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 500,
        cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    }
};
