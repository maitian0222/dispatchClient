import React from 'react';
import { Tabs } from 'antd';
import Table from './Table';
const { TabPane } = Tabs;
interface State {
  activeTabKey: string;
}
interface Tab {
  name: string;
  id: string;
}
const tabList = [
  {
    name: '待办刊物',
    id: '1',
  },
  {
    name: '刊物管理',
    id: '2',
  },
  {
    name: '公告管理',
    id: '3',
  },
];
export default class SlidingTabsDemo extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      activeTabKey: '1',
    };
  }

  public onChangeTab = (value: string) => {
    this.setState({
      activeTabKey: value,
    });
  };
  public render() {
    return (
      <div>
        <Tabs
          activeKey={this.state.activeTabKey}
          tabPosition="top"
          onTabClick={this.onChangeTab}
        >
          {tabList.map((tab: Tab, index) => (
            <TabPane tab={tab.name} key={tab.id}>
              <Table />
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}
