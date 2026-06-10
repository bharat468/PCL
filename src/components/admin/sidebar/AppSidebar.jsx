import {
  AudioWaveform,
  BadgeIndianRupee,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Route,
  Settings2,
  Train,
  TramFront,
  User,
} from "lucide-react";

import { NavMain } from "@/components/admin/sidebar/NavMain";
import { NavUser } from "@/components/admin/sidebar/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";

export function AppSidebar({ ...props }) {
  const { user } = useSelector((state) => state.global);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {" "}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div
                style={{ background: "transparent" }}
                className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
              >
                <img src="/logo.png" width={80} height={80} alt="" />
              </div>
              <div
                style={{ fontSize: "16px", fontWeight: "bold" }}
                className="flex-1 text-left font-medium text-md"
              >
                SBIROWA
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
