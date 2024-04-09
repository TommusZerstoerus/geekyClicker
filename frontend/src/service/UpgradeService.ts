import {apiClient} from "../api/client.ts";
import {Upgrade} from "../model/Upgrade.ts";
import {Buffer} from "buffer";
import {Client} from "../model/Client.ts";

const getUpgrades = async (client: Client) => {
    const credentials = Buffer.from(`${client.username}:${client.password}`).toString('base64')
    const res = await apiClient.get('/upgrade/getUpgrade', {
        headers: {
            'Authorization': `Basic ${credentials}`
        }
    })
    return res.data
}

const updateUpgrade = async (upgrade: Upgrade, client: Client) => {
    const credentials = Buffer.from(`${client.username}:${client.password}`).toString('base64')
    const res = await apiClient.post('/upgrade/updateUpgrade', {upgrade}, {
        headers: {
            'Authorization': `Basic ${credentials}`
        }
    })
    return res.data

}

export const UpgradeService = {
    getUpgrades,
    updateUpgrade
}