import { useStakingContract } from "./useContract";
import { useCallback } from "react";

export const useStaking = () => {
  const stakingContract = useStakingContract()

  const onStake = useCallback(async (address: string, amount: string) => {
    if (!stakingContract) return
    const tx = await stakingContract.stake(address, { value: amount })
    return tx.wait()
  }, [stakingContract])

  return { onStake }
}