export const loadXLSXFileWithWorker = <T>(
  sheetName: string
): Promise<{ data: T[]; headers: string[] }> => {
  return new Promise((resolve, reject) => {
    // Move async function outside Promise executor
    const fetchAndProcessFile = async () => {
      try {
        // Fetch the XLSX file
        const response = await fetch("/assets/data.xlsx");
        if (!response.ok) throw new Error("Failed to fetch XLSX file");

        // Convert the response to ArrayBuffer
        const arrayBuffer = await response.arrayBuffer();

        const worker = new Worker(
          new URL("@/workers/xlsxWorker.ts", import.meta.url),
          {
            type: "module",
          }
        );

        worker.onmessage = (event) => {
          if (event.data.error) {
            reject(event.data.error);
          } else {
            resolve({ data: event.data.data, headers: event.data.headers });
          }
          worker.terminate();
        };

        worker.onerror = (error) => {
          reject("Worker error: " + error.message);
          worker.terminate();
        };

        // Pass the fetched ArrayBuffer to the worker
        worker.postMessage({ file: arrayBuffer, sheetName });
      } catch (error) {
        reject("Error loading XLSX file: " + error);
      }
    };

    // Call the async function
    fetchAndProcessFile();
  });
};
