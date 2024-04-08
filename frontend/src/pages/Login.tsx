import {Container, Grid, Paper, TextField, Button, Typography, CircularProgress} from '@mui/material';
import {useClient} from "../context/ClientContext.ts";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {ClientService} from "../service/ClientService.ts";
import {useEffect} from "react";

const Login = () => {
    const {client, setClient} = useClient();
    const navigate = useNavigate();
    let errorText = ""

    const {mutate, data, isError,  isPending, isSuccess} = useMutation(
        {
            mutationKey: ["loginUser"],
            mutationFn: async () => {
                return await ClientService.loginUser(client);
            },
        }
    );

    useEffect(() => {
            if (isSuccess) {
                errorText = ""
                setClient(data)
                navigate('/home')
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
            <Paper elevation={3} style={{padding: 20, marginTop: 50}}>
                <Typography variant="h4" gutterBottom>
                    Login
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
                            Einloggen
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                navigate("/register")
                            }}
                        >
                            Noch keinen Account?
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};


export default Login;