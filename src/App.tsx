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

function App() {
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
