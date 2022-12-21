import './App.css';
import ImageService from "./services/ImageService";
import {Provider} from "react-redux";
import {store} from "./store";
import {ToastContainer} from "react-toastify";
import Routing from "./routing/routing";
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from "react";
import {useAction} from "./hooks/useAction";


function App() {
  return (
    <div className="App">
        <ToastContainer position='bottom-left' autoClose={1500} />
        <Provider store={store}>
            <button onClick={() => {
                ImageService.download(1,5)
            }}>
                Download
            </button>

            <Routing />
        </Provider>
    </div>
  );
}

export default App;
