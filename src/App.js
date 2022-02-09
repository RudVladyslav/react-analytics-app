import React from "react";

import Header from "./component/Header";
import {useSelector} from "react-redux";
import {useRoutes} from "./routes";


function App() {
    const {isLoading, isAuth} = useSelector(({auth}) => ({isLoading: auth.isLoading, isAuth: auth.isAuth,}))

    const routes = useRoutes(isAuth, isLoading)

    return (
        <div className="App">
            <Header/>
            {routes}
        </div>
    );
}

export default App;
