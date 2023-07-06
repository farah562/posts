import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { useAuth } from "./hooks/auth-hook";

import AdminHomePage from "./pages/Admin/AdminDashboard";
import LoginPage from "./pages/loginPage";
import { AuthContext } from "./context/auth-context";

function App() {
  const { token, login, logout, userId, user } = useAuth();

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          user: user,
          login: login,
          logout: logout,
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} exact />
            <Route
              path="/admin/dashboard/*"
              element={<AdminHomePage />}
              exact
            />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
