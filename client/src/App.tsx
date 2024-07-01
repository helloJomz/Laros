import { ThemeProvider } from "./components/ThemeProvider";
import MainLayout from "./components/layout/MainLayout";
import { NavbarContextProvider } from "./context/NavbarContext";
import { UserContextProvider } from "./context/UserContext";
import { Routes, Route, useLocation } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { PrivateRoute, AnonymousRoute } from "./routes/ProtectedRoutes";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/app/features/auth/authSlice";
import Home from "./components/Home";
import UploadAvatar from "./pages/UploadAvatar";
import ProfilePage from "./pages/ProfilePage";
import { ProfileContextProvider } from "./context/ProfileContext";

document.title = "Laros | Where the gamers connect Easily!";

function App() {
  const auth = useSelector(selectCurrentToken);
  const { pathname: location } = useLocation();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavbarContextProvider>
        <UserContextProvider>
          <Routes>
            <Route element={<AnonymousRoute auth={auth} />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>

            <Route element={<MainLayout currentLocation={location} />}>
              <Route path="/" element={<Home />} />

              <Route element={<PrivateRoute auth={auth} />}>
                <Route path="/upload/avatar" element={<UploadAvatar />} />
                <Route
                  path="/:displayname"
                  element={
                    <ProfileContextProvider>
                      <ProfilePage />
                    </ProfileContextProvider>
                  }
                />
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </UserContextProvider>
      </NavbarContextProvider>
    </ThemeProvider>
  );
}

export default App;
