import React, { useState } from "react";
import { ethers } from "ethers";
import Web3 from "web3";
import stakingContractAbi from './contractAbi'

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

function StakingController() {
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState<string>();
    const [number, setNumber] = useState("");
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const handleChange = (event: any) => {
        setNumber(event.target.value);
    };
    const connectWalletHandler = () => {
        if (window.ethereum) {
            provider.send("eth_requestAccounts", []).then(async () => {
                await accountChangedHandler(provider.getSigner());
            });
        } else {
            // setErrorMessage("Please Install Metamask!!!");
            console.log("Please Install Metamask");
        }
    };

    const accountChangedHandler = async (newAccount: any) => {
        const address = await newAccount.getAddress();
        setDefaultAccount(address);
        const balance = await newAccount.getBalance();
        const convertBalance = web3.utils.fromWei(balance, "ether");

        setUserBalance(convertBalance);
        await getUserBalance(address);
        console.log(getFromContract);
    };
    const getUserBalance = async (address: any) => {
        const balance = await provider.getBalance(address, "latest");
    };

    // Get the contract address
    const contractAddress = "0xaB7a043B7BEEc9A00EB649CdC93310aDB2c22E52";

    // Create an instance of the contract
    const contract = new web3.eth.Contract(stakingContractAbi, contractAddress);
    console.log(contract);

    async function getCurrentAccount() {
        const accounts = await web3.eth.getAccounts();
        return accounts[0];
    }

    async function getInputNumber() {
        const amountWei = web3.utils.toWei(number, "ether");
        return amountWei;
    }

    async function getFromContract() {
        const account = await getCurrentAccount();
        const amount = await getInputNumber();

        const stack = await contract.methods["stake"](
            "0x90386996f314342Fb8CdC2bd672F751Da4184a1e"
        ).send({ from: amount });
        console.log(stack);
    }

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
                                        id="number"
                                        name="number"
                                        onChange={handleChange}
                                        value={number}
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
                                    onClick={connectWalletHandler}
                                >
                                    {defaultAccount ? "Connected!!" : "Connect"}
                                </button>

                                <button
                                    className="button-connect"
                                    onClick={getFromContract}
                                ></button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default StakingController;
