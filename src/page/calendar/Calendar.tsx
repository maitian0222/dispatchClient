import React, { useState } from 'react';
import { Calendar, Badge, Modal, Select, Form } from 'antd';
import CalendarHeader from './component/CalendarHeader';
import http from '@sinoui/http';
import StopInfo from './types/StopInfoType';
import moment, { Moment } from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

// 动态渲染日历中的每个单元格 增加停用标识
function dateCellRender(date: Moment, stopDates) {
  const dateStr = date.format('YYYY-MM-DD');
  const isStop =
    stopDates.findIndex((item: StopInfo) => item.dateTime === dateStr) === -1
      ? false
      : true;
  return <Badge color={isStop ? 'red' : ''} text={isStop && '停用'} />;
}

export default function TestCalendar() {
  const [stopDates, setStopDates] = useState([]);
  const [courtId, setCourtId] = useState('');

  // 所选法院改变或日期改变后更新数据
  const initDateCell = (date: Moment, selectCourId: string = courtId) => {
    // 如果同月则不更新
    initStopList(date, selectCourId);
  };

  const initStopList = (date: Moment, selectCourId: string = courtId) => {
    const dateStr = date.format('YYYY-MM');
    // 根据日期和律师id获取该月的停用情况
    http
      .get('/biz/calendar/court', {
        params: {
          courtId: selectCourId,
          dateTime: dateStr,
        },
      })
      .then((result) => {
        if (result && result.content) {
          setStopDates(result.content);
        }
      });
  };

  // 修改某天的停用状态
  const updateDateCell = (date: Moment) => {
    // tslint:disable-next-line:no-any
    const dateStr = date.format('YYYY-MM-DD');
    const updateItem = stopDates.find(
      (item: StopInfo) => item.dateTime === dateStr,
    );
    const isStop = updateItem ? true : false; // updateItem.id 不为undefined 说明已经停用
    if (isStop) {
      // 删除停用
      http.delete(`/biz/calendar/${updateItem.id}`).then((result) => {
        // 重新获取停用列表
        initStopList(date);
      });
    } else {
      // 新增停用
      http
        .post('/biz/calendar', {
          times: date.format('YYYY-MM-DD hh:mm:ss'),
          courtId,
        })
        .then((result) => {
          // 重新获取停用列表
          initStopList(date);
        });
    }
  };

  // 重新选择法院后获取当前法院下的数据
  const onChangeCourt = (date: Moment, id: string) => {
    setCourtId(id);
    initDateCell(date, id);
  };

  return (
    <Calendar
      dateCellRender={(date) => dateCellRender(date, stopDates)}
      onSelect={updateDateCell}
      headerRender={({ value, onChange }) => (
        <CalendarHeader
          value={value}
          onChange={(date: Moment) => {
            onChange(date);
            initDateCell(date);
          }}
          initDateCell={initDateCell}
          courtId={courtId}
          onChangeCourt={onChangeCourt}
        />
      )}
    />
  );
}
