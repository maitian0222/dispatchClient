import * as React from 'react';
import { Row, Col, Tree } from 'antd';
import { getResourcesTree } from './apis';

const { TreeNode } = Tree;

const RowStyle = { margin: '10px' };
interface Props {
  editItem: any;
}
class ResourcesTree extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      treeData: [],
    };
  }

  public componentWillMount() {
    this.getResourcesTree();
  }

  public getResourcesTree = (params?: any) => {
    getResourcesTree(params).then((result) => {
      this.setState({
        treeData: result,
      });
    });
  };

  public onLoadData = (treeNode) => {
    return getResourcesTree({ id: treeNode.props.dataRef.key }).then((data) => {
      treeNode.props.dataRef.children = data;
      this.setState({
        treeData: [...this.state.treeData],
      });
    });
  };

  public renderTreeNodes = (data) =>
    data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} key={item.key} dataRef={item} />;
    });

  public onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  public onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  public render() {
    const { editItem } = this.props;

    return (
      <div
        style={{
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Row style={RowStyle}>
          <Col span={6} style={{ textAlign: 'right', paddingRight: '10px' }}>
            角色名称:
          </Col>
          <Col span={18}>{editItem.roleName}</Col>
        </Row>
        <Row style={RowStyle}>
          <Col span={6} style={{ textAlign: 'right', paddingRight: '10px' }}>
            资源树:
          </Col>
          <Col span={18}>
            <Tree
              loadData={this.onLoadData}
              checkable
              onSelect={this.onSelect}
              onCheck={this.onCheck}
            >
              {this.renderTreeNodes(this.state.treeData)}
            </Tree>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ResourcesTree;
