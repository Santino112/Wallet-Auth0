import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Totp from "./pages/Totp.jsx";
import Account from "./pages/Account.jsx";
import Login from "./pages/Login.jsx";
import VerifyAccount from "./pages/VerifyAccount.jsx";
import Transferencia from "./pages/transfer.jsx";
import RecuperacionTotp from "./pages/recuperacionTotp.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from '@mui/material';
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/totp" element={<Totp />} />
          <Route path="/account" element={<Account />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/recuperacionTotp" element={<RecuperacionTotp />} />
          <Route path="/transfer" element={<Transferencia />} />
        </Routes>
      </Router>
    </ThemeProvider >
  );
}

export default App;
