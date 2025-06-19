import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Totp from "./pages/Totp.jsx";
import Account from "./pages/Account.jsx";
import Login from "./pages/Login.jsx";
import VerifyAccount from "./pages/VerifyAccount.jsx";
import Transferencia from "./pages/transfer.jsx";
import RecuperacionTotp from "./pages/recuperacionTotp.jsx";
import Comprobante from "./pages/comprobante.jsx";
import Movimientos from "./pages/movimientos.jsx";
import PerfilUsuario from "./pages/perfilUsuario.jsx";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/totp" element={<Totp />} />
          <Route path="/account" element={<Account />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/recuperacionTotp" element={<RecuperacionTotp />} />
          <Route path="/transfer" element={<Transferencia />} />
          <Route path="/perfilUsuario" element={<PerfilUsuario />} />
          <Route path="/movimientos" element={<Movimientos />} />
          <Route path="/comprobante" element={<Comprobante />} />
        </Routes>
      </Router>
    </ThemeProvider >
  );
}

export default App;
