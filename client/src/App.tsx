import { Routes, Route } from "react-router-dom";

import AppLayout from "./layout/AppLayout";

// Pages
import HomePage from "./routes/HomePage";
import Templates from "./routes/Templates";
import Register from "./routes/RegisterPage";
import Login from "./routes/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path=":category" element={<Templates />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
