import { createBrowserRouter } from "react-router-dom";

import WebsiteLayout from "@/layouts/WebsiteLayout";
import Home from "@/pages/website/Home";
import AboutUs from "../pages/website/AboutUs";
import Membership from "@/pages/website/Membership";
import NoticesEvents from "../pages/website/NoticesEvents";
import Resources from "../pages/website/Resources";
import Gallery from "../pages/website/Gallery";
import ContactUs from "../pages/website/ContactUs";
import Login from "../pages/website/Login";
import { AdminLogin } from "../pages/admin/Login";
import AdminLayout from "../layouts/AdminLayout";
import Documents from "../pages/admin/Document";
import Members from "../pages/admin/Member";
import Messages from "../pages/admin/Message";
import Images from "../pages/admin/Image";
import Roles from "../pages/admin/Roles";
import Admins from "../pages/admin/Admins";
import PermissionGuard from "../components/PermissionGuard";
import ActivityLogs from "../pages/admin/ActivityLogs";
import Approvals from "../pages/admin/Approvals";
import MemberDashboard from "../pages/website/MemberDashboard";
import Dashboard from "../pages/admin/Dashboard";
import HolidayHomes from "../pages/website/HolidayHomes";
import Correspondence from "../pages/website/Correspondence";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WebsiteLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <AboutUs /> },
      { path: "membership", element: <Membership /> },
      { path: "resources", element: <Resources /> },
      { path: "gallery", element: <Gallery /> },
      { path: "contact", element: <ContactUs /> },
      { path: "login", element: <Login /> },
      { path: "dashboard", element: <MemberDashboard /> },
      { path: "holiday-home", element: <HolidayHomes /> },
      { path: "correspondence", element: <Correspondence /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "documents",
        element: (
          <PermissionGuard shouldReturnNull={false} permission="view_documents">
            <Documents />
          </PermissionGuard>
        ),
      },
      {
        path: "members",
        element: (
          <PermissionGuard shouldReturnNull={false} permission="view_members">
            <Members />
          </PermissionGuard>
        ),
      },
      {
        path: "messages",
        element: (
          <PermissionGuard shouldReturnNull={false} permission="view_messages">
            <Messages />
          </PermissionGuard>
        ),
      },
      {
        path: "images",
        element: (
          <PermissionGuard shouldReturnNull={false} permission="view_images">
            <Images />
          </PermissionGuard>
        ),
      },
      {
        path: "roles",
        element: (
          <PermissionGuard shouldReturnNull={false} permission="view_roles">
            <Roles />
          </PermissionGuard>
        ),
      },
      {
        path: "admins",
        element: (
          <PermissionGuard shouldReturnNull={false} permission="view_admins">
            <Admins />
          </PermissionGuard>
        ),
      },
      {
        path: "logs",
        element: (
          <PermissionGuard shouldReturnNull={false} permission="view_logs">
            <ActivityLogs />
          </PermissionGuard>
        ),
      },
      {
        path: "approvals",
        element: (
          <PermissionGuard
            shouldReturnNull={false}
            permission="view_pending_approvals"
          >
            <Approvals />
          </PermissionGuard>
        ),
      },
    ],
  },
  { path: "/admin/login", element: <AdminLogin /> },
  { path: "*", element: <div>404</div> },
]);

export default router;
