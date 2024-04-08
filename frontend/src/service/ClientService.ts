import {apiClient} from '../api/client';
import {Client} from "../model/Client.ts";
import {Buffer} from "buffer";

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

export const ClientService = {
    registerUser,
    loginUser
}