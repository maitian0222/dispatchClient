import React, { Component } from 'react';
import { Button, Divider } from 'antd';
import { Document, Page } from 'react-pdf';
import Filepdf from './demo.pdf';

class DemoPdf extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
    };
  }

  public onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  };

  public onNext = (page: number) => {
    if (page < this.state.numPages) {
      this.setState({
        pageNumber: page,
      });
    }
  };
  public onLast = (page: number) => {
    if (page !== 0) {
      this.setState({
        pageNumber: page,
      });
    }
  };

  public render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <Document
          // file="http://192.168.137.203:8083/demo.pdf"
          file={Filepdf}
          onLoadSuccess={this.onDocumentLoad}
          loading="正在加载pdf..."
          renderTextLayer={true}
          noData="加载pdf失败..."
        >
          <Page scale={1} width={1000} pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
          <Divider type="vertical" />
          <Button type="primary" onClick={() => this.onLast(pageNumber - 1)}>
            上一页
          </Button>
          <Divider type="vertical" />
          <Button type="primary" onClick={() => this.onNext(pageNumber + 1)}>
            下一页
          </Button>
        </p>
      </div>
    );
  }
}

export default DemoPdf;
