import {Outlet} from "react-router-dom";
export default function Home() {
    return (
        <div id='div-home'>
           <h2>Home Page - eCommerce Project</h2>
          <div id="detail">
              <Outlet />
          </div>
      </div>
    );
}