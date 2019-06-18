import * as React from 'react';
import { Tree, Input } from 'antd';
import http from '@commons/http';
const { TreeNode } = Tree;
const Search = Input.Search;
/**
 * 异步加载数据
 */
export default class TestTree extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      expandedKeys: [],
      treeData: [],
      autoExpandParent: false,
    };
  }

  public componentDidMount() {
    http.get('/dispute/tree').then((data) => {
      this.setState({
        treeData: data,
        expandedKeys: [data[0].id],
      });
    });
  }

  /**
   * 树节点的展开和收起
   *
   */
  public onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
    });
  };

  /**
   * 调用接口获取后端数据
   *
   * @memberof TestTree
   */
  public onSearch = (value: string) => {
    http.get('/dispute/tree/search', { params: { value } }).then((data) => {
      this.setState({
        treeData: data,
      });
    });
  };

  /**
   *  调用接口获取子节点
   */
  public onLoadData = (treeNode) => {
    return http
      .get('/dispute/tree/childNode', {
        params: { parentId: treeNode.props.dataRef.id },
      })
      .then((data) => {
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
          <TreeNode title={item.title} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} key={item.id} dataRef={item} />;
    });

  public render() {
    return (
      <div>
        <Search
          style={{ marginBottom: 8 }}
          placeholder="Search"
          onSearch={this.onSearch}
        />
        <Tree
          loadData={this.onLoadData}
          expandedKeys={this.state.expandedKeys}
          onExpand={this.onExpand}
        >
          {this.renderTreeNodes(this.state.treeData)}
        </Tree>
      </div>
    );
  }
}
