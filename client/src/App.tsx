import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import { NavbarContextProvider } from "./context/NavbarContext";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import {
  PrivateRoute,
  AnonymousRoute,
  SetupRoute,
} from "./routes/ProtectedRoutes";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/app/features/auth/authSlice";
import Home from "./components/Home";
import SetupUploadPicture from "./pages/SetupUploadPicture";
import { useLocation } from "react-router-dom";

document.title = "Laros | Where the gamers connect Easily!";

function App() {
  const auth = useSelector(selectCurrentToken);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavbarContextProvider>
        <Routes>
          <Route element={<AnonymousRoute auth={auth} />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          <Route element={<Navbar />}>
            <Route path="/" element={<Home />} />

            <Route element={<PrivateRoute auth={auth} />}>
              <Route path="/upload/avatar" element={<SetupUploadPicture />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </NavbarContextProvider>
    </ThemeProvider>
  );
}

export default App;
