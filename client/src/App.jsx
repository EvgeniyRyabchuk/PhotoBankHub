import {useSelector} from "react-redux";
import {ToastContainer} from "react-toastify";
import Routing from "./routing/index";
import 'react-toastify/dist/ReactToastify.css';
import React, {useEffect} from "react";
import {useAction} from "./hooks/useAction";
import GlobalStyles from "./assets/shared/styles/GlobalStyles";
import {useLocation} from "react-router-dom";


function App() {

    const { profile } = useAction();
    const { pathname, search} = useLocation()
    const { user, isAuth, loading } = useSelector(store => store.user);

    useEffect(() => {
        profile();

    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
      <div className="App">
          <GlobalStyles />
          <ToastContainer position='bottom-left' autoClose={1500} />
          <Routing />
      </div>
    );
}

export default App;
