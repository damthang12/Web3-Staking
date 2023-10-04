import React, { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { useWeb3React } from "@web3-react/core";
import { useStaking } from "./hooks/useStaking";


function StakingController() {
    const { account } = useWeb3React()
    const { login } = useAuth()
    const { onStake } = useStaking()
    const [userBalance, setUserBalance] = useState('')

    const handleStaking = () => {

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
                                    {/*<input*/}
                                    {/*    className="input-container"*/}
                                    {/*    placeholder="Ex: 1000"*/}
                                    {/*    type="number"*/}
                                    {/*    id="number"*/}
                                    {/*    name="number"*/}
                                    {/*    onChange={handleChange}*/}
                                    {/*    value={number}*/}
                                    {/*></input>*/}
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
                                    onClick={login}
                                >
                                    {account ? "Connected!!" : "Connect"}
                                </button>

                                <button
                                    className="button-connect"
                                    onClick={handleStaking}
                                >
                                    Stake
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default StakingController;
