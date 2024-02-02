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

import { Paths } from "./pages/paths";

const AppWithAuth = withAuth(AppLayout);

function App() {
  return (
    <Routes>
      <Route element={<AppWithAuth />}>
        <Route path={Paths.templates} element={<Templates />}>
          <Route path={Paths.templateView} element={<TemplateView />} />
          <Route path={Paths.templateEdit} element={<TemplateEdit />} />
        </Route>
        <Route path={Paths.settings} element={<SettingsLayout />}>
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
      <Route element={<AuthLayout />}>
        <Route path={Paths.register} element={<Register />} />
        <Route path={Paths.login} element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
