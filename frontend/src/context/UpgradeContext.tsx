import React, {createContext, useContext, useState} from 'react';
import {Upgrade} from "../model/Upgrade.ts";

const initialUpgradeState: Upgrade = {
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
};

export const UpgradeContext = createContext<{
    upgrade: Upgrade;
    setUpgrade: (upgrade: Upgrade) => void;
}>({
    upgrade: initialUpgradeState,
    setUpgrade: (newUpgrade) => {
        // @ts-ignore
        this.upgrade = newUpgrade
    },
});

type UpgradeProviderProps = React.PropsWithChildren<{}>

export const UpgradeProvider: React.FC<UpgradeProviderProps> = ({children}) => {
    const [upgrade, setUpgrade] = useState({
        username: "",
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

    return <UpgradeContext.Provider value={{upgrade, setUpgrade}}>
        {children}
    </UpgradeContext.Provider>
}

const useUpgrade = () => useContext(UpgradeContext);

export {useUpgrade};