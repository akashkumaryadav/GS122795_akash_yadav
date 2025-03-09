import { ReactNode } from "react";
import Navbar from "@/components/layout/Navigation";
import LeftNavigation from "@/components/layout/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import "../App.css";
import {
  HomeIcon,
  TokensIcon,
  BarChartIcon,
  PieChartIcon,
} from "@radix-ui/react-icons";

const menuitems = [
  {
    title: "Store",
    url: "#",
    icon: HomeIcon,
  },
  {
    title: "SKU",
    url: "#",
    icon: TokensIcon,
  },
  {
    title: "Planning",
    url: "#",
    icon: BarChartIcon,
  },
  {
    title: "Chart",
    url: "#",
    icon: PieChartIcon,
  },
];

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        {/* Sidebar (Left Navigation) */}
        <LeftNavigation menu={menuitems} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col w-full">
          {/* Top Navigation Bar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-1 w-full p-6 mt-10">
            {children}
            <SidebarTrigger />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
