import {Container, Grid, Paper, TextField, Button, Typography, CircularProgress} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useClient} from "../context/ClientContext.ts";
import {useMutation} from "@tanstack/react-query";
import {ClientService} from "../service/ClientService.ts";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const Register = () => {
    const navigate = useNavigate();
    const {client, setClient} = useClient();
    let errorText = ""

    const {mutate, isError, isPending} = useMutation(
        {
            mutationKey: ["registerUser"],
            mutationFn: async () => {
                return await ClientService.registerUser(client);
            },
            onSuccess: () => {
                showSuccess()
                navigate('/')
            },
            onError: (error) => {
                showError(error.message)
            }
        }
    );

    const showSuccess = () => {
        withReactContent(Swal).fire({
            title: <i>Erfolgreich registriert</i>,
            icon: 'success',
            showConfirmButton: true,
        })
    }

    const showError = (message: string) => {
        withReactContent(Swal).fire({
            title: <i>Ein Fehler ist aufgetreten</i>,
            text: message,
            icon: 'error',
            showConfirmButton: true,
        })
    }

    const handleRegister: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        mutate()
    }

    if (isPending) {
        return <>
            <CircularProgress color="inherit"/>
        </>
    }

    if (isError) {
        errorText = "Benutzername oder Passwort fehlerhaft"
    }


    return (
        <Container maxWidth="xs">
            <Paper elevation={3} style={{padding: 20, marginTop: 50}}>
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>
                <Typography color="error">
                    {errorText}
                </Typography>
                <form onSubmit={handleRegister}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                name="username"
                                label="Benutzername"
                                variant="outlined"
                                value={client.username}
                                onChange={(event) => setClient({...client, username: event.target.value})}
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
                                value={client.password}
                                onChange={(event) => setClient({...client, password: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
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
                </form>
            </Paper>
        </Container>
    );
};

export default Register;
