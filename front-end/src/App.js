import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedPages from "./components/ProtectedPages";
import { useSelector } from "react-redux";
import Spinners from "./components/Spinners";
import Profile from "./pages/Profile";




function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
    {loading && <Spinners/> }
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedPages> <Home /> </ProtectedPages>} />
          <Route path="/profile" element={<ProtectedPages> <Profile /> </ProtectedPages>} />
          {/* <Route path="/login" element={<Login/>}/> */}
          <Route path="/login" element={<Login redirect="/" />} />
          <Route path="/register" element={<Register />} />
         
        </Routes>
      </BrowserRouter> 
    </div>

  );
}

export default App;
