import Main from "./screens/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserSignup from "./screens/UserSignup";
import UserLogin from "./screens/UserLogin";
import UserPage from "./screens/user/UserPage";
import { Bounce, Flip, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rt={false}
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/usersignup" element={<UserSignup />} />
          <Route exact path="/userlogin" element={<UserLogin />} />
          <Route exact path="/userpage" element={<UserPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
