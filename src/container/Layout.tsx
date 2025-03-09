import Navbar from "@/components/layout/Navigation";
import LeftNavigation from "@/components/layout/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { loadXLSXFileWithWorker } from "@/service/xlsxService";
import {
  BarChartIcon,
  HomeIcon,
  PieChartIcon,
  TokensIcon,
} from "@radix-ui/react-icons";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import "../App.css";
import { initStore } from "@/store/storeSlice";

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
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storesFromXLSX = await loadXLSXFileWithWorker("stores");
        dispatch(initStore(storesFromXLSX));
      } catch (error) {
        console.error("Failed to load XLSX:", error);
      }
    };
    fetchData();
  }, []);
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
