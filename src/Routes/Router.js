import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Favorite from "../components/Favorite";

function Router() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorite" element={<Favorite />} />
            </Routes>
        </div >
    );
}

export default Router;