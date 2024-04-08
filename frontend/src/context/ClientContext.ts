import {createContext, useContext} from 'react';
import {Client} from "../model/Client";

const initialClientState: Client = {
    username: '',
    password: '',
    balance: 0
};

export const ClientContext = createContext<{
    client: Client;
    setClient: (client: Client) => void;
}>({
    client: initialClientState,
    setClient: (newClient) => {
        console.log(newClient)
        // @ts-ignore
        this.client = newClient
    },
});

const useClient = () => useContext(ClientContext);

export {useClient};