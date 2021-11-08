import {atom, useRecoilState} from "recoil";
import {api, env} from "../constant/etherscan";
import {optionsContractAddress} from "../constant/contract";
import {useEffect} from "react";
import fetcher from "../utils/fetcher";

const apiKey = process.env.REACT_APP_ETHERSCAN_APIKEY5

export const optionsSellLogListAtom = atom({
  key: "fetch-optionsSellLogList::status",
  default: [],
})

const useFetchOptionsSellLogList = () => {
  const [logsList, setLogsList] = useRecoilState(optionsSellLogListAtom)
  const address = ( env === "mainnet" ) ?  optionsContractAddress["mainnet"] : optionsContractAddress["rinkeby"]
  const topic = "0xb69e24112cb4483e933dc3bda2d474e8d511e1d7058a983fe98a7d5d78fb9743"

  useEffect(() => {
    fetchAllTx()
  },[])

  async function fetchTxList(startblock = "0",
                             endblock = "latest") {
    const res = await fetcher(api + "api?module=logs&action=getLogs&fromBlock=" + startblock
      + "&toBlock=" + endblock
      + "&address=" + address
      + "&topic0=" + topic
      + "&apiKey=" + apiKey)
    return res.result
  }

  async function fetchAllTx() {
    let blockHigh = 0
    let res: never[] = []

    const sleep = (ms: number) => {
      return new Promise(resolve => setTimeout(resolve, ms))
    }

    while(res.length % 1000 === 0 ){
      let request
      request = await fetchTxList(String(blockHigh), "latest")
      if (request.length !== 0){
        blockHigh = Number(request[request.length - 1].blockNumber) + 1
      }
      res = res.concat(request)
      await sleep(500);
    }
    setLogsList(res)
  }
  return { logsList }
}

export default useFetchOptionsSellLogList