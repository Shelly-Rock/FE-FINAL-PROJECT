import React, { useCallback, useEffect, useRef, useState } from "react";
import { setupInterceptors } from "../api/interceptors";
import { useAuthProfile } from "./hooks/useAuthQueries";
import { AuthContext } from "./AuthContext";
import { getValidStoredAccessToken, normalizeAccessToken } from "./token";

export type PermissionScope =
  | "ALL_COMPANY"
  | "TEAM"
  | "PROJECT"
  | "SELF"
  | "ASSIGNED"
  | "CLIENT";

export interface EffectivePermission {
  permissionKey: string;
  allowed: boolean;
  scope: PermissionScope;
}

export interface User {
  id: string;
  email: string;
  fullName?: string;
  code?: string | null;
  phone?: string | null;
  gender?: "MALE" | "FEMALE" | "OTHER" | null;
  dob?: string | null;
  address?: string | null;
  companyId: string;
  roleId: string | null;
  roleName?: string | null;
  status: string;
  mustChangePassword?: boolean;
  permissions?: EffectivePermission[];
  isSupervisor?: boolean;
  /** Có hồ sơ nhân sự — không có khi user chỉ là External Client */
  employeeId?: string | null;
  /** PM/PA/ADMIN/BOD/Supervisor — xem mọi task trong công ty */
  seesAllCompanyTasks?: boolean;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  permissions: EffectivePermission[];
  login: (token: string) => void;
  refreshProfile: () => Promise<void>;
  logout: () => void;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    getValidStoredAccessToken(),
  );
  const logoutRef = useRef<() => void>(() => {});

  // React Query profile hook
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
    refetch: refetchProfile,
  } = useAuthProfile(!!token, token);

  // Use profileData directly instead of separate user state
  const user = profileData ?? null;

  // Calculate loading state directly instead of using useEffect
  const isLoading = !token
    ? false
    : user
      ? false
      : profileError
        ? false
        : profileLoading;

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("access_token");
  }, []);

  useEffect(() => {
    logoutRef.current = logout;
  }, [logout]);

  // Handle profile errors - only logout if we have a token and error
  useEffect(() => {
    if (profileError && token) {
      // Use setTimeout to avoid calling setState synchronously in effect
      setTimeout(() => logout(), 0);
    }
  }, [profileError, token, logout]);

  const refreshProfile = async () => {
    await refetchProfile();
  };

  // Chỉ gắn interceptors một lần khi mount (tránh stack nhiều lần khi token đổi)
  useEffect(() => {
    setupInterceptors(() => logoutRef.current());
  }, []);

  //  userData: User -> có thể thêm user vào context nếu cần
  const login = (newToken: string) => {
    const normalizedToken = normalizeAccessToken(newToken);
    if (!normalizedToken) {
      logout();
      return;
    }
    setToken(normalizedToken);
    localStorage.setItem("access_token", normalizedToken);
  };

  const permissions = user?.permissions ?? [];

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        permissions,
        login,
        refreshProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
