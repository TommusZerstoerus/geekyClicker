import {apiClient} from '../api/client';
import {Client} from "../model/Client.ts";
import {Buffer} from "buffer";
import {SaveDTO} from "../model/SaveDTO.ts";

const registerUser = async (client: Client) => {
    const res = await apiClient.post('/user/register', {
        username: client.username,
        password: client.password
    })
    return res.data
}

const loginUser = async (client: Client) => {
    const credentials = Buffer.from(`${client.username}:${client.password}`).toString('base64')
    const res = await apiClient.post('/user/login', {}, {
        headers: {
            'Authorization': `Basic ${credentials}`
        }
    })
    res.data.password = client.password
    return res.data
}

const saveClient = async (client: Client, saveDTO: SaveDTO) => {
    const credentials = Buffer.from(`${client.username}:${client.password}`).toString('base64')
    const res = await apiClient.post('/user/save', saveDTO, {
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        }
    })
    return res.data
}


export const ClientService = {
    registerUser,
    loginUser,
    saveClient
}