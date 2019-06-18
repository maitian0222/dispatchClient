import * as React from 'react';
import { TreeSelect } from 'antd';
import { getMenuTree, getRoleIdToResources } from './apis';
import Role from './types/Role';

const SHOW_PARENT = TreeSelect.SHOW_PARENT;

// const treeData = [
//   { key: '1', value: '1', title: '公文管理', isLeaf: true },
//   {
//     key: '2',
//     value: '2',
//     title: '信息管理',
//     children: [
//       { key: '2-0', value: '2-0', title: '信息公告' },
//       { key: '2-1', value: '2-1', title: '公告板' },
//     ],
//   },
//   { key: '3', value: '3', title: '用户管理', isLeaf: true },
// ];

interface Props {
  initialValues: Role;
}
interface State {
  value: string[] | string;
  treeData: any[];
}

class ResourcesTreeFrom extends React.Component<Props, State> {
  public treeData = [];
  constructor(props: Props) {
    super(props);
    this.state = {
      value: [],
      treeData: [],
    };
  }

  public componentDidMount() {
    getMenuTree({ type: 'menu' }).then((result) => {
      const content = result.content;

      if (this.props.initialValues) {
        getRoleIdToResources(this.props.initialValues.roleId).then(
          (data: string[]) => {
            this.setState({
              treeData: content,
              value: data,
            });
          },
        );
      } else {
        this.setState({
          treeData: content,
        });
      }
    });
  }

  public onChange = (value) => {
    console.log('onChange ', value);
    this.setState({ value });
    this.props.onChange(value);
  };

  public render() {
    const tProps = {
      treeData: this.state.treeData,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请选择资源',
      getPopupContainer: () => document.getElementById('area'),
    };
    return (
      <div id="area">
        <TreeSelect {...tProps} />
      </div>
    );
  }
}

export default ResourcesTreeFrom;
