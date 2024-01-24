import { Routes, Route } from "react-router-dom";
import withAuth from "./hocs/withAuth";

// Layout
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
import SettingsLayout from "./layout/SettingsLayout";

// Pages
import Templates from "./pages/Templates";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TemplateView from "./pages/TemplateView";
import TemplateEdit from "./pages/TemplateEdit";

// Settings Pages
import CategoriesSettings from "./pages/settings/CategoriesSettings";
import AttributesSettings from "./pages/settings/AttributesSettings";

const AppWithAuth = withAuth(AppLayout);

function App() {
  return (
    <Routes>
      <Route element={<AppWithAuth />}>
        <Route path="templates" element={<Templates />}>
          <Route path=":templateId" element={<TemplateView />} />
          <Route path=":templateId/edit" element={<TemplateEdit />} />
        </Route>
        <Route path="settings" element={<SettingsLayout />}>
          <Route path="categories" element={<CategoriesSettings />} />
          <Route path="attributes" element={<AttributesSettings />} />
        </Route>
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
