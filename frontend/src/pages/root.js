import { Outlet } from "react-router-dom";
import Navbar from "./component/navbar";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default RootLayout;
