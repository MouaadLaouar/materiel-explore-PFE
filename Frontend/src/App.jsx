import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import NavBar from "./Components/NavBar";
// import SignIn from "./Pages/SignIn";
import SignIn from "./Pages/SignIn/SignIn.component";
// import Home from "./Pages/Home";
import Home from "./Pages/Home/Home.component";
// import SignUp from "./Pages/SignUp";
import SignUp from "./Pages/SignUp/SignUp.component"
// import NotFound from "./Pages/NotFound";
import NotFound from "./Pages/NotFound/NotFound.component"
// import Footer from "./Components/Footer/Footer.Component";
import Contact from "./Pages/Contact";
import Dashboard from "./Pages/Dashboard";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="SignIn" element={<SignIn />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
