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
import TemplateView from "./pages/TemplateView";

const AppWithAuth = withAuth(AppLayout);

function App() {
  return (
    <Routes>
      <Route element={<AppWithAuth />}>
        <Route path="templates" element={<Templates />}>
          <Route path=":templateId" element={<TemplateView />} />
        </Route>
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
