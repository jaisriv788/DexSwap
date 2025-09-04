import doge from "../assets/tokens/doge.png";
import usdt from "../assets/tokens/usdt.svg";
import floki from "../assets/tokens/floki.svg";
import dai from "../assets/tokens/dai.svg";

export const tokens = [
  {
    symbol: "DOGE",
    name: "Dogecoin",
    icon: doge,
    address: "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
    decimals: 8,
  },
  {
    symbol: "FLOKI",
    name: "Floki",
    icon: floki,
    address: "0xfb5B838b6cfEEdC2873aB27866079AC55363D37E",
    decimals: 9,
  },
  {
    symbol: "USDT",
    name: "Tether",
    icon: usdt,
    address: "0x55d398326f99059fF775485246999027B3197955",
    decimals: 18,
  },
  {
    symbol: "DAI",
    name: "Dai",
    icon: dai,
    address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
    decimals: 18,
  },
];

export const pairs = [
  {
    symbolA: "USDT",
    tokenA: "0x55d398326f99059fF775485246999027B3197955",
    decimalsA: 18,
    iconA: usdt,
    symbolB: "DOGE",
    tokenB: "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
    decimalsB: 8,
    iconB: doge,
  },
  {
    symbolA: "FLOKI",
    tokenA: "0xfb5B838b6cfEEdC2873aB27866079AC55363D37E",
    decimalsA: 9,
    iconA: floki,
    symbolB: "DOGE",
    tokenB: "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
    decimalsB: 8,
    iconB: doge,
  },
  {
    symbolA: "FLOKI",
    tokenA: "0xfb5B838b6cfEEdC2873aB27866079AC55363D37E",
    decimalsA: 9,
    iconA: floki,
    symbolB: "USDT",
    tokenB: "0x55d398326f99059fF775485246999027B3197955",
    decimalsB: 18,
    iconB: usdt,
  },
  {
    symbolA: "DAI",
    tokenA: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
    decimalsA: 18,
    iconA: dai,
    symbolB: "USDT",
    tokenB: "0x55d398326f99059fF775485246999027B3197955",
    decimalsB: 18,
    iconB: usdt,
  },
  {
    symbolA: "DAI",
    tokenA: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
    decimalsA: 18,
    iconA: dai,
    symbolB: "DOGE",
    tokenB: "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
    decimalsB: 8,
    iconB: doge,
  },
  {
    symbolA: "DAI",
    tokenA: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
    decimalsA: 18,
    iconA: dai,
    symbolB: "FLOKI",
    tokenB: "0xfb5B838b6cfEEdC2873aB27866079AC55363D37E",
    decimalsB: 9,
    iconB: floki,
  },
];
