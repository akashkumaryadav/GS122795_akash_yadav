import { loadXLSXFileWithWorker } from "@/service/xlsxService";
import { Store } from "@/store/storeSlice";
import { useEffect, useState } from "react";

const useSheetData = ({
  sheetName,
  fetch,
}: {
  sheetName: string;
  fetch: boolean;
}) => {
  const [data, setData] = useState<{ data: Store[]; headers: string[] }>();
  useEffect(() => {
    const fetchData = async () => {
      console.log("loading sheet");
      try {
        const storesFromXLSX = await loadXLSXFileWithWorker(sheetName);
        setData(storesFromXLSX);
      } catch (error) {
        console.error("Failed to load XLSX:", error);
      }
    };
    if (!fetch) {
      fetchData();
    }
  }, [sheetName, fetch]);
  return {
    data: data?.data,
    headers: data?.headers,
  };
};

export default useSheetData;
