import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LoginRegister from "./login/Login";
import AdminHome from "./adminHome/adminHome"
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/AdminHome" element={<AdminHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
