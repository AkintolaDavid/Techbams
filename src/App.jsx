import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Landing from "./Landing";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import VerifyOTP from "./auth/SignupverifyOtp";
import ForgotPassword from "./auth/ForgotPassword";
import PasswordVerifyOTP from "./auth/PasswordVerifyOtp";
import ResetPassword from "./auth/Resetpassword";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home";
import CoursePage from "./CoursePage";
import SectionPage from "./SectionPage";
import SectionDetails from "./SectionDetails";
import AdminPage from "./Adminpage";
import SigninAdmin from "./auth/SigninAdmin";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import ContactUsElite from "./Contact";
function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          {/* Main routes */}
          <Route path="/" element={<Landing />} />

          {/* Auth routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verifyOtp" element={<VerifyOTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<PasswordVerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/contact" element={<ContactUsElite />} />
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
            path="/adminpage"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/:id"
            element={
              <ProtectedRoute>
                <CoursePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/:id/sections/:sectionIndex"
            element={
              <ProtectedRoute>
                <SectionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/:id/sections/:sectionIndex/details/:detailsIndex"
            element={
              <ProtectedRoute>
                <SectionDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedAdminRoute>
                <AdminPage />
              </ProtectedAdminRoute>
            }
          />
          <Route path="/signinadmin" element={<SigninAdmin />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
