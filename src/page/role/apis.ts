import http from '@sinoui/http';

function getUserTree(params?: any) {
  return http.get(`/dispute/userTree`, {
    params,
  });
}
function getResourcesTree(params?: any) {
  return http.get(`/dispute/resourcesTree`, {
    params,
  });
}
function getMenuTree(params?: any) {
  return http.get(`/admin/menu`, {
    params,
  });
}
function getRoleIdToResources(roleId?: string) {
  return http.get(`/admin/role/menu/${roleId}`);
}

export { getUserTree, getResourcesTree, getMenuTree, getRoleIdToResources };
