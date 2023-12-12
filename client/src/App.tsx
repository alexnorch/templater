import { Routes, Route } from "react-router-dom";

import AppLayout from "./layout/AppLayout";

// Pages
import HomePage from "./routes/HomePage";
import CategoryPage from "./routes/CategoryPage";
import Register from "./routes/RegisterPage";
import Login from "./routes/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path=":category" element={<CategoryPage />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
