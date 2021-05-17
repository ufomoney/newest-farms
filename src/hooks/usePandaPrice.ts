import { useCallback, useMemo, useState } from 'react'
import BigNumber from "bignumber.js";

import usePanda from "./usePanda";
import { getMasterChefContract, getPandaPriceLink } from "../panda/utils";

const usePandaPrice = (): BigNumber => {
  const [pndaPrice, setPndaPrice] = useState(undefined);
  const panda = usePanda();
  const masterChefContract = getMasterChefContract(panda);

  const fetchPndaPrice = useCallback(async () => {
    if (!panda) return;

    const fetchedPrice = await getPandaPriceLink(panda, masterChefContract);
    setPndaPrice(fetchedPrice);
  }, [panda]);

  useMemo(() => {
    fetchPndaPrice();
  }, [panda]);

  return pndaPrice;
}

export default usePandaPrice
