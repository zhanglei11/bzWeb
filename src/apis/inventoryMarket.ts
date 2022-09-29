import request from '@/utils/request';
/**
 * 放料取消
 */
export const cancelStore = (params: any) => {
  return request({
    url: '/inventory/material/cancelStore',
    method: 'POST',
    data: params
  });
};
/**
 * 放料查询通道
 */
export const getChannelStore = (params: any) => {
  return request({
    url: '/inventory/material/getChannelStore',
    method: 'GET',
    params: params
  });
};
  /**
 * 取料取消
 */
export const cancelTake = (params: any) => {
  return request({
    url: '/inventory/material/cancelTake',
    method: 'POST',
    data: params
  });
};
  /**
 * 取料
 */
export const takeMaterial = (params: any) => {
  return request({
    url: '/inventory/material/take',
    method: 'POST',
    data: params
  });
};
  /**
 * 取料查询通道
 */
export const getChannelTake = (params: any) => {
  return request({
    url: '/inventory/material/getChannelTake',
    method: 'POST',
    data: params
  });
};
  /**
 * 尾料查询通道
 */
export const getChannelStoreTail = (params: any) => {
  return request({
    url: '/inventory/material/getChannelStoreTail',
    method: 'POST',
    data: params
  });
};
  /**
 * 尾料取消
 */
export const cancelStoreTail = (params: any) => {
  return request({
    url: '/inventory/material/cancelStoreTail',
    method: 'POST',
    data: params
  });
};


