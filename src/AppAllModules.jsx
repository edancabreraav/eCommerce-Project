import { RouterProvider } from "react-router-dom";
import router from "./navigation/NaviRoutesCommerce";
import Footer from "./share/footer/components/Footer";

//imports para redux
import { GET_DATA_START } from "./ecommerce/redux/thunks";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function AppAllModules() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GET_DATA_START()).then(() => {
      console.log(
        "<<END-DISPATCH>>: GET_DATA_START se ejecuto de forma correcta"
      );
    });
  }, []);

  return (
    <>
      <div id="div-app">
        {/* <h1>Main App - All Modules</h1> */}
        <RouterProvider router={router} />
        <div id="div-footer">
          <Footer />
        </div>
      </div>
    </>
  );
}
