import {CircularProgress, Container, Typography} from "@mui/material";
import Header from "../components/Header.tsx";
import ClickUpgradeList from "../components/ClickUpgradeList.tsx";
import IncomeUpgradeList from "../components/IncomeUpgradeList.tsx";
import {useClient} from "../context/ClientContext.ts";
import {UpgradeProvider} from "../context/UpgradeContext.tsx";
import {useQuery} from "@tanstack/react-query";
import {UpgradeService} from "../service/UpgradeService.ts";
import {Upgrade} from "../model/Upgrade.ts";
import Box from "@mui/material/Box";
import icon from "../assets/icon.svg";

const Home = () => {
    const {client, setClient} = useClient();

    const {data, isPending, isError, error, isSuccess} = useQuery(
        {
            queryKey: ["getUpgrades"],
            queryFn: async () => {
                return await UpgradeService.getUpgrades(client) as Upgrade;
            },
        }
    );

    if (isPending) {
        return <>
            <CircularProgress color="inherit"/>
        </>
    }

    if (isError || !isSuccess) {
        return <>
            <Typography>Error: {error?.message}</Typography>
        </>
    }

    const handleClick = () => {
        setClient({...client, balance: client.balance + 1});
    };

    return (
        <UpgradeProvider upgrade={data}>
            <Header/>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Container maxWidth="xs"
                           style={{textAlign: "center", flex: "1", display: "flex", justifyContent: "center"}}>
                    <ClickUpgradeList/>
                </Container>
                <Container maxWidth="xs"
                           style={{textAlign: "center", flex: "1", display: "flex", justifyContent: "center"}}>
                    <Container maxWidth="xs" style={{maxHeight: '1000px', overflowY: 'auto', textAlign: 'center'}}>
                        <Box p={2}>
                            <div style={{marginBottom: '20px'}}>
                                <Typography variant="h4">Balance: {client.balance}€</Typography>
                            </div>
                            <div style={{marginBottom: '10px'}}>
                                <Typography variant="h6" gutterBottom>
                                    Klick Bonus: {0}€
                                </Typography>
                            </div>
                            <div style={{marginBottom: '20px'}}>
                                <Typography variant="h6" gutterBottom>
                                    Passives Einkommen: {0}€
                                </Typography>
                            </div>
                            <div>
                                <img
                                    style={{cursor: 'pointer'}}
                                    onClick={handleClick}
                                    src={icon}
                                    alt="Logo"
                                ></img>
                            </div>
                        </Box>
                    </Container>
                </Container>
                <Container maxWidth="xs"
                           style={{textAlign: "center", flex: "1", display: "flex", justifyContent: "center"}}>
                    <IncomeUpgradeList/>
                </Container>
            </div>
        </UpgradeProvider>
    );
};

export default Home;