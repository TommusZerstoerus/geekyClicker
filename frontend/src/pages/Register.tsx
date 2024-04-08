
import {Container, Grid, Paper, TextField, Button, Typography, CircularProgress} from '@mui/material';
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {useClient} from "../context/ClientContext.ts";
import {useMutation} from "@tanstack/react-query";
import {ClientService} from "../service/ClientService.ts";

const Register = () => {
    const navigate = useNavigate();
    const {client, setClient} = useClient();
    let errorText = ""

    const {mutate, isError,  isPending, isSuccess} = useMutation(
        {
            mutationKey: ["registerUser"],
            mutationFn: async () => {
                return await ClientService.registerUser(client);
            },
        }
    );

    useEffect(() => {
            if (isSuccess) {
                errorText = ""
                navigate('/')
            }
        },
        [isSuccess, navigate, setClient])

    if (isPending) {
        return <>
            <CircularProgress color="inherit"/>
        </>
    }

    if(isError) {
        errorText = "Benutzername oder Passwort fehlerhaft"
    }


    return (
        <Container maxWidth="xs">
            <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>
                <Typography color="error">
                    {errorText}
                </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                name="username"
                                label="Benutzername"
                                variant="outlined"
                                onChange={(value) => setClient({...client, username: value.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="password"
                                name="password"
                                label="Passwort"
                                type="password"
                                variant="outlined"
                                onChange={(value) => setClient({...client, password: value.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    mutate()
                                }}
                            >
                                Registrieren
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => navigate('/')}
                            >
                                Bereits einen Account? Einloggen
                            </Button>
                        </Grid>
                    </Grid>
            </Paper>
        </Container>
    );
};

export default Register;
