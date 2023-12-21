import { Routes, Route } from "react-router-dom";
import withAuth from "./hocs/withAuth";

// Layout
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";

// Pages
import DashboardPage from "./pages/Home";
import Templates from "./pages/Templates";
import Register from "./pages/Register";
import Login from "./pages/Login";

const AppWithAuth = withAuth(AppLayout);

function App() {
  return (
    <Routes>
      <Route element={<AppWithAuth />}>
        <Route index element={<Templates />} />
        <Route path="settings" element={<div>Settings</div>} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
