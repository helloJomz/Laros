import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import { NavbarContextProvider } from "./context/NavbarContext";

document.title = "GGEZ | Where the gamers connect Easily!";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavbarContextProvider>
        <Navbar />
      </NavbarContextProvider>
    </ThemeProvider>
  );
}

export default App;
