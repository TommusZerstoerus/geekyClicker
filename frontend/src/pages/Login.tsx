import {Container, Grid, Paper, TextField, Button, Typography, CircularProgress} from '@mui/material';
import {useClient} from "../context/ClientContext.ts";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {ClientService} from "../service/ClientService.ts";

const Login = () => {
    const {client, setClient} = useClient();
    const navigate = useNavigate();
    let errorText = ""

    const {mutate, isError, isPending} = useMutation(
        {
            mutationKey: ["loginUser"],
            mutationFn: async () => {
                return await ClientService.loginUser(client);
            },
            onSuccess: (data) => {
                setClient(data)
                navigate('/home')
            }
        }
    );

    const handleLogin: React.FormEventHandler<HTMLFormElement> = (e) => {
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
                    Login
                </Typography>
                <Typography color="error">
                    {errorText}
                </Typography>
                <form onSubmit={handleLogin}>
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
                                Einloggen
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => navigate('/register')}
                            >
                                Noch keinen Account? Registrieren
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};


export default Login;