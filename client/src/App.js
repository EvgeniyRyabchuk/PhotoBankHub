import logo from './logo.svg';
import './App.css';
import axios from "axios";

function App() {

  const download = () => {
      axios({
          url: 'http://127.0.0.1:8000/api/images/5/variants/33/download', //your url
          method: 'GET',
          responseType: 'blob', // important
          headers: {
              Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiNDc0OGZiZmEwN2FlYTlkY2Q5Y2IxYjExYTMwNWM4ODQ3MzVhOWEyODIxYTJkMDc3YzVkNDI5MTU2ODcxZWRiYjJhZjUwNmFlNGRjZDVjNTkiLCJpYXQiOjE2NzA4NTY0OTMuMzk5OTQ3LCJuYmYiOjE2NzA4NTY0OTMuMzk5OTQ5LCJleHAiOjE2NzIxNTI0OTMuMzk0MDQzLCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.nh1rVNTKyVXLw1R2hDnqtNRLnTky_BoL7cYF3VCB3RS0o0xgNodabt8KIpho-DzpBx4dClqh34iS-LhSDwWOgEk3L1XyOeAjhMc_7lDD1cdlD2sDrzULg7sOQiF2CRnevQs84qaT2v-59JYUcf6bkwZhcLFT7S85mJz0OyccFjTo4HYe-t6mrnXb5nRkBr7K48JBXVEiCcPT7SOSozuDSwzP6wZnxmwdHQ7j5_gSyGR1h8ZqRx1-Wj444Lz10hdivJNCDMLQ8Ws-cdWNPnzqOeOOy0mud1YLlA3JeRP5i-6OKCIVaIyhnpgREsLMEVq4u3S_QFxgyv4C_VWIYj6zT7LgBysmpVlzKW3XCTkGS0b5z3vfEPrVuvBMWOnmS3AgmuNHqxcPHTB0FCUOt9qV5yuITCINqRzQfMhRCaIaNL3Y5Rxso-XmNmE1Z74GJv3SMGJWTKJKVoixckxSjF2Z-gz9yoXxxIf5mLfl2WPoqPFKE-1-N4focDtMMlwFGPY8MFbNNLYk6iEwFGobiE2PiMQMVwGte7-coJ5r6RmAOgndXcMGMoUTtIKxX-sHkbqT9T6z7wbA0YmF5WLYeSFoexY3wNf2HHsWWY55BKrm1d8CEnc5uWhFOQWNeBXUxFBB3a10DxiEjMWrizCeIYFSKpiAEKk0YgOsVyn1SkqSbFY'
          }
      }).then((response) => {
          // create file link in browser's memory
          const href = URL.createObjectURL(response.data);

          // create "a" HTML element with href to file & click
          const link = document.createElement('a');
          link.href = href;
          link.setAttribute('download', '1.png'); //or any other extension
          document.body.appendChild(link);
          link.click();

          // clean up "a" element & remove ObjectURL
          document.body.removeChild(link);
          URL.revokeObjectURL(href);
      });
  }


  return (
    <div className="App">

      <button onClick={() => {
        download();
      }}>
        Download
      </button>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
