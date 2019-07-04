import http from '@sinoui/http';

function getNewsQuery(params?: any) {
  return http.get(`/biz/information/query`, params);
}
function getNewsCount(params?: any) {
  return http.get(`/biz/information/count`, params);
}

export { getNewsQuery, getNewsCount };
