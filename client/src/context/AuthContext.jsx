import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || '';

// Decode JWT payload without library
function decodeJWT(token) {
    try {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [admin, setAdmin] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('skylix_admin_token'));
    const [loading, setLoading] = useState(true);
    const logoutTimerRef = useRef(null);

    const logout = useCallback(() => {
        setToken(null);
        setAdmin(null);
        localStorage.removeItem('skylix_admin_token');
        if (logoutTimerRef.current) {
            clearTimeout(logoutTimerRef.current);
            logoutTimerRef.current = null;
        }
    }, []);

    // Schedule auto-logout based on JWT expiry
    const scheduleAutoLogout = useCallback((jwt) => {
        if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
        const payload = decodeJWT(jwt);
        if (!payload?.exp) return;
        const msUntilExpiry = payload.exp * 1000 - Date.now();
        if (msUntilExpiry <= 0) {
            logout();
            return;
        }
        // Log out 10 seconds before expiry to avoid edge cases
        const timeout = Math.max(msUntilExpiry - 10000, 0);
        logoutTimerRef.current = setTimeout(() => {
            console.warn('[AUTH] Token expired — auto logout');
            logout();
        }, timeout);
    }, [logout]);

    // Verify token on mount
    useEffect(() => {
        if (token) {
            // Check if token is already expired
            const payload = decodeJWT(token);
            if (payload?.exp && payload.exp * 1000 <= Date.now()) {
                logout();
                setLoading(false);
                return;
            }

            fetch(`${API_URL}/api/admin/verify`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(r => r.json())
                .then(data => {
                    if (data.success) {
                        setAdmin(data.admin);
                        scheduleAutoLogout(token);
                    } else {
                        logout();
                    }
                })
                .catch(() => logout())
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
        };
    }, []);

    const login = async (username, password) => {
        try {
            const res = await fetch(`${API_URL}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server error: Received non-JSON response');
            }

            const data = await res.json();

            if (data.success) {
                setToken(data.token);
                setAdmin(data.admin);
                localStorage.setItem('skylix_admin_token', data.token);
                scheduleAutoLogout(data.token);
                return { success: true };
            }
            return { success: false, error: data.error };
        } catch (err) {
            console.error('Login error:', err);
            return { success: false, error: err.message || 'Login failed due to network error.' };
        }
    };

    const authFetch = async (url, options = {}) => {
        const res = await fetch(`${API_URL}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...options.headers
            }
        });
        if (res.status === 401 || res.status === 403) {
            logout();
            return null;
        }
        return res;
    };

    return (
        <AuthContext.Provider value={{ admin, token, loading, login, logout, authFetch, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
