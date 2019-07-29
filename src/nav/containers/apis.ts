import http from '@sinoui/http';

function getNewsQuery(params?: any) {
  return http.get(`/biz/information/query`, params);
}
function getInformation(id: string) {
  return http.get(`/biz/information/${id}`);
}
function getBatchUpdate(params?: any) {
  return http.put(`/biz/information`, params);
}

export { getNewsQuery, getInformation, getBatchUpdate };
