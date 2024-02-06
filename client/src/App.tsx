import { Routes, Route, Navigate } from "react-router-dom";
import withAuth from "./hocs/withAuth";

// Wrappers
import AppWrapper from "./wrappers/AppWrapper";
import AuthWrapper from "./wrappers/AuthWrapper";
import SettingsWrapper from "./wrappers/SettingsWrapper";

// Pages
import Templates from "./pages/Templates";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TemplateView from "./pages/TemplateView";
import TemplateEdit from "./pages/TemplateEdit";

// Settings Pages
import CategoriesSettings from "./pages/settings/CategoriesSettings";
import AttributesSettings from "./pages/settings/AttributesSettings";

import { Paths } from "./pages/paths";

const AppWithAuth = withAuth(AppWrapper);

function App() {
  return (
    <Routes>
      <Route element={<AppWithAuth />}>
        <Route path={Paths.templates} element={<Templates />}>
          <Route path={Paths.templateView} element={<TemplateView />} />
          <Route path={Paths.templateEdit} element={<TemplateEdit />} />
        </Route>
        <Route path={Paths.settings} element={<SettingsWrapper />}>
          <Route
            path={Paths.settingsCategories}
            element={<CategoriesSettings />}
          />
          <Route
            path={Paths.settingsAttribute}
            element={<AttributesSettings />}
          />
        </Route>
      </Route>
      <Route element={<AuthWrapper />}>
        <Route path={Paths.register} element={<Register />} />
        <Route path={Paths.login} element={<Login />} />
      </Route>
      <Route path="*" element={<Navigate to="/templates" />} />
    </Routes>
  );
}

export default App;
