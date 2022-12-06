import logo from './logo.svg';
import './App.css';
import axios from "axios";

function App() {

  const download = () => {
      axios({
          url: 'http://127.0.0.1:8000/api/image/31/download', //your url
          method: 'GET',
          responseType: 'blob', // important
          headers: {
              Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiYjk0OTExOGM2ZDI1ZDRkODA4MmQyMGMzZDNmYTNkNDA3MWMzOWMzMzhlZWZkOTZjN2YzMzY1YjgxZjNlMjk4ODY1NmVhYzI2MWIzN2NjODUiLCJpYXQiOjE2NzAzMjExODQuNTExMTQ0LCJuYmYiOjE2NzAzMjExODQuNTExMTQ2LCJleHAiOjE2NzE2MTcxODQuNTAxODg4LCJzdWIiOiIxMSIsInNjb3BlcyI6W119.uU-lglIxxFhnqv644wrGHecE_s8oFNrWB3hrDlcrb3UEOVf4XRt8eaPkYRlFmVG2DCOLGC1RcKJSN96CRNfipqckY6j-43D5nQbSUysFvUzWaixT7ASsZ-nOg9YFePnqcXIyg9J3rd_eT5p1PSl4Eavkgf8-GlMsRglmwx4OrRRCLAEmEskv0VgxItOGe_a-oM6_DV84iitFJ28Aw84X64ypvwfKquii-VIcdYZClu_SCEPLSSaJh8-QjcJW-oHbNox6RW7P5liIqiDMnFd0SVEkDkfrJ_376bwpnsQk8rAWBRGnOMuDft094yIUxNjEisnpXO5Oig5oRWNiDFbPcXgu2mDcPRBB8apuR8HQmrlukUZ5ppI72Y-J0y8JVyC3FQOZTvl9xPuxwJSo8-x94OPclF8mCKhN2kmKgJwWRrlpEfl-fh3Tz2vv6Jb-UjnYlaTbRP-sGSeuHn-vcdnJ7Oy9ZuGWXl1IjI0EvUi0e4BWzPi5oPrm3neZrpDAUbPmJHDzazCwlXixX0n7bGNi-zRMM57VatVda-C273_uxLtyWBtG2l2bQFrtfdWPW86YJ5MXfi3o8-8rXxqV-IzHd9IRHsP0FNw8DA1u7QqJqnFMmzIbY-rDSQakLoKco-eVn5OO-jCJGMuXdZeb3ShTy9srP-bcqubkieQmY16rPmk'
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
