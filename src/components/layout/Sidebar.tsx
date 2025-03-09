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
                  <a href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </a>
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
