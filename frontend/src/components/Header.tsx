import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import {useClient} from "../context/ClientContext.ts";
import {ClientService} from "../service/ClientService.ts";
import {SaveDTO} from "../model/SaveDTO.ts";
import {useMutation} from "@tanstack/react-query";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {queryClient} from "../api/client.ts";
import {useGame} from "../context/GameContext.ts";

const Header = () => {
    const navigate = useNavigate();
    const {client, setClient} = useClient();
    const {game, setGame} = useGame()

    function handleLogout() {
        setClient({
            username: '',
            password: ''
        });
        setGame({
            balance: 0,
            upgrades: {}
        });
        queryClient.invalidateQueries().then(() => navigate('/'));
    }

    const {mutate} = useMutation(
        {
            mutationKey: ["saveClient"],
            mutationFn: async () => {
                return await handleSave();
            },
            onSuccess: () => {
                showSuccess()
            },
            onError: (error) => {
                showError(error.message)
            }
        }
    )

    const showSuccess = () => {
        withReactContent(Swal).fire({
            title: <i>Erfolgreich gespeichert</i>,
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


    function handleSave() {
        const dto: SaveDTO = {
            balance: game.balance,
            username: client.username,
            upgrades: Object.keys(game.upgrades).map(key => {
                const id = parseInt(key)
                return {
                    upgradeID: id,
                    level: game.upgrades[id]
                }
            })
        };
        return ClientService.saveClient(client, dto)
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar sx={{backgroundColor: '#909090'}}>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Willkommen {client.username}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{marginRight: '20px'}}>
                        Balance: {game.balance}€
                    </Typography>
                    <Button style={{marginRight: '20px'}} color="inherit" onClick={mutate}>Speichern</Button>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;