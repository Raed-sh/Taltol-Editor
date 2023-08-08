import { lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout";
import Creator from "./views/Creator";

const Landing = lazy(() => import("./views/Landing"));

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/home"  element={<Landing />} />
          <Route path="/creator" element={<Creator />} />
          <Route
        path="*"
        element={<Navigate to="/creator" replace />}
    />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
