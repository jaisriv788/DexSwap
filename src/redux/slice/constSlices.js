import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routerAddress: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  factoryAddress: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
  usdtAddress: "0x55d398326f99059fF775485246999027B3197955",
  rpc_one: "https://bsc-dataseed.binance.org/",
};

const constSlice = createSlice({
  name: "router",
  initialState,
  reducers: {},
});

// export const {  } = modalSlice.actions;
export default constSlice.reducer;
