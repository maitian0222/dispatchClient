import { Express } from 'express';

export default function setup(app: Express) {
  app.get(`/dispute/menu/list`, (req, res) => {
    res.json([
      {
        path: '/resource/list',
        menuId: '0',
        menuName: '资源管理',
        orderNum: '3',
        parentId: '0',
        type: '0',
        icon: 'branches',
      },
      {
        path: '/antd/courtManagement',
        menuId: '1',
        menuName: '法院管理',
        orderNum: '3',
        parentId: '0',
        type: '0',
        icon: 'branches',
      },

      {
        path: '/calendar/view',
        menuId: '2',
        menuName: '节假日管理',
        orderNum: '3',
        parentId: '0',
        type: '0',
        icon: 'branches',
      },
      {
        path: '/antd/attachmentCategoryManagement',
        menuId: '3',
        menuName: '附件分类管理',
        orderNum: '3',
        parentId: '0',
        type: '0',
        icon: 'branches',
      },
      {
        path: '/antd/prosecutionTemplateManagement',
        menuId: '4',
        menuName: '诉状模板管理',
        orderNum: '3',
        parentId: '0',
        type: '0',
        icon: 'branches',
      },
      {
        path: '/antd/dictionaryManagement',
        menuId: '5',
        menuName: '字典管理',
        orderNum: '3',
        parentId: '0',
        type: '0',
        icon: 'branches',
      },
      {
        path: '/antd/modal',
        menuId: '6',
        menuName: '测试modal',
        orderNum: '3',
        parentId: '0',
        type: '0',
        icon: 'branches',
      },
      // {
      //   path: '/antd/collapse',
      //   menuId: '0',
      //   menuName: 'collapse手风琴',
      //   orderNum: '3',
      //   resourceId: '0246',
      //   resoureTypeId: '2',
      //   resoureTypeName: '模块',
      //   superResourceId: '0',
      //   icon: 'branches',
      // },
      {
        path: '/user/list',
        menuId: '7',
        menuName: '用户管理',
        orderNum: '3',
        parentId: '0',
        type: '0',
        icon: 'user',
      },
      {
        path: '/role/list',
        menuId: '8',
        menuName: '角色管理',
        orderNum: '3',
        parentId: '0',
        type: '0',
        icon: 'usergroup-add',
      },
      {
        path: '/form/list',
        menuId: '9',
        menuName: '表单管理',
        orderNum: '3',
        parentId: '0',
        type: '0',
        icon: 'form',
      },
      {
        path: '/dispute/list',
        menuId: '10',
        menuName: '纠纷模板管理',
        orderNum: '3',
        parentId: '0',
        type: '0',
        icon: 'solution',
      },
    ]);
  });

  app.get(`/dispute/tree`, (req, res) => {
    res.json([
      {
        title: '国家开发银行',
        menuId: '001',
        children: [
          { title: '赵欢', menuId: 'A001100', isLeaf: true },
          {
            title: '办公厅',
            menuId: '100',
          },
          {
            title: '评审局',
            menuId: '101',
          },
        ],
      },
    ]);
  });

  app.get(`/dispute/tree/childNode`, (req, res) => {
    res.json([
      { title: '公文管理处', menuId: `100001` },
      { title: '信息调研处', menuId: `101001` },
      { title: '秘书', menuId: `101003`, isLeaf: true },
      { title: '公文管理处', menuId: `100001` },
      { title: '信息调研处', menuId: `101001` },
      { title: '秘书', menuId: `101003`, isLeaf: true },
    ]);
  });

  app.get(`/dispute/tree/search`, (req, res) => {
    res.json([
      { title: '公文管理处', menuId: `100001` },
      { title: '信息调研处', menuId: `101001` },
      { title: '秘书', menuId: `101003`, isLeaf: true },
      { title: '公文管理处', menuId: `100001` },
      { title: '信息调研处', menuId: `101001` },
      { title: '秘书', menuId: `101003`, isLeaf: true },
    ]);
  });

  app.get(`/dispute/test/promise1`, (req, res) => {
    res.json({
      menuId: '1',
      ecmId: 'ecmId1',
    });
  });
  app.get(`/dispute/test/promise2`, (req, res) => {
    res.json({
      menuId: '2',
      ecmId: 'ecmId2',
    });
  });
}
