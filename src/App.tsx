import React, { useState } from "react";
import "./App.css";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

function getLibrary(provider: any) {
    return new ethers.providers.Web3Provider(provider);
}

function Web3() {
    const Web3 = require("web3");
    // const web3 = new Web3(
    //     new Web3.providers.HttpProvider("http://localhost:8545")
    // );
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [status, setStatus] = useState(null);

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const connectwalletHandler = () => {
        if (window.ethereum) {
            provider.send("eth_requestAccounts", []).then(async () => {
                await accountChangedHandler(provider.getSigner());
            });
        } else {
            // setErrorMessage("Please Install Metamask!!!");
            console.log("Please Install Metamask");
        }
    };

    const myContractAbi = [
        {
            inputs: [],
            name: "exit",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "address",
                    name: "val",
                    type: "address",
                },
            ],
            name: "Exited",
            type: "event",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "val",
                    type: "address",
                },
            ],
            name: "stake",
            outputs: [],
            stateMutability: "payable",
            type: "function",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "address",
                    name: "del",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "address",
                    name: "val",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
            ],
            name: "Staked",
            type: "event",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "val",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
            ],
            name: "unstake",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "address",
                    name: "del",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "address",
                    name: "val",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
            ],
            name: "Unstaked",
            type: "event",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "val",
                    type: "address",
                },
            ],
            name: "withdrawlReward",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "address",
                    name: "del",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "address",
                    name: "val",
                    type: "address",
                },
            ],
            name: "WithdrawlReward",
            type: "event",
        },
    ] as const;

    const myContract = new Web3.eth.Contract(
        myContractAbi,
        "0xaB7a043B7BEEc9A00EB649CdC93310aDB2c22E52"
    );

    const accountChangedHandler = async (newAccount: any) => {
        const address = await newAccount.getAddress();
        setDefaultAccount(address);
        const balance = await newAccount.getBalance();
        const convertBalance = Web3.fromWei(balance, "ether");
        setUserBalance(convertBalance);
        await getuserBalance(address);

        console.log(myContract.balanceOf(address).toNumber());
    };
    const getuserBalance = async (address: any) => {
        const balance = await provider.getBalance(address, "latest");
    };

    return (
        <div className="App">
            <header className="App-header">
                <div className="Waraper">
                    <div className="Waraper-container">
                        <div className="Container">
                            <div className="Staking">Staking Calculator</div>
                            <div className="text-container">
                                <div className="text-base">Your Balance:</div>
                                <div className="text-waraper">
                                    <span className="balance">
                                        {userBalance}
                                    </span>
                                    <span className="balance">U2U</span>
                                </div>
                            </div>
                            <div>
                                <div className="Staking-amount">
                                    <div className="text-base">
                                        Staking amount
                                    </div>
                                    <input
                                        className="input-container"
                                        placeholder="Ex: 1000"
                                        type="number"
                                    ></input>
                                </div>
                            </div>
                            <div className="percen-container">
                                <button className="button-base">25%</button>
                                <button className="button-base">50%</button>
                                <button className="button-base">75%</button>
                                <button className="button-base">100%</button>
                            </div>
                            <div>
                                <div className="Staking-amount">
                                    <div className="text-base">Validator</div>
                                </div>
                                <div></div>
                            </div>

                            <div className="button-connect-waraper">
                                <button
                                    className="button-connect"
                                    onClick={connectwalletHandler}
                                >
                                    {defaultAccount ? "Connected!!" : "Connect"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

function App() {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Web3 />
        </Web3ReactProvider>
    );
}

export default App;
