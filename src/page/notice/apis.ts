import http from '@sinoui/http';

function getInformation(id: string) {
  return http.get(`/biz/information/${id}`);
}
function getNewsQuery(params?: any) {
  return http.get(`/biz/information/query`, params);
}

export { getInformation, getNewsQuery };
