import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const UserAuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || '';

function decodeJWT(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch {
        return null;
    }
}

export function UserAuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('skylix_user_token'));
    const [loading, setLoading] = useState(true);
    const timerRef = useRef(null);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('skylix_user_token');
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const scheduleAutoLogout = useCallback((jwt) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        const payload = decodeJWT(jwt);
        if (!payload?.exp) return;
        const ms = payload.exp * 1000 - Date.now();
        if (ms <= 0) { logout(); return; }
        timerRef.current = setTimeout(() => logout(), Math.max(ms - 10000, 0));
    }, [logout]);

    // Verify on mount
    useEffect(() => {
        if (token) {
            const payload = decodeJWT(token);
            if (payload?.exp && payload.exp * 1000 <= Date.now()) {
                logout();
                setLoading(false);
                return;
            }
            fetch(`${API_URL}/api/auth/verify`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(r => r.json())
                .then(data => {
                    if (data.success) {
                        setUser(data.user);
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

    useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

    const register = async (username, email, password, confirmPassword) => {
        try {
            const res = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, confirmPassword })
            });
            const data = await res.json();
            if (data.success) {
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem('skylix_user_token', data.token);
                scheduleAutoLogout(data.token);
                return { success: true };
            }
            return { success: false, error: data.error };
        } catch (err) {
            return { success: false, error: err.message || 'Registration failed.' };
        }
    };

    const login = async (email, password) => {
        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.success) {
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem('skylix_user_token', data.token);
                scheduleAutoLogout(data.token);
                return { success: true };
            }
            return { success: false, error: data.error };
        } catch (err) {
            return { success: false, error: err.message || 'Login failed.' };
        }
    };

    const unifiedLogin = async (loginIdentifier, password) => {
        try {
            const res = await fetch(`${API_URL}/api/auth/unified-login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ loginIdentifier, password })
            });
            const text = await res.text();
            console.log('[UNIFIED LOGIN DEBUG] Response:', text);

            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error('[UNIFIED LOGIN DEBUG] JSON Parse Error:', e);
                return { success: false, error: 'Server error: Invalid JSON response.' };
            }

            if (data.success) {
                // If Admin, store in admin token storage (for AdminContext to pick up after reload/redirect)
                if (data.role === 'admin') {
                    localStorage.setItem('skylix_admin_token', data.token);
                } else {
                    // If User, store in user token storage
                    localStorage.setItem('skylix_user_token', data.token);
                    setToken(data.token);
                    setUser(data.user);
                    scheduleAutoLogout(data.token);
                }
                return { success: true, role: data.role };
            }
            return { success: false, error: data.error };
        } catch (err) {
            console.error('[UNIFIED LOGIN CONTEXT ERROR]', err);
            return { success: false, error: err.message || 'Login failed.' };
        }
    };

    return (
        <UserAuthContext.Provider value={{
            user, token, loading, login, unifiedLogin, register, logout,
            isAuthenticated: !!token && !!user
        }}>
            {children}
        </UserAuthContext.Provider>
    );
}

export function useUserAuth() {
    const ctx = useContext(UserAuthContext);
    if (!ctx) throw new Error('useUserAuth must be used within UserAuthProvider');
    return ctx;
}
