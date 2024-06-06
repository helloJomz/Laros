import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import { NavbarContextProvider } from "./context/NavbarContext";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Test from "./pages/test";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { PrivateRoute, AnonymousRoute } from "./routes/ProtectedRoutes";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/app/features/auth/authSlice";
import Home from "./components/Home";

document.title = "Laros | Where the gamers connect Easily!";

function App() {
  const auth = useSelector(selectCurrentToken);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavbarContextProvider>
        <Routes>
          <Route element={<Navbar />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<AnonymousRoute auth={auth} />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          <Route element={<PrivateRoute auth={auth} />}>
            <Route element={<Navbar />}>
              <Route path="/test" element={<Test />} />
            </Route>
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </NavbarContextProvider>
    </ThemeProvider>
  );
}

export default App;
