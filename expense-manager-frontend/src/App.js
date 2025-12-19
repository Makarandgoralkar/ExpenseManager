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
      </Routes>
    </Router>
  );
}

export default App;
