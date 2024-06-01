import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import { NavbarContextProvider } from "./context/NavbarContext";
import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import UserRoutes from "./routes/UserRoutes";
import PageNotFound from "./pages/PageNotFound";

document.title = "Laros | Where the gamers connect Easily!";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavbarContextProvider>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/profile/*" element={<UserRoutes />} />
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </NavbarContextProvider>
    </ThemeProvider>
  );
}

export default App;
