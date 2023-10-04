import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root.jsx";
import CrashByCountryGraphicView from "./components/views/CrashByCountryGraphicView.jsx";
import Home from "./components/views/Home.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                element: <Root />,
                children: [
                    {
                        element: <Home/>,
                        path: "/"
                    },
                    {
                        element: <CrashByCountryGraphicView/>,
                        path: "/graphic/1"
                    }
                ]
            }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);