import HomePage from "./component/homepage/HomePage";
import Register from "./component/register/Register";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Pay from "./component/register/Pay";
import Success from "./component/register/Success";
function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route exact path="/" element= {<HomePage/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/pay" element={<Pay/>}/>
        <Route exact path="/success" element={<Success/>}/>
      </Routes>
    </Router>
      
    </div>
  )
}

export default App;
