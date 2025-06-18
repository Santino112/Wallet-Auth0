import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Stack, Typography, Accordion, AccordionDetails, AccordionSummary, TextField, Menu, MenuItem, ListItemIcon, Divider } from '@mui/material';

const Comprobante = () => {
    


    return (
        <Box
            component="section"
            sx={{
                minHeight: "100vh",
                minWidth: "100vw",
                backgroundImage: 'linear-gradient(115deg, rgba(0, 0, 0, 0.8), rgba(78, 78, 78, 0.7)), url(/images/fondo2.jpg)',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                px: { xs: 2, sm: 2 }
            }}
        >
            <Stack
                spacing={5}
                sx={{
                    width: "auto",
                    height: {
                        xs: "100%",
                        sm: "100%",
                        md: "auto",
                        lg: "auto",
                        xl: "auto",
                    },
                    backdropFilter: "blur(30px)",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    boxShadow: 6,
                    borderRadius: 2,
                    py: 5,
                    px: { xs: 2, sm: 4 }
                }}
            >
                <Stack spacing={4} direction="column" sx={{
                    width: { xs: 350, sm: 350, md: 400, lg: 650, xl: 650  },
                    height: {
                        xs: "100%",
                        sm: "100%",
                        md: "auto",
                        lg: "auto",
                        xl: "auto",
                    },
                    backgroundColor: "rgba(255, 255, 255, 0.77)",
                }}>
                    Hola
                </Stack>
            </Stack>
        </Box>
    )
}

export default Comprobante;