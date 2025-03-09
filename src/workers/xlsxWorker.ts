import { Store } from "@/store/storeSlice";
import * as XLSX from "xlsx";

self.onmessage = async (event) => {
  try {
    const arrayBuffer = event.data; // We now receive ArrayBuffer directly
    // Read workbook
    const workbook = XLSX.read(arrayBuffer);
    // Find "Stores" sheet
    const sheetName = workbook.SheetNames.find((name) =>
      name.toLowerCase().includes("stores")
    );
    if (!sheetName) {
      self.postMessage({ error: "Stores sheet not found!" });
      return;
    }

    const sheet = workbook.Sheets[sheetName];
    const parsedData: Record<string, string>[] =
      XLSX.utils.sheet_to_json(sheet);
    console.log(sheet);
    // Map data to Store objects
    const stores: Store[] = parsedData.map((store: Record<string, string>) => {
      return {
        seqId: store["Seq No."],
        city: store["City"],
        id: store["ID"],
        label: store["Label"],
        state: store["State"],
      };
    });

    self.postMessage({ data: stores });
  } catch (error) {
    self.postMessage({ error: "Error processing XLSX file: " + error });
  }
};
