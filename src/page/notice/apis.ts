import http from '@sinoui/http';

function getInformation(id: string) {
  return http.get(`/biz/information/${id}`);
}

export { getInformation };
