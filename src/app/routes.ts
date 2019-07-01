import ResourceManagement from '../page/resource/ResourceList';
import UserList from '../page/user/UserList';
import RoleList from '../page/role/RoleList';
import MaterialList from '../page/material/MaterialList';

const routes = [
  {
    path: '/resource/list',
    component: ResourceManagement,
    title: '资源管理',
  },
  {
    path: '/user/list',
    title: '用户管理',
    component: UserList,
  },
  {
    path: '/role/list',
    title: '角色管理',
    component: RoleList,
  },
  {
    path: '/materialAudit/list',
    title: '律师材料审核',
    component: MaterialList,
  },
];

export default routes;
