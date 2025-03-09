import { loadXLSXFileWithWorker } from "@/service/xlsxService";
import { useEffect, useState } from "react";

const useSheetData = <T,>({
  sheetName,
  fetch,
}: {
  sheetName: string;
  fetch: boolean;
}) => {
  const [data, setData] = useState<{ data: T[]; headers: string[] }>();
  useEffect(() => {
    const fetchData = async () => {
      console.log("loading sheet");
      try {
        const storesFromXLSX = await loadXLSXFileWithWorker<T>(sheetName);
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
