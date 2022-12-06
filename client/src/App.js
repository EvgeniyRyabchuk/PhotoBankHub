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
              Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiZTE3YjgzMDRhZWJmMWI0M2MyODdkZThlNGVlNjJmOWQxZmI1YjBkZWJhNzY3ZmZlMTdlNjE3YzdkNzZjNzM2ZGNmNDJhMzM2MjlkZjU0ZmMiLCJpYXQiOjE2NzAzNTQzNDUuNTY0NjkzLCJuYmYiOjE2NzAzNTQzNDUuNTY0Njk1LCJleHAiOjE2NzE2NTAzNDUuNTU2MTcxLCJzdWIiOiIxMSIsInNjb3BlcyI6W119.NZ_Cg3WQN5wITdV9r9zQBrknb6b41B41le46STYGjk5iLCEJgxsyN4dOXuuOT4rMD7wwEufPVdsKgTkT8KxVrrgT9F8s2N4_NgpORexojTu6UBBh7k0SDU07USRGe-Nd-FuhqyARXh5LJpeZy11dpeunW0trl3uNBLMqaeqh_XwPwZGjNhDjneZMpGHwYjUGGalUAfhwy3ypK5ykVLBDRB_W7TJga7wY4qwFU6nlUPxAPoOshn5pkCmKjZXM9UHPrPQRMYvzHYzUKkEPBXtsSwxWrzytaK9aS3ivdYdQ8xSDFL0OOIslkNsqllbVfPpxLoWEp3IGCPG90CqU1en1y3i-NGUwqC7h5TZF6wPNUliSwev3wx0UpdcUPUL_jrXA_bJUF_7gnhs0PWtXr8iDzTowTqfUDTFcuoM7R_a0aDWX1jm8aG8vgYTLVU7d6oJ0oFCw2yzEIgAA4Ql36IrgHpEqTsDS8UnahPIprz0_qouh_dvMsIpcorZcsxJKzWwjuVrkW7Q4hDUABL37F3nmOnJFeGF0AaupxKsGJnVUUY1C6lQKGXHGz0pk5FxAtfc9kWqgMOBtLdN8gwjoYp7RZ8qHgQvAEDy5cRksFpBsLQf8ACvO5mZNny6aYub66k951iAkqOctz8PmT7loi7EZFTk7WPG4IN94Jh-lu1x7QWg'
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
