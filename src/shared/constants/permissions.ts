import type { PermissionScope } from "@/core/auth/AuthProvider";

/**
 * Permission constants - Centralized permission keys
 * All permission keys used across the application should be defined here
 */

export const PERMISSIONS = {
  // Company permissions
  COMPANY_VIEW: "COMPANY_VIEW",
  COMPANY_CREATE: "COMPANY_CREATE",
  COMPANY_EDIT: "COMPANY_EDIT",
  COMPANY_APPROVE: "COMPANY_APPROVE",
  COMPANY_ACTIVATE: "COMPANY_ACTIVATE",

  // Account/User permissions
  ACCOUNT_VIEW_LIST: "ACCOUNT_VIEW_LIST",
  ACCOUNT_VIEW: "ACCOUNT_VIEW",
  ACCOUNT_CREATE: "ACCOUNT_CREATE",
  ACCOUNT_EDIT: "ACCOUNT_EDIT",
  ACCOUNT_DELETE: "ACCOUNT_DELETE",

  // HR/Employee permissions
  HR_VIEW_LIST: "HR_VIEW_LIST",
  HR_VIEW: "HR_VIEW",
  HR_CREATE: "HR_CREATE",
  HR_EDIT: "HR_EDIT",
  HR_DELETE: "HR_DELETE",

  // Department permissions
  DEPARTMENT_VIEW: "DEPARTMENT_VIEW",
  DEPARTMENT_CREATE: "DEPARTMENT_CREATE",
  DEPARTMENT_EDIT: "DEPARTMENT_EDIT",
  DEPARTMENT_DELETE: "DEPARTMENT_DELETE",

  // Team permissions
  TEAM_VIEW: "TEAM_VIEW",
  TEAM_CREATE: "TEAM_CREATE",
  TEAM_EDIT: "TEAM_EDIT",
  TEAM_DELETE: "TEAM_DELETE",

  // Role permissions
  ROLE_VIEW: "ROLE_VIEW",
  ROLE_CREATE: "ROLE_CREATE",
  ROLE_EDIT: "ROLE_EDIT",
  ROLE_DELETE: "ROLE_DELETE",

  // Project permissions
  PROJECT_VIEW: "PROJECT_VIEW",
  PROJECT_CREATE: "PROJECT_CREATE",
  PROJECT_UPDATE: "PROJECT_UPDATE",
  PROJECT_DELETE: "PROJECT_DELETE",

  // Task permissions
  TASK_VIEW_LIST: "TASK_VIEW_LIST",
  TASK_VIEW: "TASK_VIEW",
  TASK_CREATE: "TASK_CREATE",
  TASK_EDIT: "TASK_EDIT",
  TASK_DELETE: "TASK_DELETE",
  TASK_ASSIGN: "TASK_ASSIGN",

  // Task Review permissions
  TASK_REVIEW_DISPATCH_VIEW: "TASK_REVIEW_DISPATCH_VIEW",
  TASK_REVIEW_VIEW_ASSIGNED: "TASK_REVIEW_VIEW_ASSIGNED",
  TASK_REVIEW_APPROVE: "TASK_REVIEW_APPROVE",
  TASK_REVIEW_REJECT: "TASK_REVIEW_REJECT",

  // Project Role Master permissions
  PROJECT_ROLE_MASTER_VIEW: "PROJECT_ROLE_MASTER_VIEW",
  PROJECT_ROLE_MASTER_CREATE: "PROJECT_ROLE_MASTER_CREATE",
  PROJECT_ROLE_MASTER_EDIT: "PROJECT_ROLE_MASTER_EDIT",
  PROJECT_ROLE_MASTER_DELETE: "PROJECT_ROLE_MASTER_DELETE",

  // Career Track permissions (Master Data)
  ORG_TRACK_VIEW: "ORG_TRACK_VIEW",
  ORG_TRACK_CREATE: "ORG_TRACK_CREATE",
  ORG_TRACK_EDIT: "ORG_TRACK_EDIT",
  ORG_TRACK_ARCHIVE: "ORG_TRACK_ARCHIVE",

  // Position permissions (Master Data)
  ORG_POSITION_VIEW: "ORG_POSITION_VIEW",
  ORG_POSITION_CREATE: "ORG_POSITION_CREATE",
  ORG_POSITION_EDIT: "ORG_POSITION_EDIT",
  ORG_POSITION_ARCHIVE: "ORG_POSITION_ARCHIVE",

  // Performance permissions
  PERF_SELF_VIEW: "PERF_SELF_VIEW",
  PERF_LAB_IMPORT_CREATE: "PERF_LAB_IMPORT_CREATE",
  PERF_LAB_IMPORT_EXECUTE: "PERF_LAB_IMPORT_EXECUTE",
  PERF_LAB_IMPORT_VIEW: "PERF_LAB_IMPORT_VIEW",
  PERF_DASHBOARD_VIEW: "PERF_DASHBOARD_VIEW",
  PERF_DETAIL_VIEW: "PERF_DETAIL_VIEW",

  // Historical Performance permissions
  HIST_WORK_IMPORT: "HIST_WORK_IMPORT",
  HIST_WORK_VIEW: "HIST_WORK_VIEW",
  HIST_WORK_IMPORT_LOG_VIEW: "HIST_WORK_IMPORT_LOG_VIEW",
  HIST_PERF_VIEW: "HIST_PERF_VIEW",
  HIST_PERF_CALCULATE: "HIST_PERF_CALCULATE",
  HIST_PERF_LOG_VIEW: "HIST_PERF_LOG_VIEW",
} as const;

export type PermissionKey = keyof typeof PERMISSIONS;

export const ALL_PERMISSION_KEYS: PermissionKey[] = Object.keys(PERMISSIONS) as PermissionKey[];

export const SCOPE_OPTIONS: Array<{ value: PermissionScope; label: string }> = [
  { value: "ALL_COMPANY", label: "Toàn công ty" },
  { value: "TEAM", label: "Team" },
  { value: "PROJECT", label: "Dự án" },
  { value: "SELF", label: "Cá nhân" },
  { value: "ASSIGNED", label: "Được giao" },
  { value: "CLIENT", label: "Client" },
];

export interface PermissionGroup {
  group: string;
  permissions: Array<{
    key: PermissionKey;
    label: string;
    description?: string;
  }>;
}

export const PERMISSION_GROUPS: PermissionGroup[] = [
  {
    group: "company",
    permissions: [
      { key: "COMPANY_VIEW", label: "Xem công ty" },
      { key: "COMPANY_CREATE", label: "Tạo công ty" },
      { key: "COMPANY_EDIT", label: "Chỉnh sửa công ty" },
      { key: "COMPANY_APPROVE", label: "Phê duyệt công ty" },
      { key: "COMPANY_ACTIVATE", label: "Kích hoạt công ty" },
    ],
  },
  {
    group: "account",
    permissions: [
      { key: "ACCOUNT_VIEW_LIST", label: "Xem danh sách tài khoản" },
      { key: "ACCOUNT_VIEW", label: "Xem chi tiết tài khoản" },
      { key: "ACCOUNT_CREATE", label: "Tạo tài khoản" },
      { key: "ACCOUNT_EDIT", label: "Chỉnh sửa tài khoản" },
      { key: "ACCOUNT_DELETE", label: "Xóa tài khoản" },
    ],
  },
  {
    group: "hr",
    permissions: [
      { key: "HR_VIEW_LIST", label: "Xem danh sách nhân sự" },
      { key: "HR_VIEW", label: "Xem chi tiết nhân sự" },
      { key: "HR_CREATE", label: "Tạo nhân sự" },
      { key: "HR_EDIT", label: "Chỉnh sửa nhân sự" },
      { key: "HR_DELETE", label: "Xóa nhân sự" },
    ],
  },
  {
    group: "department",
    permissions: [
      { key: "DEPARTMENT_VIEW", label: "Xem phòng ban" },
      { key: "DEPARTMENT_CREATE", label: "Tạo phòng ban" },
      { key: "DEPARTMENT_EDIT", label: "Chỉnh sửa phòng ban" },
      { key: "DEPARTMENT_DELETE", label: "Xóa phòng ban" },
    ],
  },
  {
    group: "team",
    permissions: [
      { key: "TEAM_VIEW", label: "Xem team" },
      { key: "TEAM_CREATE", label: "Tạo team" },
      { key: "TEAM_EDIT", label: "Chỉnh sửa team" },
      { key: "TEAM_DELETE", label: "Xóa team" },
    ],
  },
  {
    group: "role",
    permissions: [
      { key: "ROLE_VIEW", label: "Xem vai trò" },
      { key: "ROLE_CREATE", label: "Tạo vai trò" },
      { key: "ROLE_EDIT", label: "Chỉnh sửa vai trò" },
      { key: "ROLE_DELETE", label: "Xóa vai trò" },
    ],
  },
  {
    group: "project",
    permissions: [
      { key: "PROJECT_VIEW", label: "Xem dự án" },
      { key: "PROJECT_CREATE", label: "Tạo dự án" },
      { key: "PROJECT_UPDATE", label: "Cập nhật dự án" },
      { key: "PROJECT_DELETE", label: "Xóa dự án" },
    ],
  },
  {
    group: "task",
    permissions: [
      { key: "TASK_VIEW_LIST", label: "Xem danh sách công việc" },
      { key: "TASK_VIEW", label: "Xem chi tiết công việc" },
      { key: "TASK_CREATE", label: "Tạo công việc" },
      { key: "TASK_EDIT", label: "Chỉnh sửa công việc" },
      { key: "TASK_DELETE", label: "Xóa công việc" },
      { key: "TASK_ASSIGN", label: "Giao việc" },
    ],
  },
];

export const PERMISSION_GROUPS_RECORD = PERMISSION_GROUPS.reduce(
  (acc, group) => ({
    ...acc,
    [group.group]: group.permissions,
  }),
  {} as Record<string, PermissionGroup["permissions"]>
);
