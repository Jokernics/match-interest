import "animate.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import RequireAuth from "./components/shared/RequireAuth/RequireAuth";
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
        element: <RequireAuth><ProfilePage /></RequireAuth>,
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
