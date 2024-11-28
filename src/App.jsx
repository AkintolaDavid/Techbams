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
            path="/course/:id"
            element={
              <ProtectedRoute>
                <CoursePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
