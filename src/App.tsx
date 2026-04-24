import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./core/auth/AuthProvider";
import { PermissionProvider } from "./core/permission/PermissionProvider";
import { NotifyProvider } from "./core/notify/NotifyProvider";
import { Toaster } from "./core/notify/Toaster";
import { ErrorBoundary } from "./core/error-boundary/ErrorBoundary";
import { AppRoutes } from "./routes";
import { QueryProvider } from "./core/react-query/query-provider";

export default function App() {
  return (
    <QueryProvider>
      <ErrorBoundary
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <div className="text-center">
              <h1 className="mb-2 text-2xl font-bold text-slate-900">
                Có lỗi xảy ra
              </h1>
              <p className="text-slate-600">
                Vui lòng tải lại trang hoặc liên hệ quản trị viên
              </p>
            </div>
          </div>
        }
      >
        <NotifyProvider>
          <AuthProvider>
            <PermissionProvider>
              <BrowserRouter>
                <Toaster />
                <AppRoutes />
              </BrowserRouter>
            </PermissionProvider>
          </AuthProvider>
        </NotifyProvider>
      </ErrorBoundary>
    </QueryProvider>
  );
}
