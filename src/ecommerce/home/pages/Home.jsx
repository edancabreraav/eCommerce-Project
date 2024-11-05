import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../../../share/bars/components/CommerceAppBar";

export default function Home() {
  return (
    <div id="div-home">
      {/* <h2>Home Page - eCommerce Project</h2> */}
      <div id="div-appbar">
        <ResponsiveAppBar />
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
}
