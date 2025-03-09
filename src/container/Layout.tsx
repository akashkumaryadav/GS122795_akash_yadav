import Navbar from "@/components/layout/Navigation";
import LeftNavigation from "@/components/layout/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  BarChartIcon,
  HomeIcon,
  PieChartIcon,
  TokensIcon,
} from "@radix-ui/react-icons";
import { ReactNode, useEffect } from "react";
import "../App.css";
import useSheetData from "@/hooks/useSheetData";
import { useDispatch } from "react-redux";
import { initStore, Store } from "@/store/storeSlice";
import { initStore as initSkuStore, Sku } from "@/store/skuSlice";
import { initStore as initCalendar, Calendar } from "@/store/calendarSlice";

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
  const storeSheet = useSheetData<Store>({
    sheetName: "stores",
    fetch: false,
  });

  const skuSheet = useSheetData<Sku>({
    sheetName: "skus",
    fetch: false,
  });

  const calendarSheet = useSheetData<Calendar>({
    sheetName: "calendar",
    fetch: false,
  });

  useEffect(() => {
    if (storeSheet.data && storeSheet.headers) {
      dispatch(
        initStore({ rows: storeSheet.data, columns: storeSheet.headers })
      );
    }
  }, [storeSheet, dispatch]);

  useEffect(() => {
    if (skuSheet.data && skuSheet.headers) {
      dispatch(
        initSkuStore({ rows: skuSheet.data, columns: skuSheet.headers })
      );
    }
  }, [skuSheet, dispatch]);

  useEffect(() => {
    if (calendarSheet.data && calendarSheet.headers) {
      dispatch(
        initCalendar({
          rows: calendarSheet.data,
          columns: calendarSheet.headers,
        })
      );
    }
  }, [calendarSheet, dispatch]);

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
