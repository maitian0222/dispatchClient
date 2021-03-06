import http from '@sinoui/http';

function getCourtList(params?: any) {
  return http.get(`/biz/court/list`, {
    params,
  });
}

function getSaveAndSubmit(params?: any) {
  return http.post(`/biz/dispute/saveAndSubmit`, params);
}
function getBatchSubmit(params?: any) {
  return http.post(`/biz/dispute/submit`, params);
}
function getImport(params?: any) {
  return http.post(`/biz/dispute/import`, params);
}
function deleteDispute(id: any) {
  return http.delete(`/biz/dispute/${id}`);
}

export {
  getCourtList,
  getSaveAndSubmit,
  getBatchSubmit,
  getImport,
  deleteDispute,
};
