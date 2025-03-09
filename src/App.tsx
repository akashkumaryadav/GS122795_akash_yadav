import Layout from "./container/Layout";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Stores from "./pages/Stores";
import SKUs from "./pages/SKU";
import Planning from "./pages/Planning";
import Charts from "./pages/Charts";
import React from "react";
import { loadXLSXFileWithWorker } from "./service/xlsxService";

function App() {
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const storesFromXLSX = await loadXLSXFileWithWorker();
        console.log(storesFromXLSX);
      } catch (error) {
        console.error("Failed to load XLSX:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/stores" />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/skus" element={<SKUs />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/charts" element={<Charts />} />
          <Route
            path="*"
            element={<div className="p-6">404 - Page Not Found</div>}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
