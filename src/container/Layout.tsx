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
import { Provider } from "react-redux";
import { store } from "@/store/store";

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
    <Provider store={store}>
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
    </Provider>
  );
};

export default Layout;
