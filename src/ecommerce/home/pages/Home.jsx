import {Outlet} from "react-router-dom";
import CommerceAppBar from "../../../share/bars/components/CommerceAppBar";

export default function Home() {
    return (
        <div id='div-home'>
           <div id='div-appbar'>
            <CommerceAppBar/>
           </div>
          <div id="detail">
              <Outlet />
          </div>
      </div>
    );
}