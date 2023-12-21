import { Routes, Route } from "react-router-dom";
import withAuth from "./hocs/withAuth";

// Layout
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";

// Pages
import Templates from "./pages/Templates";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import Login from "./pages/Login";

const AppWithAuth = withAuth(AppLayout);

function App() {
  return (
    <Routes>
      <Route element={<AppWithAuth />}>
        <Route index element={<Templates />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
