import {Container, Grid, Paper, TextField, Button, Typography, CircularProgress} from '@mui/material';
import {useClient} from "../context/ClientContext.ts";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {ClientService} from "../service/ClientService.ts";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const Login = () => {
    const {client, setClient} = useClient();
    const navigate = useNavigate();

    const {mutate, isPending} = useMutation(
        {
            mutationKey: ["loginUser"],
            mutationFn: async () => {
                return await ClientService.loginUser(client);
            },
            onSuccess: (data) => {
                setClient(data)
                navigate('/home')
            },
            onError: (error) => {
                showError(error.message)
            }
        }
    );

    const showError = (message: string) => {
        withReactContent(Swal).fire({
            title: <i>Ein Fehler ist aufgetreten</i>,
            text: message,
            icon: 'error',
            showConfirmButton: true,
        })
    }

    const handleLogin: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        mutate()
    }


    if (isPending) {
        return <>
            <CircularProgress color="inherit"/>
        </>
    }

    return (
        <Container maxWidth="xs">
            <Typography sx={{textAlign: 'center', mt: 5}} variant="h2">GeekyClicker</Typography>
            <Paper elevation={3} style={{padding: 20, marginTop: 50, borderRadius: 10}}>
                <Typography variant="h4" gutterBottom>
                    Login
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