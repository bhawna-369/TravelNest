import { Route, Routes } from "react-router-dom";
import { Navbar1 } from "./component/Navbar/navbar";
import { Home } from "./pages/Home/home";
import { Login } from "./pages/login/login";
import { Destination} from "./pages/Destination/destination"
import { Plantrip } from "./pages/plantrip/plantrip";
import  Review  from "./pages/reviews/review";
import  {Contact} from "./pages/contact/contact"
import { Pagenotfound } from "./pages/notfound/pagenotFound";
// import Blog from "./pages/Blog/Blog"
// import CreateBlog from "./pages/Blog/CreateBlog";
import Blogging from "./pages/Blog/Blogging";
import Footer from './component/Footer/Footer';
// import Layout from "./layout/mainlayout.jsx/layout";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
const hideFooter =
    location.pathname.toLowerCase() === "/login" ||
    !["/", "/about", "/contact", "/review", "/destination", "/plantrip", "/login"]
      .includes(location.pathname.toLowerCase());
  return (
    <>
    <Navbar1/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Blog" element={<Blogging />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Review" element={<Review />} />
        <Route path="/Destination" element={<Destination />} />
        <Route path="/Plantrip" element={<Plantrip />} />
        <Route path="/*" element={<Pagenotfound />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      
      {!hideFooter && <Footer />}
    </>
  );
}

export default App;
