import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { GuestLayout } from "./components/guestLayout/GuestLayout";
import Home from "./components/guestLayout/Home";
import About from "./components/guestLayout/About";
import Contact from "./components/guestLayout/Contact";
import Register from "./components/guestLayout/Register";
import Login from "./components/guestLayout/Login";
import UserLayout from "./components/userLayout/UserLayout";
import ChangePassword from "./components/userLayout/ChangePassword";
import AdminLay from "./components/adminLayout/AdminLay";
import Services from "./components/guestLayout/Services";
import UserHome from "./components/userLayout/UserHome";
import ContentManagement from "./components/adminLayout/ContentManagement";
import Dashboard from "./components/adminLayout/Dashboard";
import Feedback from "./components/adminLayout/Feedback";
import AllUsers from "./components/adminLayout/AllUsers";
import AllAdmins from "./components/adminLayout/AllAdmins";
import PageNotFound from "./components/PageNotFound";
import { ShopOwnerLayout } from "./components/shopOwnerLayout/ShopOwnerLayout";
import AddOrEditShop from "./components/shopOwnerLayout/AddOrEditShop";
import ShopOwnerDashboard from "./components/shopOwnerLayout/ShopOwnerDashboard";
import { AuthProvider } from "./context/AuthContext";
import AdminApproveShopOwners from "./components/adminLayout/AdminApproveShopOwners";
import BookPage from "./components/userLayout/BookPage";
import UserBookings from "./components/userLayout/UserBookings";
import BookingHistory from "./components/userLayout/BookingHistory";
import History from "./components/shopOwnerLayout/History";
import "leaflet/dist/leaflet.css";
import EditProfile from "./components/EditProfile";
import Allbookings from "./components/adminLayout/Allbookings";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<GuestLayout />}>
            <Route path="home" element={<Home />}></Route>
            <Route index element={<Home />}></Route>
            <Route path="about" element={<About />}></Route>
            <Route path="contact" element={<Contact />}></Route>;
            <Route path="register" element={<Register />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="services" element={<Services />}></Route>
          </Route>

          <Route path="/User" element={<UserLayout />}>
            <Route path="userhome" element={<UserHome />}></Route>
            <Route path="book/:id" element={<BookPage />} />
            <Route path="booking-history" element={<BookingHistory />} />
            <Route path="bookings" element={<UserBookings/>}/>
            <Route path="changepassword" element={<ChangePassword />}></Route>
            <Route path="profile" element={<EditProfile/>}/>
          </Route>

          <Route path="/admin" element={<AdminLay />}>
            <Route path="feedback" element={<Feedback />} />
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="pending_shops" element={<AdminApproveShopOwners />}></Route>
            <Route path="changepassword" element={<ChangePassword />}></Route>
            <Route path="profile" element={<EditProfile/>}/>
            <Route path="contentmanagement" element={<ContentManagement />}></Route>
            <Route path="users" element={<AllUsers />}></Route>
            <Route path="admins" element={<AllAdmins />}></Route>
            <Route path="all-bookings" element={<Allbookings />}></Route>
          </Route>

          <Route path="/shop-owner" element={<ShopOwnerLayout />}>
            <Route index element={<ShopOwnerDashboard />} /> {/* /shop-owner */}
            <Route path="add-shop" element={<AddOrEditShop />} />
            <Route path="bookings" element={<History />} />
            <Route path="changepassword" element={<ChangePassword />}></Route>
            <Route path="profile" element={<EditProfile />} />
          </Route>

          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
