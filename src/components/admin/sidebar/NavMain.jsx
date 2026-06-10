"use client";

import {
  Activity,
  ClipboardClock,
  FileImage,
  FileText,
  LayoutDashboard,
  MessageSquare,
  User,
  UserCog,
  Users,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import PermissionGuard from "@/components/PermissionGuard";

export function NavMain({ items }) {
  return (
    <SidebarGroup>
      <SidebarMenuItem className="list-none p-0 m-0">
        <SidebarMenuButton asChild tooltip={"Dashboard"}>
          <Link to={"/admin/"}>
            <LayoutDashboard />
            <span>Dashboard</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <PermissionGuard shouldReturnNull permission="view_documents">
        <SidebarMenuItem className="list-none p-0 m-0">
          <SidebarMenuButton asChild tooltip={"Documents"}>
            <Link to={"/admin/documents"}>
              <FileText />
              <span>Documents</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </PermissionGuard>
      <PermissionGuard shouldReturnNull permission="view_images">
        <SidebarMenuItem className="list-none p-0 m-0">
          <SidebarMenuButton asChild tooltip={"Images"}>
            <Link to={"/admin/images"}>
              <FileImage />
              <span>Images</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </PermissionGuard>
      <PermissionGuard shouldReturnNull permission="view_messages">
        <SidebarMenuItem className="list-none p-0 m-0">
          <SidebarMenuButton asChild tooltip={"Messages"}>
            <Link to={"/admin/messages"}>
              <MessageSquare />
              <span>Messages</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </PermissionGuard>
      <PermissionGuard shouldReturnNull permission="view_members">
        <SidebarMenuItem className="list-none p-0 m-0">
          <SidebarMenuButton asChild tooltip={"Members"}>
            <Link to={"/admin/members"}>
              <Users />
              <span>Members</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </PermissionGuard>
      <PermissionGuard shouldReturnNull permission="view_admins">
        <SidebarMenuItem className="list-none p-0 m-0">
          <SidebarMenuButton asChild tooltip={"Admins"}>
            <Link to={"/admin/admins"}>
              <User />
              <span>Admins</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </PermissionGuard>
      <PermissionGuard shouldReturnNull permission="view_roles">
        <SidebarMenuItem className="list-none p-0 m-0">
          <SidebarMenuButton asChild tooltip={"Roles"}>
            <Link to={"/admin/roles"}>
              <UserCog />
              <span>Roles</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </PermissionGuard>
      <PermissionGuard shouldReturnNull permission="view_logs">
        <SidebarMenuItem className="list-none p-0 m-0">
          <SidebarMenuButton asChild tooltip={"Activity"}>
            <Link to={"/admin/logs"}>
              <Activity />
              <span>Activity</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </PermissionGuard>
      <PermissionGuard shouldReturnNull permission="view_pending_approvals">
        <SidebarMenuItem className="list-none p-0 m-0">
          <SidebarMenuButton asChild tooltip={"Approvals"}>
            <Link to={"/admin/approvals"}>
              <ClipboardClock />
              <span>Approvals</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </PermissionGuard>
    </SidebarGroup>
  );
}
