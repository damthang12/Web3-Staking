import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { getPreOrderContract } from "../utils/contract";

export const useStakingContract = () => {
  const { library } = useWeb3React()
  return useMemo( () => {
    return getPreOrderContract(library?.getSigner())}, [library]
  )
}