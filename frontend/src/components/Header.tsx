import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import {useClient} from "../context/ClientContext.ts";
import {useUpgrade} from "../context/UpgradeContext.tsx";
import {ClientService} from "../service/ClientService.ts";
import {SaveDTO} from "../model/SaveDTO.ts";
import {useMutation} from "@tanstack/react-query";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {queryClient} from "../api/client.ts";

const Header = () => {
    const navigate = useNavigate();
    const {client, setClient} = useClient();
    const {upgrade, setUpgrade} = useUpgrade()

    function handleLogout() {
        setClient({
            username: '',
            password: '',
            balance: 0
        });
        setUpgrade({
            username: '',
            click1upgrade: 0,
            click2upgrade: 0,
            click3upgrade: 0,
            click4upgrade: 0,
            click5upgrade: 0,
            income1upgrade: 0,
            income2upgrade: 0,
            income3upgrade: 0,
            income4upgrade: 0,
            income5upgrade: 0
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
            balance: client.balance,
            username: client.username,
            click1upgrade: upgrade.click1upgrade,
            click2upgrade: upgrade.click2upgrade,
            click3upgrade: upgrade.click3upgrade,
            click4upgrade: upgrade.click4upgrade,
            click5upgrade: upgrade.click5upgrade,
            income1upgrade: upgrade.income1upgrade,
            income2upgrade: upgrade.income2upgrade,
            income3upgrade: upgrade.income3upgrade,
            income4upgrade: upgrade.income4upgrade,
            income5upgrade: upgrade.income5upgrade
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
                        Balance: {client.balance}€
                    </Typography>
                    <Button style={{marginRight: '20px'}} color="inherit" onClick={mutate}>Speichern</Button>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;