import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Layout from "./container/Layout";
import Charts from "./pages/Charts";
import Planning from "./pages/Planning";
import SKUs from "./pages/SKU";
import Stores from "./pages/Stores";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
