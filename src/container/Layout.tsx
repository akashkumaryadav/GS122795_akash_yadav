import Navbar from "@/components/layout/Navigation";
import LeftNavigation from "@/components/layout/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
    BarChartIcon,
    HomeIcon,
    PieChartIcon,
    TokensIcon,
} from "@radix-ui/react-icons";
import { ReactNode } from "react";
import "../App.css";

const menuitems = [
  {
    title: "Store",
    url: "/stores",
    icon: HomeIcon,
  },
  {
    title: "SKU",
    url: "/skus",
    icon: TokensIcon,
  },
  {
    title: "Planning",
    url: "/planning",
    icon: BarChartIcon,
  },
  {
    title: "Chart",
    url: "/charts",
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
            <SidebarTrigger />
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
