import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
