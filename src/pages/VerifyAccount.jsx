import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Stack, Box, Button, TextField, Typography, Input } from '@mui/material';

const VerifyAccount = () => {
    const location = useLocation();
    const [alias, setAlias] = useState(location.state?.alias || '');
    const [codigo, setCodigo] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/Login');
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
                    backgroundImage: 'url(/images/Verificar.png)',
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
            >
                <Stack
                    spacing={3}
                    alignItems="center"
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "100%",
                            md: "auto",
                            lg: "auto",
                            xl: "auto",
                        },
                    }}
                >
                    <Box>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: {
                                    xs: "2.5rem",
                                    sm: "2rem",
                                    md: "2rem",
                                    lg: "2rem",
                                    xl: "2.8rem",
                                },
                                textAlign: "center",
                            }}
                        >
                            Verifica tu cuenta
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: {
                                    xs: "1rem",
                                    sm: "1rem",
                                    md: "1.2rem",
                                    lg: "1.5rem",
                                    xl: "1.5rem",
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
                            flexDirection: {
                                xs: "column",
                                sm: "column",
                                md: "row",
                                lg: "row",
                                xl: "row",
                            },
                            alignItems: "center",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            gap: 2,
                        }}
                    >
                        <TextField
                            type="text"
                            label="Alias"
                            variant="outlined"
                            value={alias}
                            disabled
                            onChange={(e) => setAlias(e.target.value)}
                            required
                            InputLabelProps={{ required: false }}
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
                                width: { xs: "100%", sm: "100%", md: 250, lg: 250, xl: 255 }
                            }}
                        />
                        <TextField
                            type="number"
                            label="Codigo TOTP"
                            variant="outlined"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                            required
                            InputLabelProps={{ required: false }}
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
                                width: { xs: "100%", sm: "100%", md: 250, lg: 250, xl: 255 }
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: {
                                    xs: "column",
                                    sm: "column",
                                    md: "row",
                                    lg: "row",
                                    xl: "row",
                                },
                                alignItems: "center",
                                marginTop: "1rem",
                                gap: 2,
                                width: "100%",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                disabled={loading}
                                sx={{
                                    fontSize: "1rem",
                                    height: 50,
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "30%",
                                        lg: "25%",
                                        xl: "25%",
                                    },
                                    backgroundColor: "#74c69d",
                                    "&:hover": {
                                        backgroundColor: "#52b788"
                                    }
                                }}
                                disableElevation
                            >
                                {loading ? "Cargando..." : "Verificar"}
                            </Button>
                            <Button
                                variant="contained"
                                component="a"
                                onClick={handleLogin}
                                color="primary"
                                sx={{
                                    fontSize: "1rem",
                                    height: 50,
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "30%",
                                        lg: "20%",
                                        xl: "20%",
                                    },
                                    backgroundColor: "#d8f3dc",
                                    "&:hover": {
                                        backgroundColor: "#b7e4c7",
                                        color: "#000"
                                    }
                                }}
                            > Volver a login
                            </Button>
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </>
    );
};

export default VerifyAccount;
