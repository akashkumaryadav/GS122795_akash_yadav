import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

interface Menu {
  title: string;
  url: string;
  icon?: React.FC;
}

interface LeftNavigationProps {
  menu: Menu[];
}

export const LeftNavigation: React.FC<LeftNavigationProps> = ({ menu }) => {
  return (
    <Sidebar className="mt-16">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup title="Main">
          <SidebarMenu>
            {menu.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default LeftNavigation;
