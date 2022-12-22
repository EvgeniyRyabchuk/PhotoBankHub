import './App.css';
import ImageService from "./services/ImageService";
import {Provider, useSelector} from "react-redux";
import {store} from "./store";
import {ToastContainer} from "react-toastify";
import Routing from "./routing/routing";
import 'react-toastify/dist/ReactToastify.css';
import React, {useEffect} from "react";
import {useAction} from "./hooks/useAction";


function App() {

    const { profile } = useAction();
    const { user, isAuth, loading } = useSelector(store => store.user);

    useEffect(() => {
        profile();
    }, []);


  return (
    <div className="App">
        <ToastContainer position='bottom-left' autoClose={1500} />

            <button onClick={() => {
                ImageService.download(1,5)
            }}>
                Download
            </button>

            <Routing />
    </div>
  );
}

export default App;
