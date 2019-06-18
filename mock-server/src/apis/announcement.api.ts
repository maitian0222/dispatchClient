import { Express } from 'express';

export default function setup(app: Express) {
  // 根据id获取详情
  app.get(`/oa/info/notice/:id`, (req, res) => {
    const recordId = 0;
    const record =
      0 % 2 === 0
        ? {
            title: '关于开展XX活动的文本公告',
            tip:
              '1.完整信息=信息标题+信息内容，信息内容中不必重复标题句，填写标题句末尾处不加标点符号。\n2.主要内容部分不超过800字。\n3.请参照《每日工作动态》栏目设置，恰当、完整地选择信息所属栏目。\n4.对于不宜全行发布的信息，请报送时注意选择恰当的阅知范围。\n5.如报送信息的密级为开密A，请与信息调研处直接联系，不通过本系统报送。国密级信息请从正规纪要渠道报送。',
            content: '公告内容',
            type: '1',
          }
        : {
            title: '关于开展XX活动的链接公告',
            url: 'http://www.baidu.com',
            type: '2',
          };
    res.json({
      record: {
        id: `${recordId}`,
        createDeptName: '信息科技局',
        ...record,
      },
      permissions: {
        planIsUpdate: 'Y',
        isSubmit: 'Y',
        isApply: 'Y',
        planRole: 'CY',
      },
      dictionaries: {
        meetingPlace: [
          {
            num: '1',
            name: '长安街',
          },
          {
            num: '2',
            name: '阜外',
          },
          {
            num: '3',
            name: '核建大厦',
          },
        ],
        jjcd: [
          {
            num: '1',
            name: '一般',
          },
          {
            num: '2',
            name: '急',
          },
          {
            num: '3',
            name: '特急',
          },
        ],
        hyxq: [
          {
            name: '速录服务',
            num: '1',
            sonName: 'slfw',
            children: [
              {
                num: '13',
                name: '现场',
              },
              {
                num: '14',
                name: '录音',
              },
            ],
          },
          {
            name: '电话会议',
            num: '2',
          },
          {
            name: '视频会议',
            num: 'sphyId',
            sonName: 'sphy',
          },
          {
            name: '无纸化会议',
            num: '4',
          },
          {
            name: '投影',
            num: '5',
          },
          {
            name: '其他',
            num: 'qtId',
          },
        ],
        gztzjjcd: [
          {
            num: '1',
            name: '一般',
          },
          {
            num: '2',
            name: '急',
          },
          {
            num: '3',
            name: '特急',
          },
          {
            num: '4',
            name: '缓',
          },
        ],
        fylz: [
          {
            num: '1',
            name: '一般',
          },
          {
            num: '2',
            name: '急',
          },
          {
            num: '3',
            name: '特急',
          },
          {
            num: '4',
            name: '缓',
          },
        ],
        swjjcd: [
          {
            num: '1',
            name: '一般',
          },
          {
            num: '2',
            name: '急',
          },
          {
            num: '3',
            name: '特急',
          },
          {
            num: '4',
            name: '限时',
          },
        ],
        hylx: [
          {
            num: '1',
            name: '行长专题办公会',
          },
          {
            num: '2',
            name: '行长办公会',
          },
          {
            num: '3',
            name: '党委会',
          },
          {
            num: '4',
            name: '董事会',
          },
        ],
        ybswjjcd: [
          {
            num: '1',
            name: '一般',
          },
          {
            num: '2',
            name: '急',
          },
          {
            num: '3',
            name: '限时',
          },
          {
            num: '4',
            name: '特急',
          },
          {
            num: '5',
            name: '特提',
          },
        ],
        bmqx: [
          {
            num: '1',
            name: '6个月',
          },
          {
            num: '2',
            name: '1年',
          },
          {
            num: '3',
            name: '2年',
          },
          {
            num: '4',
            name: '3年',
          },
          {
            num: '5',
            name: '4年',
          },
          {
            num: '6',
            name: '5年',
          },
          {
            num: '7',
            name: '10年',
          },
          {
            num: '8',
            name: '30年',
          },
          {
            num: '9',
            name: '长期',
          },
        ],
        mj: [
          {
            num: '1',
            name: '一般',
          },
          {
            num: '2',
            name: '开密B',
          },
          {
            num: '3',
            name: '开密C',
          },
        ],
        tzlb: [
          {
            num: '1',
            name: '会议通知',
          },
          {
            num: '2',
            name: '培训通知',
          },
          {
            num: '3',
            name: '工作简报',
          },
        ],
      },
      issuAgencyName: [
        {
          id: '1',
          title: '国家开发银行',
        },
        {
          id: '2',
          title: '共青团公家开发银行委员会',
        },
        {
          id: '3',
          title: '国家开发银行工会',
        },
        {
          id: '4',
          title: '中共国家开发银行纪律检查委员会',
        },
        {
          id: '5',
          title: '中共国家开发银行委员会',
        },
        {
          id: '6',
          title: '国家开发银行保密委员会',
        },
        {
          id: '7',
          title: '办公厅',
        },
      ],
      workflowTypeId: '12345xxx',
      gwlxCh: '行发文',
      cjsj: '2018-05-04',
      fbbm: '人事局',
      cjrdh: '123456789',
      cjr: '创建人张三',
      gwlxEn: 'tjsw',
      zbdw: '办公厅',
      zbdwId: '1234',
      showNotifyButton: true,
      ideas: [
        {
          ideaName: 'officeIdea',
          title: '办公厅负责人',
          ideas: [
            {
              type: 'message',
              id: '1',
              userName: '冯丹',
              time: '2018-05-07 12:12:12',
              message: ['同意', '不同意'],
            },
            {
              type: 'message',
              id: '2',
              userName: '冯丹',
              time: '2018-05-07 12:12:12',
              message: '同意',
            },
          ],
        },
      ],
      ldps: {
        psfbbm: [
          {
            fbbmId: '001005',
            fbbm: '政研室',
          },
          {
            fbbmId: '001084',
            fbbm: '规划局',
            fbrq: '2018-10-20',
          },
          {
            fbbmId: '001006',
            fbbm: '发展局',
            fbrq: '2018-10-20',
          },
          {
            fbbmId: '001083',
            fbbm: '市场局',
          },
        ],
        pssm: [],
      },
    });
  });
  /**
   * 	获取待办信息公告列表
   */
  app.get('/oa/info/notice', (req, res) => {
    const { page = 0, size = 10 } = req.query;
    const pageNo = parseInt(page, 10);

    const items = [];

    for (let i = 0; i < 45; i++) {
      items.push({
        id: `${i + 1}`,
        title: `关于开展XX活动的公告${i + 1}`,
        conent: i % 2 === 0 ? `1.公告内容\n2.公告内容： 全行参与${i + 1}` : '',
        type: i % 2 === 0 ? '1' : '2',
        url: i % 2 === 0 ? '' : 'http://www.baidu.com',
        cjsj: '2018-11-28',
        fbsj: i % 2 === 0 ? '' : '2018-11-30',
        cjr: i % 2 === 0 ? '张三' : '李四',
        status: i % 2 === 0 ? '待发布' : '已发布',
        jjcd: '特急',
      });
    }
    res.json({
      totalElements: items.length,
      number: pageNo,
      totalPages: Math.ceil(items.length / size),
      size,
      content: items.slice(pageNo * size, (pageNo + 1) * size),
      planIds: '1,2,3,4',
    });
  });

  // ===========================信息采集==============================
  app.get('/oa/info/collection', (req, res) => {
    // req.query 获取问号请求参数 req.params 获取路径参数  req.body获取请求体
    const { page = 0, size = 15 } = req.query;
    const pageNo = parseInt(page, 10);

    const items = [];

    for (let i = 1; i < 30; i++) {
      const children = [1, 2, 3, 4, 5].map((item) => ({
        id: `${i}`,
        ndyf: `2018-11-0${i}`,
        title: `甘肃分行向唐仁健省长汇报工作。${i}`,
        bskw: i % 2 === 0 ? `每日工作动态` : '今日要情',
        bslm: i % 2 === 0 ? `领导活动` : '综合信息',
        bsdw: i % 2 === 0 ? '科技局' : '发展局',
        bsr: i % 2 === 0 ? '张三' : '李四',
      }));

      items.push({
        id: `${i + 1}`,
        ndyf: `2018-11-0${i}`,
        title: `2017年12月31日，蔡东副行长赴财会局、营管局、科技局慰问年结工作人员。${i +
          1}`,
        bskw: i % 2 === 0 ? `每日工作动态` : '今日要情',
        bslm: i % 2 === 0 ? `领导活动` : '综合信息',
        bsdw: i % 2 === 0 ? '科技局' : '发展局',
        bsr: i % 2 === 0 ? '张三' : '李四',
        children,
      });
    }
    res.json({
      totalElements: items.length,
      number: pageNo,
      totalPages: Math.ceil(items.length / size),
      size,
      content: items.slice(pageNo * size, (pageNo + 1) * size),
      planIds: '1,2,3,4',
    });
  });

  app.post('/oa/info/announcement/post/save', (req, res) => {
    res.json();
  });

  // ===========================信息采集==============================
  app.get('/oa/info/announcement/periodicalColumn', (req, res) => {
    const contents = [
      {
        name: '每日工作动态',
        createTime: '2019-01-14 14:22:37',
        type: '1',
        infoType: 'short',
        infoTypeName: null,
        createUserName: null,
        status: '1',
        id: '4028d186684b00df01684b06b45d0005',
        submissionContent: '报送',
        sendContent: '发送',
        defaultPeriodicalScopeId: '4028d186683c49c901683c56ae720002',
        sname: '普通',
        setId: '4028d186684b00df01684b06b45c0004',
        list: [
          {
            name: '专题报道',
            createTime: '2019-01-15 01:23:25',
            type: '2',
            infoType: 'long',
            parentId: '4028d186684b00df01684b06b45c0004',
            infoTypeName: null,
            createUserName: null,
            status: '1',
            id: 'ff80808168500fb60168502dcd210001',
            setId: 'ff80808168500fb60168502dcd170000',
            showInSubmission: false,
          },
        ],
      },
      {
        name: '国家开发银行专报',
        createTime: '2019-01-15 17:42:17',
        type: '1',
        infoType: 'long',
        infoTypeName: null,
        createUserName: null,
        status: '1',
        id: '4028d1866850caea016850e42c8d0003',
        submissionContent: '报送',
        sendContent: '发送',
        defaultPeriodicalScopeId: '4028d186683c49c901683c56ae720002',
        sname: '普通',
        setId: '4028d1866850caea016850e420cb0002',
        list: [],
      },
      {
        name: '今日要情123',
        createTime: '2019-01-15 17:17:30',
        type: '1',
        infoType: 'short',
        infoTypeName: null,
        createUserName: null,
        status: '1',
        id: '4028d1866850caea016850cd2c490001',
        submissionContent: '报送',
        sendContent: '发送',
        defaultPeriodicalScopeId: '4028d186683c49c901683c56d76a0003',
        sname: '行级',
        setId: '4028d1866850caea016850cd2c370000',
        list: [],
      },
      {
        name: '国家开发银行简报',
        createTime: '2019-01-15 17:46:33',
        type: '1',
        infoType: null,
        infoTypeName: null,
        createUserName: null,
        status: '1',
        id: '4028d1866850caea016850e82b040005',
        submissionContent: null,
        sendContent: null,
        defaultPeriodicalScopeId: null,
        sname: null,
        setId: '4028d1866850caea016850e82b020004',
        list: [],
      },
      {
        name: '专题报道',
        createTime: '2019-01-15 17:57:59',
        type: '1',
        infoType: 'long',
        infoTypeName: null,
        createUserName: null,
        status: '1',
        id: '4028d1866850caea016850f23ad40009',
        submissionContent: null,
        sendContent: null,
        defaultPeriodicalScopeId: null,
        sname: null,
        setId: '4028d1866850caea016850f23ad40008',
        list: [],
      },
    ];

    res.json({
      content: contents,
    });
  });
}
