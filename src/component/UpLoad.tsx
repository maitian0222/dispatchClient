import * as React from 'react';
import { Button, Upload, Icon, message } from 'antd';
import http from '@sinoui/http';
import uuid from 'uuid/v4';

interface Props {
  /**
   * 上传地址
   */
  action: string;
  listType: 'text' | 'picture' | 'picture-card';
  /**
   * 可上传数量
   */
  upLoadNumber: string;
  /**
   * 文件数据
   */
  files: any[];
  /**
   * 上传类型限制
   * upLoadType={['xlsx', 'jpg', 'MP4']}
   */
  upLoadType?: [];
  /**
   * 上传大小限制
   * fileSize={20}  单位为M
   * 不写该属性默认为20M
   */
  fileSize?: number;
}
/**
 * 上传文件组件
 */
class UpLoadModule extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = { fileList: props.files || [], defaultFileList: [] };
  }

  public componentWillReceiveProps(nextProps) {
    if (nextProps.files !== this.props.files) {
      const files = (nextProps.files || []).map((f) => ({
        ...f,
        uid: f.id,
        name: f.title,
        status: 'done',
        url:
          f.url ||
          `http://192.168.80.144:8082/oss/attachment/download?id=${f.id}`,
        // thumbUrl:
        //   'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }));
      this.setState({
        fileList: files,
      });
      if (this.props.onChange) {
        this.props.onChange(files);
      }
    }
  }

  public onRemove = (file) => {
    if (file.id) {
      http.delete(`/oss/attachment/${file.id}`).then((result) => {});
    }
    const { fileList } = this.state;
    const newFileList = fileList.filter((item) => item !== file);
    this.setState({
      fileList: newFileList,
    });
    this.props.onChange(newFileList);
  };

  public UploadOnchange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功`);
      this.props.onChange([...info.fileList]);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
    this.setState({
      fileList: [...info.fileList],
    });
  };

  public beforeUpload = (file) => {
    const fileNameSuffix = file.name.split('.')[1].toLowerCase();
    if (this.props.upLoadType) {
      const index = this.props.upLoadType.findIndex(
        (type) => type.toLowerCase() === fileNameSuffix,
      );
      const isJPG = index !== -1 ? true : false;
      if (!isJPG) {
        message.error(`请上传${this.props.upLoadType}类型文件!`);
        return new Promise(function(resolve, reject) {
          reject();
        });
      }
    }
    let size = 20; // 默认限制20M
    if (this.props.fileSize) {
      size = this.props.fileSize;
    }

    const isLt2M = file.size / 1024 / 1024 < size;
    if (!isLt2M) {
      message.error(`上传的文件不能大于${size}MB!`);
      return new Promise(function(resolve, reject) {
        reject();
      });
    }

    return new Promise(function(resolve, reject) {
      resolve();
    });
  };

  // 文件预览
  public onPreview = () => {
    alert('onPreview');
  };

  public render() {
    const uploadButton = (
      <Button>
        <Icon type="upload" /> 上传文件
      </Button>
    );
    const {
      action,
      listType,
      upLoadNumber,
      accept,
      style,
      disabled,
    } = this.props;
    const { fileList } = this.state;
    return (
      <Upload
        accept={accept}
        fileList={fileList}
        listType={listType}
        action={action || '/oss/attachment/fileupload'}
        beforeUpload={this.beforeUpload}
        onChange={this.UploadOnchange}
        onRemove={this.onRemove}
        disabled={disabled || false}
        onPreview={this.onPreview}
        style={style}
      >
        {upLoadNumber
          ? fileList.length >= upLoadNumber || disabled
            ? null
            : this.props.children
            ? this.props.children
            : uploadButton
          : this.props.children
          ? this.props.children
          : uploadButton}
      </Upload>
      // <div>test</div>
    );
  }
}

export default UpLoadModule;
