import NavigationBar from "../components/NavigationBar.jsx";
import {Outlet} from "react-router-dom";
import MyComponent from "../components/Test.jsx";
import DataForm from "../components/Data.jsx";

export default function Root() {
    return (
        <>
            <NavigationBar />
            <main>
                <DataForm />
                {/* <MyComponent /> */}
                <Outlet />
            </main>
        </>
    );
}