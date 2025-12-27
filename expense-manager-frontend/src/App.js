import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

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
import OAuth2Success from "./pages/OAuth2Success";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

import ScheduledTransactions from "./pages/ScheduledTransactions";
import AddScheduledTransaction from "./pages/AddScheduledTransaction";
import EditScheduledTransaction from "./pages/EditScheduledTransaction";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/oauth2-success" element={<OAuth2Success />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />


        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addtransaction"
          element={
            <ProtectedRoute>
              <AddTransaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditTransaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analysis"
          element={
            <ProtectedRoute>
              <Analysis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile-dashboard"
          element={
            <ProtectedRoute>
              <ProfileDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faq"
          element={
            <ProtectedRoute>
              <Faq />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/day"
          element={
            <ProtectedRoute>
              <Day />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/goPremium"
          element={
            <ProtectedRoute>
              <GoPremium />
            </ProtectedRoute>
          }
        />
        <Route
          path="/day/:date"
          element={
            <ProtectedRoute>
              <Day />
            </ProtectedRoute>
          }
        />

        {/* Scheduled Transactions */}
        <Route
          path="/scheduled-transactions"
          element={
            <ProtectedRoute>
              <ScheduledTransactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-scheduled-transaction"
          element={
            <ProtectedRoute>
              <AddScheduledTransaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-scheduled/:id"
          element={
            <ProtectedRoute>
              <EditScheduledTransaction />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
