// 更新Current Open Short Positions(ETH)
import {atomFamily, selectorFamily} from "recoil";
import {futuresTxListAtom} from "./index";
import {Block} from "../app";
import {web3} from "../../provider";

export const currentOpenShortPositionsAtom = atomFamily({
  key: "futures-curOpenShortPositions::value",
  default: selectorFamily({
    key: "futures-curOpenShortPositions::default",
    get: () => ({get}) => {
      const txList = get(futuresTxListAtom)
      return updateCurrentOpenShortPositionDCU(txList)
    }
  })
})

const updateCurrentOpenShortPositionDCU = (txList: Block[]) => {
  let currentOpenShortPositions = 0

  txList.forEach((block) => {
    const func = block.input.slice(0,10)
    if (func === "0x15ee0aad") {
      // buy(address tokenAddress, uint256 lever, bool orientation, uint256 dcuAmount)
      const parameters = web3.eth.abi.decodeParameters(["address", "uint256", "bool", "uint256"], block.input.slice(10))
      if (!parameters[2]) {
        currentOpenShortPositions += Number(web3.utils.fromWei(parameters[3]))
      }
    }
    if (func === "0x6214f36a") {
      // buyDirect(uint256 index, uint256 fortAmount)
      const parameters = web3.eth.abi.decodeParameters(["uint256", "uint256"], block.input.slice(10))
      if (Number(parameters[0]) > 5) {
        currentOpenShortPositions += Number(web3.utils.fromWei(parameters[1]))
      }
    }
    if (func === "0xd79875eb") {
      // sell(uint256 amount, uint256 sellPrice)
      const parameters = web3.eth.abi.decodeParameters(["uint256", "uint256"], block.input.slice(10))
      if (Number(parameters[0]) > 5) {
        currentOpenShortPositions -= Number(web3.utils.fromWei(parameters[1]))
      }
    }
  })
  return currentOpenShortPositions
}
