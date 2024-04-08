import {Container, Typography} from "@mui/material";
import Header from "../components/Header.tsx";

const Home = () => {
    return (
        <>
            <Header/>
            <Container maxWidth="xs" style={{textAlign: "center"}}>
                <Typography variant="h4" gutterBottom>
                    Home
                </Typography>
            </Container>
        </>
    );
};

export default Home;