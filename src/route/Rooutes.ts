import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import DetailPage from "../pages/Detail";
import SettingsPage from "../pages/Settings";

const route = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/detail/:name",
    Component: DetailPage,
  },
  {
    path: "/settings",
    Component: SettingsPage,
  },
]);

export default route;
