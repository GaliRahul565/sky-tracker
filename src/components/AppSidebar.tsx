import {
  Home,
  Video,
  ScanSearch,
  Layers,
  Route,
  FileBarChart,
  Network,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Video Input", url: "/video-input", icon: Video },
  { title: "Object Detection", url: "/detection", icon: ScanSearch },
  { title: "Feature Extraction", url: "/features", icon: Layers },
  { title: "Tracking", url: "/tracking", icon: Route },
  { title: "Results & Export", url: "/results", icon: FileBarChart },
  { title: "Architecture", url: "/architecture", icon: Network },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent className="pt-4">
        <div className="px-4 pb-4 mb-2 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Route className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs font-bold text-sidebar-primary-foreground tracking-wide">RS-TRACKER</p>
              <p className="text-[10px] text-sidebar-foreground">Deep Learning Pipeline</p>
            </div>
          </div>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-sidebar-foreground/50">
            Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
