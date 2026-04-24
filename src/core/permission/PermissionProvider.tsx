import React, { createContext, useContext, useMemo, useCallback } from "react";
import { useAuth } from "../auth/AuthContext";
import {
  PERMISSIONS,
  type PermissionKey,
} from "@/shared/constants/permissions";

interface PermissionContextType {
  /** Check if user has a specific permission */
  can: (permission: PermissionKey | string) => boolean;

  /** Check if user has any of the permissions */
  canSome: (permissions: (PermissionKey | string)[]) => boolean;

  /** Check if user has all of the permissions */
  canEvery: (permissions: (PermissionKey | string)[]) => boolean;

  /** Get all permissions for current user */
  permissions: Array<{
    permissionKey: string;
    allowed: boolean;
    scope: string;
  }>;

  /** Get permission constants */
  PERMISSIONS: Record<string, PermissionKey>;
}

const PermissionContext = createContext<PermissionContextType | undefined>(
  undefined,
);

export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { permissions: userPermissions } = useAuth();

  // Create a Set of allowed permission keys for O(1) lookup
  const allowedPermissionsSet = useMemo(() => {
    return new Set(
      userPermissions
        .filter((p: { allowed: boolean; permissionKey: string }) => p.allowed)
        .map((p: { permissionKey: string }) => p.permissionKey),
    );
  }, [userPermissions]);

  /**
   * Check if user has a specific permission
   */
  const can = useCallback(
    (permission: PermissionKey | string): boolean => {
      return allowedPermissionsSet.has(permission);
    },
    [allowedPermissionsSet],
  );

  /**
   * Check if user has any of the permissions (OR logic)
   */
  const canSome = useCallback(
    (permissions: (PermissionKey | string)[]): boolean => {
      return permissions.some((permission) =>
        allowedPermissionsSet.has(permission),
      );
    },
    [allowedPermissionsSet],
  );

  /**
   * Check if user has all of the permissions (AND logic)
   */
  const canEvery = useCallback(
    (permissions: (PermissionKey | string)[]): boolean => {
      return permissions.every((permission) =>
        allowedPermissionsSet.has(permission),
      );
    },
    [allowedPermissionsSet],
  );

  const value: PermissionContextType = {
    can,
    canSome,
    canEvery,
    permissions: userPermissions,
    PERMISSIONS,
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};

/**
 * Hook to access permission context
 */
export const usePermission = (): PermissionContextType => {
  const context = useContext(PermissionContext);

  if (context === undefined) {
    throw new Error("usePermission must be used within a PermissionProvider");
  }

  return context;
};

/**
 * HOC to inject permission props into a component
 */
export function withPermission<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requiredPermissions: (PermissionKey | string | (PermissionKey | string)[])[],
  fallback?: React.ComponentType<P> | null,
) {
  const WithPermission: React.FC<P> = (props) => {
    const { canSome } = usePermission();

    const hasPermission = requiredPermissions.some((perm) => {
      if (Array.isArray(perm)) {
        return canSome(perm);
      }
      return canSome([perm]);
    });

    if (hasPermission) {
      return <WrappedComponent {...props} />;
    }

    if (fallback) {
      const FallbackComponent = fallback;
      return <FallbackComponent {...props} />;
    }

    return null;
  };

  WithPermission.displayName = `WithPermission(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return WithPermission;
}
