import { ethers } from 'ethers'
import { RPC_URL, STAKING_CONTRACT_ADDRESS } from "../config/constants";
import contractAbi from "../contractAbi";


export const getContract = (abi: any, address?: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  if (!address) return undefined
  const signerOrProvider = signer ?? new ethers.providers.JsonRpcProvider(RPC_URL)
  return new ethers.Contract(address, abi, signerOrProvider)
}


export const getPreOrderContract = (signer?: ethers.Signer | ethers.providers.Provider) => getContract(contractAbi, STAKING_CONTRACT_ADDRESS, signer)
