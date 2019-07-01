import ResourceManagement from '../page/resource/ResourceList';
import UserList from '../page/user/UserList';
import RoleList from '../page/role/RoleList';
import ContactList from '../page/contact/ContactList';
import EntanglementList from '../page/entanglement/EntanglementList';

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
    path: '/contact/list',
    title: '联系人管理',
    component: ContactList,
  },
  {
    path: '/entanglement/list',
    title: '纠纷管理',
    component: EntanglementList,
  },
];

export default routes;
