import ResourceManagement from '../page/resource/ResourceList';
import UserList from '../page/user/UserList';
import RoleList from '../page/role/RoleList';
import LawsuitList from '../page/lawsuit/LawsuitList';
import LawsuitCaseEditor from '../page/lawsuit/LawsuitCaseEditor';
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
    path: '/lawsuit/list',
    title: '诉讼管理',
    component: LawsuitList,
  },
  {
    path: '/lawsuit/edit/:id',
    title: '诉讼案件编辑',
    component: LawsuitCaseEditor,
  },
];

export default routes;
