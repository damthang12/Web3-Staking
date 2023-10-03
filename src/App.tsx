import React from "react";
import "./App.css";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import StakingController from "./StackingController";

function getLibrary(provider: any) {
    return new ethers.providers.Web3Provider(provider);
}

function App() {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <StakingController />
        </Web3ReactProvider>
    );
}

export default App;
