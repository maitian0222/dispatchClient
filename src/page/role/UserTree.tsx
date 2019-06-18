import * as React from 'react';
import { Transfer, Tree } from 'antd';
import { getUserTree } from './apis';

const { TreeNode } = Tree;

// Customize Table Transfer
const isChecked = (selectedKeys, eventKey) => {
  return selectedKeys.indexOf(eventKey) !== -1;
};

const generateTree = (treeNodes = [], checkedKeys = []) => {
  return treeNodes.map(({ children, ...props }) => (
    <TreeNode {...props} disabled={checkedKeys.includes(props.key)}>
      {generateTree(children, checkedKeys)}
    </TreeNode>
  ));
};

const TreeTransfer = ({ dataSource, targetKeys, ...restProps }) => {
  const transferDataSource = [];
  function flatten(list = []) {
    list.forEach((item) => {
      transferDataSource.push(item);
      flatten(item.children);
    });
  }
  flatten(dataSource);

  return (
    <Transfer
      {...restProps}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className="tree-transfer"
      render={(item) => item.title}
      showSelectAll={false}
    >
      {({ direction, onItemSelect, selectedKeys }) => {
        if (direction === 'left') {
          const checkedKeys = [...selectedKeys, ...targetKeys];
          return (
            <Tree
              blockNode
              checkable
              checkStrictly
              checkedKeys={checkedKeys}
              onCheck={(
                _,
                {
                  node: {
                    props: { eventKey },
                  },
                },
              ) => {
                onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
              }}
              onSelect={(
                _,
                {
                  node: {
                    props: { eventKey },
                  },
                },
              ) => {
                onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
              }}
            >
              {generateTree(dataSource, targetKeys)}
            </Tree>
          );
        }
      }}
    </Transfer>
  );
};

class UserTree extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      targetKeys: [],
      treeData: [],
    };
  }

  public componentWillMount() {
    getUserTree({}).then((result) =>
      this.setState({
        treeData: result,
      }),
    );
  }

  public onChange = (targetKeys: any) => {
    console.log('Target Keys:', targetKeys);
    this.setState({ targetKeys });
  };

  public render() {
    const { targetKeys, treeData } = this.state;
    return (
      <div>
        <TreeTransfer
          dataSource={treeData}
          targetKeys={targetKeys}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
export default UserTree;
