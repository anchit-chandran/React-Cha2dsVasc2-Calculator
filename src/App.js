import Variables from "./components/Variables";
import logo from './logoTextAC.png'


function App() {
  return (
    <div className="App container">
      <div className="row align-items-center justify-content-center">
        <div className="col-lg-8 col">
          <div className="row">
            <div className="col d-flex my-3 justify-content-center align-items-center">
              <img src={logo} className="logo rounded" alt="AC Logo" />
              <h1 className="text-center">CHA₂DS₂-VASc Score for Atrial Fibrillation Stroke Risk</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Variables />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
