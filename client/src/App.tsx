import { Routes, Route } from "react-router-dom";

import AppLayout from "./layout/AppLayout";

// Pages
import DashboardPage from "./routes/DashboardPage";
import Templates from "./routes/TemplatesPage";
import Register from "./routes/RegisterPage";
import Login from "./routes/LoginPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="templates" element={<Templates />} />
        <Route path="templates/:category" element={<Templates />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
