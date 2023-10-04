import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { CHAIN_ID } from "../config/constants";
import { useCallback } from "react";

const injectedConnector = new InjectedConnector({
  supportedChainIds: [CHAIN_ID]
})

export const useAuth = () => {
  const { activate, account } = useWeb3React<Web3Provider>()
  const login =  useCallback(async () => {
    const provider = (window).ethereum
    try {
      if (!provider) {
        alert("Please install Metamask or use Wallet Connect!");
        return
      }

      const destinationChainId = await provider.request({ method: 'eth_chainId' })
      const chainIdHex = '0x' + CHAIN_ID.toString(16)
      if (account && destinationChainId === chainIdHex) return // already connected

      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      })

      await provider.request({ method: "eth_requestAccounts" })
      await activate(injectedConnector)
    } catch (error) {
      console.error('Error', error)
    }
  }, [account, activate])

  return { login }
}