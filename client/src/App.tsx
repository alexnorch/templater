import { Routes, Route, Navigate } from "react-router-dom";
import withAuth from "./hocs/withAuth";

// Wrappers
import { SettingsWrapper, AuthWrapper, AppWrapper } from "./wrappers";

// Settings Pages
import { CategoriesSettings, AttributesSettings, ProfileSettings } from "./pages";

// Pages
import {
  Templates,
  Register,
  Login,
} from "./pages";

import { Paths } from "./pages/paths";

const AppWithAuth = withAuth(AppWrapper);

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppWithAuth />}>
        <Route path={Paths.templates} element={<Templates />} />
        <Route path={Paths.settings} element={<SettingsWrapper />}>
          <Route
            path={Paths.settingsCategories}
            element={<CategoriesSettings />}
          />
          <Route
            path={Paths.settingsAttribute}
            element={<AttributesSettings />}
          />
          <Route
            path={Paths.settingsProfile}
            element={<ProfileSettings />}
          />
        </Route>
      </Route>
      <Route element={<AuthWrapper />}>
        <Route path={Paths.register} element={<Register />} />
        <Route path={Paths.login} element={<Login />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
