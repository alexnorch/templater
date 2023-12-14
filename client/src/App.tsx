import { Routes, Route } from "react-router-dom";

// Layout
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";

// Pages
import DashboardPage from "./pages/Home";
import Templates from "./pages/Templates";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="templates" element={<Templates />} />
        <Route path="templates/:category" element={<Templates />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
