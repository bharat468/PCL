import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { setNavigate } from "../utils/navigation";
import { useEffect, useState } from "react";
import { logout, validateToken } from "../services/authService";
import AdminLoader from "../components/admin/Loader";
import { toast } from "sonner";
import Cookies from "js-cookie";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
import { AppSidebar } from "../components/admin/sidebar/AppSidebar";
import { Separator } from "../components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { useDispatch } from "react-redux";
import { setUser } from "../features/global/globalSlice";

export default function AdminLayout() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Set global navigate utility
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const response = await validateToken();
        if (response.status === 200) {
          dispatch(setUser(response.data.user));
          setIsAuthenticated(true);
        } else {
          throw new Error("Invalid token");
        }
      } catch (error) {
        Cookies.remove("accessToken");

        console.error("Token validation failed:", error);
        toast.error(
          error.response?.data?.message || "Failed to validate token"
        );
        setIsAuthenticated(false);
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    const token = Cookies.get("accessToken");
    if (token) {
      checkAuth();
    } else {
      setLoading(false);
      setIsAuthenticated(false);
      navigate("/admin/login");
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <AdminLoader />
      </div>
    );
  }

  // Only render children if authenticated
  return isAuthenticated ? (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 px-4 lg:px-6 shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Home</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="px-4 lg:px-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  ) : (
    <Navigate to="/admin/login" replace />
  );
}
