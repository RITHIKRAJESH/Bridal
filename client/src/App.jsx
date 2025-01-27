import { Route, Routes } from "react-router-dom";
import AddBridalWearForm from "./admin/addbridalwear"
import 'bootstrap/dist/css/bootstrap.min.css';
import BridalWear from "./admin/viewbridalWear";
import Editbridal from "./admin/editbridal";
import AddJewellery from "./admin/addbridaljewellery";
import ViewBridalJewellery from "./admin/viewbridaljewellery";
import Login from "./user/login";
import Registration from "./user/registration";
import UserHome from "./user/userhome";
import AdminDashboard from "./admin/adminDashboard";
import ViewProduct from "./user/viewproduct";
import ViewJewellery from "./user/viewJewellery";
import Singlejewellery from "./user/singlejewellery";
import Viewcart from "./user/viewcart";

function App() {
  

  return (
    <>
    <Routes>
      {/* User routes */}
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Registration/>}/>
      <Route path="/userhome/*" element={<UserHome/>}/>
      <Route path="/userhome/view-product/:id" element={<ViewProduct/>}/>
      <Route path="/userhome/view-jewellery-user" element={<ViewJewellery/>}/>
      <Route path="/userhome/view-jewellery/:id" element={<Singlejewellery/>}/>
      <Route path="/userhome/view-cart"  element={<Viewcart/>}/>
      {/* Admin routes */}
      <Route path="/admin" element={<AdminDashboard/>}/>
      <Route path="/admin/viewbridal" element={<BridalWear/>}/>
      <Route path="/admin/addbridal" element={<AddBridalWearForm/>}/>
      <Route path="/admin/editbridal/:id" element={<Editbridal/>}/>
      <Route path="/admin/addjewellery" element={<AddJewellery/>}/>
      <Route path="/admin/viewjewellery" element={<ViewBridalJewellery/>}/>
    </Routes>
    </>
  )
}

export default App
