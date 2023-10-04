import NavigationBar from "../components/NavigationBar.jsx";
import {Outlet} from "react-router-dom";

export default function Root() {
    return (
        <>
            <NavigationBar />
            <main className="container pt-3">
                <Outlet />
            </main>
        </>
    );
}