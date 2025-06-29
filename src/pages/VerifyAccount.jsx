import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Stack, Box, Button, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useAuth0 } from '@auth0/auth0-react';

const VerifyAccount = () => {
    const location = useLocation();
    const [alias, setAlias] = useState(location.state?.alias || '');
    const [codigo, setCodigo] = useState('');
    const [loading, setLoading] = useState(false);
    const [showCodigo, setShowCodigo] = useState(false);
    const { logout } = useAuth0();
    const navigate = useNavigate();

    const handleToggleShowCodigo = () => {
        setShowCodigo((prev) => !prev);
    };

    const handleRecuperarCodigo = () => {
        navigate('/recuperacionTotp'), { state: { from: "verify-account" } };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            username: alias,
            totpToken: codigo,
        };

        try {
            const verifyResponse = await axios.post('https://raulocoin.onrender.com/api/verify-totp-setup', data);
            const verifyRes = verifyResponse.data;

            if (verifyRes.success) {
                const userResponse = await axios.post('https://raulocoin.onrender.com/api/user-details', data);
                const userRes = userResponse.data;

                if (userRes.success && userRes.user) {
                    localStorage.setItem("userData", JSON.stringify({
                        id: userRes.user.id,
                        name: userRes.user.name,
                        username: userRes.user.username,
                        email: userRes.user.email,
                        balance: userRes.user.balance,
                        isVerified: userRes.user.isVerified,
                        totpVerified: userRes.user.totpVerified,
                    }));
                    navigate('/account', {
                        state: {
                            name: userRes.user.name,
                            username: userRes.user.username,
                            balance: userRes.user.balance,
                        },
                    });
                } else {
                    alert('No se pudieron obtener los datos del usuario.');
                }
            } else {
                alert('Código TOTP incorrecto.');
            }
        } catch (error) {
            alert('Error al verificar el código TOTP.');
        } finally {
            setLoading(false);
            setCodigo("");
        }
    };

    return (
        <>
            <Box
                component="section"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    minWidth: "100vw",
                    backgroundImage: 'linear-gradient(115deg, rgba(0, 0, 0, 0.8), rgba(78, 78, 78, 0.7))',
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    padding: 3
                }}
            >
                <Stack
                    spacing={4}
                    alignItems="center"
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "100%",
                            md: "auto",
                            lg: "auto",
                            xl: "auto",
                        },
                        height: {
                            xs: "100%",
                            sm: "100%",
                            md: "auto",
                            lg: "auto",
                            xl: "auto"
                        },
                        backdropFilter: "blur(30px)",
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        borderRadius: 2,
                        boxShadow: 6,
                        py: 4,
                        px: { xs: 1, sm: 3 },
                        width: { xs: 350, sm: 350, md: 400, lg: 450, xl: 470 }
                    }}
                >
                    <Box>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: {
                                    xs: "1.7rem",
                                    sm: "1.7rem",
                                    md: "1.6rem",
                                    lg: "1.6rem",
                                    xl: "2rem",
                                },
                                textAlign: "center",
                                boxShadow: 6,
                                marginBottom: {
                                    xs: "1rem",
                                    sm: "1rem",
                                    md: "1rem",
                                    lg: "0.7rem",
                                    xl: "0.7rem"
                                }
                            }}
                        >
                            Verifica tu cuenta
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: {
                                    xs: "1.3rem",
                                    sm: "1.3rem",
                                    md: "1.2rem",
                                    lg: "1.3rem",
                                    xl: "1.3rem",
                                },
                                textAlign: "center",
                            }}
                        >
                            ¡Es necesario verificar para continuar!
                        </Typography>
                    </Box>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            gap: 3
                        }}
                    >
                        <TextField
                            type="text"
                            label="Alias"
                            variant="standard"
                            value={alias}
                            onChange={(e) => setAlias(e.target.value)}
                            required
                            InputLabelProps={{ required: false }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleOutlinedIcon style={{ color: "white" }} />
                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                input: { color: "white" },
                                label: { color: "white" },
                                "& label.Mui-focused": { color: "white" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "white",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "white",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "white",
                                    },
                                },
                                width: { xs: 290, sm: 290, md: 360, lg: 370, xl: 370 }
                            }}
                        />
                        <TextField
                            type={showCodigo ? 'password' : 'text'}
                            label="Código TOTP"
                            variant="standard"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                            required
                            InputLabelProps={{ required: false }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyOutlinedIcon sx={{ color: "white" }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleToggleShowCodigo}
                                            edge="end"
                                            sx={{
                                                color: "#ffff",
                                                outline: "focus",
                                                boxShadow: "none",
                                                "&:focus": {
                                                    outline: "none",
                                                    boxShadow: "none"
                                                },
                                                "&:focus-visible": {
                                                    outline: "none",
                                                    boxShadow: "none"
                                                }
                                            }}
                                        >
                                            {showCodigo ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                input: { color: "white" },
                                label: { color: "white" },
                                "& label.Mui-focused": { color: "white" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "white",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "white",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "white",
                                    },
                                },
                                width: { xs: 290, sm: 290, md: 360, lg: 370, xl: 370 }
                            }}
                        />

                        <Stack
                            direction={{ xs: "column", sm: "column", md: "row", lg: "row,", xl: "row" }}
                            sx={{ mt: 2, width: { xs: 290, sm: 290, md: 360, lg: 370, xl: 370 } }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                disabled={loading}
                                sx={{
                                    fontSize: "1rem",
                                    height: 45,
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "50%",
                                        lg: "50%",
                                        xl: "50%",
                                    },
                                    marginRight: {
                                        xs: 0,
                                        sm: 0,
                                        md: "1rem",
                                        lg: "1.5rem",
                                        xl: "1.5rem"
                                    },
                                    marginBottom: {
                                        xs: "1.3rem",
                                        sm: "1.3rem",
                                        md: 0,
                                        lg: 0,
                                        xl: 0
                                    },
                                    color: "white",
                                    backgroundColor: "#2485e9",
                                    "&:hover": {
                                        backgroundColor: "#1f73ca"
                                    },
                                    "&.Mui-disabled": {
                                        backgroundColor: "#1f73ca",
                                        color: "white",
                                    },
                                    boxShadow: 3,
                                    width: { xs: 290, sm: 290, md: 360, lg: 370, xl: 370 }
                                }}
                                disableElevation
                            >
                                {loading ? "Cargando..." : "Verificar"}
                            </Button>
                            <Button
                                variant="outlined"
                                component="a"
                                onClick={handleRecuperarCodigo}
                                color="primary"
                                sx={{
                                    fontSize: "1rem",
                                    height: 45,
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "50%",
                                        lg: "50%",
                                        xl: "50%",
                                    },
                                    color: "white",
                                    "&:hover": {
                                        color: "white",
                                    },
                                    width: { xs: 290, sm: 290, md: 360, lg: 380, xl: 380 }
                                }}
                            > Recuperar TOTP
                            </Button>
                            
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </>
    );
};

export default VerifyAccount;
