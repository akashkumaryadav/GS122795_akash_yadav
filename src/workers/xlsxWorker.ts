import { Store } from "@/store/storeSlice";
import * as XLSX from "xlsx";

self.onmessage = async (event) => {
  try {
    console.log(event.data);
    const arrayBuffer = event.data.file; // We now receive ArrayBuffer directly
    const targetSheet = event.data.sheetName;
    // Read workbook
    const workbook = XLSX.read(arrayBuffer);
    // Find "Stores" sheet
    const sheetName = workbook.SheetNames.find((name) =>
      name.toLowerCase().includes(targetSheet)
    );
    if (!sheetName) {
      self.postMessage({ error: "Stores sheet not found!" });
      return;
    }

    const sheet = workbook.Sheets[sheetName];
    const parsedData: Store[] = XLSX.utils.sheet_to_json(sheet);
    // Map data to Store objects
    if (parsedData) {
      const stores: Store[] = parsedData;
      const headers = Object.keys(parsedData?.[0]);
      self.postMessage({ data: stores, headers });
    }
  } catch (error) {
    self.postMessage({ error: "Error processing XLSX file: " + error });
  }
};
