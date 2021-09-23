import { get, post } from './request';

// 获取单日价格
export const getSymbolDayPrice = (params) => get('/frontweb/partner/getSymbolDayPrice', params)
export const submitWithdraw = (params) => post('/frontweb/partner/submitWithdraw', params);