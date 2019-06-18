import * as React from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;

export default class TestTree extends React.Component {
  public onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  public onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  public render() {
    return (
      <Tree
        checkable
        multiple
        defaultExpandedKeys={['001']}
        defaultSelectedKeys={['001']}
        defaultCheckedKeys={['101001', '101003']}
        onSelect={this.onSelect}
        onCheck={this.onCheck}
      >
        <TreeNode title="国家开发银行" key="001">
          <TreeNode title="评管局" key="100" disabled>
            <TreeNode title="评管一局" key="100001" disableCheckbox />
            <TreeNode title="评管二局" key="100002" />
          </TreeNode>
          <TreeNode title="办公厅" key="101">
            <TreeNode
              title={<span style={{ color: '#1890ff' }}>秘书一处</span>}
              key="101001"
            />
            <TreeNode title="信息调研处" key="101002" />
            <TreeNode title="公文管理处" key="101003" />
          </TreeNode>
        </TreeNode>
      </Tree>
    );
  }
}
