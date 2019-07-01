import http from '@sinoui/http';

function getCourtList(params?: any) {
  return http.get(`/biz/court/list`, {
    params,
  });
}

function getSaveAndSubmit(params?: any) {
  return http.post(`/biz/dispute/saveAndSubmit`, {
    params,
  });
}

export { getCourtList, getSaveAndSubmit };
