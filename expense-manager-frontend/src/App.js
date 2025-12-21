import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddTransaction from "./pages/AddTransaction";
import Transactions from "./pages/Transactions";
import EditTransaction from "./pages/EditTransaction";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Analysis from "./pages/Analysis";
import ProfileDashboard from "./pages/ProfileDashboard";
import Faq from "./pages/Faq";
import About from "./pages/About";
import Day from "./pages/Day";
import Calendar from "./pages/Calendar";
import GoPremium from "./pages/GoPremium";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addtransaction" element={<AddTransaction />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/edit/:id" element={<EditTransaction />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/profile-dashboard" element={<ProfileDashboard />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/about" element={<About />} />
        <Route path="/day" element={<Day />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/goPremium" element={<GoPremium />} />
        <Route path="/day/:date" element={<Day />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
