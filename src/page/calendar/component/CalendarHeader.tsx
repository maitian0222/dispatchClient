import React, { useState, useEffect } from 'react';
import { Select, Form } from 'antd';
import http from '@sinoui/http';
import { Moment } from 'moment';
interface Props {
  value: Moment;
  courtId: string;
  onChange: (date: Moment) => void;
  onChangeCourt: (date: Moment, value: string) => void;
}
export default function CalendarHeader({
  value,
  onChange,
  courtId,
  onChangeCourt,
}: Props) {
  const [courtList, setCourtList] = useState([]);

  useEffect(() => {
    // 初始化法院列表
    http.get('/dispute/court').then((result) => {
      setCourtList(result);
      onChangeCourt(value, result[0].id);
    });
  }, []);

  const start = 0;
  const end = 12;
  const monthOptions = [];

  const current = value.clone();
  const localeData = value.localeData();
  const months = [];
  for (let i = 0; i < 12; i++) {
    current.month(i);
    months.push(localeData.monthsShort(current));
  }

  for (let index = start; index < end; index++) {
    monthOptions.push(
      <Select.Option className="month-item" key={`${index}`}>
        {months[index]}
      </Select.Option>,
    );
  }
  const month = value.month();

  const year = value.year();
  const options = [];
  for (let i = year - 10; i < year + 10; i += 1) {
    options.push(
      <Select.Option key={i} value={i} className="year-item">
        {i}
      </Select.Option>,
    );
  }

  return (
    <div style={{ padding: 10 }}>
      <div style={{ display: 'flex', height: '32px' }}>
        <Form layout="horizontal" style={{ flex: 1 }}>
          <Form.Item>
            <label style={{ color: 'rgba(0, 0, 0, 0.85)', margin: '0 5px' }}>
              法院:
            </label>
            <Select
              value={courtId}
              style={{ maxWidth: '400px' }}
              onChange={(id) => onChangeCourt(value, id)}
            >
              {courtList.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>

        <div
          style={{
            width: '300px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Select
            dropdownMatchSelectWidth={false}
            onChange={(newYear) => {
              const now = value.clone().year(newYear);
              onChange(now);
            }}
            value={String(year)}
            style={{ marginRight: '10px' }}
          >
            {options}
          </Select>
          <Select
            dropdownMatchSelectWidth={false}
            value={String(month)}
            onChange={(selectedMonth) => {
              const newValue = value.clone();
              newValue.month(parseInt(selectedMonth, 10));
              onChange(newValue);
            }}
          >
            {monthOptions}
          </Select>
        </div>
      </div>
    </div>
  );
}
