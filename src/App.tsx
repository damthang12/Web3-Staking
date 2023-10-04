import React from "react";
import "./App.css";
import { Web3ReactProvider } from "@web3-react/core";
import StakingController from "./StackingController";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";

function getLibrary(provider: any) {
    return new ethers.providers.Web3Provider(provider);
}
// export const getLibrary = (provider: any): Web3Provider => {
//   const library = new Web3Provider(provider)
//   library.pollingInterval = 12000
//   return library
// }
function App() {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <StakingController />
        </Web3ReactProvider>
    );
}

export default App;
