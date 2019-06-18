import Form from '../component/Form';
import Table from '../component/Table';
import Tabs from '../component/Tabs';
import ResourceManagement from '../page/resource/ResourceList';
import UserList from '../page/user/UserList';
import RoleList from '../page/role/RoleList';
import FormList from '../page/form/FormList';
import DisputeList from '../page/dispute/DisputeList';
import CourtManagement from '../page/court/CourtList';
import DictionaryManagement from '../page/dictionary/DictionaryList';
import AttachmentCategoryManagement from '../page/attachment/AttachmentList';
import ProsecutionTemplateManagement from '../page/prosecution/ProsecutionList';
import CalendarManagement from '../page/calendar/Calendar';
import Modal from '../component/Modal';
import { Component } from 'react';

const routes = [
  {
    path: '/antd/form',
    title: '表单测试',
    component: Form,
  },
  {
    path: '/antd/table',
    title: '表格测试',
    component: Table,
  },
  {
    path: '/antd/tabs',
    component: Tabs,
  },
  {
    path: '/announcement/list',
    title: '公告列表',
    component: Tabs,
  },
  {
    path: '/announcement/form',
    title: '公告表单',
    component: Form,
  },
  {
    path: '/resource/list',
    component: ResourceManagement,
  },
  {
    path: '/antd/courtManagement',
    component: CourtManagement,
    title: '法院管理',
  },
  {
    path: '/antd/attachmentCategoryManagement',
    component: AttachmentCategoryManagement,
    title: '附件分类管理',
  },
  {
    path: '/antd/dictionaryManagement',
    component: DictionaryManagement,
    title: '字典管理',
  },
  {
    path: '/antd/prosecutionTemplateManagement',
    component: ProsecutionTemplateManagement,
  },
  {
    path: '/calendar/view',
    component: CalendarManagement,
    title: '节假日管理',
  },
  {
    path: '/antd/modal',
    title: '测试modal',
    component: Modal,
  },
  {
    path: '/antd/collapse',
    title: '测试modal',
    component: CalendarManagement,
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
    path: '/form/list',
    title: '表单管理',
    component: FormList,
  },
  {
    path: '/dispute/list',
    title: '纠纷模板管理',
    component: DisputeList,
  },
];

export default routes;
