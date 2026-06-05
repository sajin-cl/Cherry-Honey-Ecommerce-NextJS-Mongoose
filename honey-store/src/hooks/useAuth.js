"use client";

import { useState, useCallback } from "react";
import { apiClient } from "@/lib/apiClient";

/**
 * Manages user auth state.
 * - Fetches current user from /api/auth/me via apiClient
 * - Provides logout() helper
 */
export function useAuth() {
    const [user, setUser] = useState(null);

    const fetchUser = useCallback(async () => {
        try {
            const data = await apiClient.getMe();
            if (data.user) setUser(data.user);
        } catch (err) {
            console.error("Failed to fetch user:", err);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await apiClient.logout();
            setUser(null);
            window.location.href = "/accounts/login";
        } catch (err) {
            console.error("Logout failed:", err);
        }
    }, []);

    return { user, setUser, fetchUser, logout };
}
