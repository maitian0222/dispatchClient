import * as React from 'react';

import {
  Comment,
  Icon,
  Tooltip,
  Avatar,
  List,
  Form,
  Button,
  Input,
} from 'antd';
import * as moment from 'moment';
import * as dayjs from 'dayjs';

moment.locale('zh-cn', {
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split(
    '_',
  ),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'YYYY年MM月DD日',
    LLL: 'YYYY年MM月DD日Ah点mm分',
    LLLL: 'YYYY年MM月DD日ddddAh点mm分',
    l: 'YYYY-M-D',
    ll: 'YYYY年M月D日',
    lll: 'YYYY年M月D日 HH:mm',
    llll: 'YYYY年M月D日dddd HH:mm',
  },
  meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
  meridiemHour: function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
      return hour;
    } else if (meridiem === '下午' || meridiem === '晚上') {
      return hour + 12;
    } else {
      // '中午'
      return hour >= 11 ? hour : hour + 12;
    }
  },
  meridiem: function(hour, minute, isLower) {
    const hm = hour * 100 + minute;
    if (hm < 600) {
      return '凌晨';
    } else if (hm < 900) {
      return '早上';
    } else if (hm < 1130) {
      return '上午';
    } else if (hm < 1230) {
      return '中午';
    } else if (hm < 1800) {
      return '下午';
    } else {
      return '晚上';
    }
  },
  calendar: {
    sameDay: '[今天]LT',
    nextDay: '[明天]LT',
    nextWeek: '[下]ddddLT',
    lastDay: '[昨天]LT',
    lastWeek: '[上]ddddLT',
    sameElse: 'L',
  },
  dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
  ordinal: function(number, period) {
    switch (period) {
      case 'd':
      case 'D':
      case 'DDD':
        return number + '日';
      case 'M':
        return number + '月';
      case 'w':
      case 'W':
        return number + '周';
      default:
        return number;
    }
  },
  relativeTime: {
    future: '%s内',
    past: '%s前',
    s: '几秒',
    ss: '%d秒',
    m: '1分钟',
    mm: '%d分钟',
    h: '1小时',
    hh: '%d小时',
    d: '1天',
    dd: '%d天',
    M: '1个月',
    MM: '%d个月',
    y: '1年',
    yy: '%d年',
  },
  week: {
    dow: 1,
    doy: 4,
  },
});

const data = [
  {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: `We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.`,
    datetime: '2019-06-01',
  },
  {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: `We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.`,
    datetime: '2019-06-05',
  },
];

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <Input.TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

export default class App extends React.Component {
  constructor(props: {}) {
    super(props);
  }

  private getCommment = (item) => {
    return (
      <Comment
        actions={[
          <span key="1">
            <Tooltip title="Like">
              <Icon type="like" theme={'outlined'} onClick={this.like} />
            </Tooltip>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>10</span>
          </span>,
          <span key="2">
            <Tooltip title="Dislike">
              <Icon type="dislike" theme={'filled'} onClick={this.dislike} />
            </Tooltip>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>2</span>
          </span>,
          <span key="3">Reply to</span>,
        ]}
        author={<a>{item.author}</a>}
        avatar={<Avatar src={item.avatar} alt={item.author} />}
        content={<p>{item.content}</p>}
        datetime={
          <Tooltip title={dayjs(item.datetime).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment(item.datetime).fromNow()}</span>
          </Tooltip>
        }
      >
        <Comment
          actions={[
            <span key="1">
              <Tooltip title="Like">
                <Icon type="like" theme={'outlined'} onClick={this.like} />
              </Tooltip>
              <span style={{ paddingLeft: 8, cursor: 'auto' }}>10</span>
            </span>,
            <span key="2">
              <Tooltip title="Dislike">
                <Icon type="dislike" theme={'filled'} onClick={this.dislike} />
              </Tooltip>
              <span style={{ paddingLeft: 8, cursor: 'auto' }}>2</span>
            </span>,
            <span key="3">Reply to</span>,
          ]}
          author={<a>{item.author}</a>}
          avatar={<Avatar src={item.avatar} alt={item.author} />}
          content={<p>{item.content}</p>}
          datetime={
            <Tooltip title={dayjs(item.datetime).format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment(item.datetime).fromNow()}</span>
            </Tooltip>
          }
        />
      </Comment>
    );
  };
  public render() {
    return (
      <div>
        <List
          dataSource={data}
          renderItem={(item) => <li>{this.getCommment(item)}</li>}
        />
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={<Editor />}
        />
      </div>
    );
  }
}
