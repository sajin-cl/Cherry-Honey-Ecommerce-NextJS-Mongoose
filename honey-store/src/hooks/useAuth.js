"use client";

import { useState, useCallback } from "react";

/**
 * Manages user auth state.
 * - Fetches current user from /api/auth/me
 * - Provides logout() helper
 */
export function useAuth() {
    const [user, setUser] = useState(null);

    const fetchUser = useCallback(async () => {
        try {
            const res = await fetch("/api/auth/me");
            if (res.ok) {
                const data = await res.json();
                if (data.user) setUser(data.user);
            }
        } catch (err) {
            console.error("Failed to fetch user:", err);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            setUser(null);
            window.location.href = "/accounts/login";
        } catch (err) {
            console.error("Logout failed:", err);
        }
    }, []);

    return { user, setUser, fetchUser, logout };
}
