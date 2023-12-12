import { Outlet } from "react-router-dom";
import Categories from "../components/categories/Categories";

const AppLayout = () => {
  return (
    <main>
      <Categories />

      <div className="container">
        <Outlet />
      </div>
    </main>
  );
};

export default AppLayout;
