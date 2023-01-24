import "animate.css";
import { createBrowserRouter, Navigate, NavLink, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Game from "./pages/ChoisePage/Game/Game";
import MainPage from "./pages/MainPage/MainPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/match",
        element: <Game />,
      },
      {
        path: "*",
        element: <Navigate to={"/"} />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
