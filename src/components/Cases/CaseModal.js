import React, { Component } from 'react';
import { Modal, Form, Input, Select,Upload,Icon,Radio } from 'antd';
import styles from '../item.less';
import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const caseModels = [{key:"1",value:"别墅"},{key:"2",value:"平层"}];
const caseSpaces = [{key:"1",value:"客厅"},{key:"2",value:"书房"},{key:"3",value:"卧室"},{key:"4",value:"餐厅"},{key:"5",value:"厨房"},{key:"6",value:"洗漱间"},{key:"7",value:"儿童房"}];
const caseStyles = [{key:"1",value:"现代"},{key:"2",value:"欧式"},{key:"3",value:"美式"},{key:"4",value:"古典"},{key:"5",value:"田园"},{key:"6",value:"混搭"}];
class CaseEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: 1,
      previewVisible: false,
      previewImage: '',
      fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }], 

    };
  }
  // onChange = (e) => {
  //   console.log('radio checked', e.target.value);
  //   this.setState({
  //     value: e.target.value,
  //   });
  // }
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleChange = ({ fileList }) => this.setState({ fileList })
  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
    this.props.form.resetFields(['headline','releaseTime','release_time','click_rate']);
  };

  okHandler = (e) => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { _id, urladdress,projectName,headline,key,caseNote,collocatImg,caseDoormodel,caseSpace,caseStyle,createAt,updateAt} = this.props.case;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const casespaceButton = caseSpaces.map(t=><RadioButton value={t.value}>{t.value}</RadioButton>);
    const casemodelButton = caseModels.map(v=><RadioButton value={v.value}>{v.value}</RadioButton>);
    const casestyleButton = caseStyles.map(a=><RadioButton value={a.value}>{a.value}</RadioButton>);
    return (
      <span>
        <span onClick={this.showModelHandler}>
          {children}
        </span> 

        <Modal
          title={_id ? "修改：": '新建'}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem className={styles.FormItem} {...formItemLayout} label="URL" > {getFieldDecorator('urladdress', { initialValue: urladdress })(<Input size="small" />)}</FormItem>
            <FormItem className={styles.FormItem} {...formItemLayout} label="项目名称" > {getFieldDecorator('projectName', { initialValue: projectName })(<Input size="small" />)}</FormItem>
            <FormItem className={styles.FormItem} {...formItemLayout} label="标题" > {getFieldDecorator('headline', { initialValue: headline })(<Input size="small" />)}</FormItem>
            <FormItem className={styles.FormItem} {...formItemLayout} label="搜索关键字" > {getFieldDecorator('key', { initialValue: key })(<Input size="small" />)}</FormItem>
            <FormItem className={styles.FormItem} {...formItemLayout} label="案例介绍" > {getFieldDecorator('caseNote', { initialValue: caseNote })(<Input size="small" />)}</FormItem>
            <FormItem className={styles.FormItem} {...formItemLayout} label="配图" > {getFieldDecorator('collocatImg', { initialValue: collocatImg })(<Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>)}</FormItem>
        <FormItem className={styles.FormItem} {...formItemLayout} label="请选择案例户型" > {getFieldDecorator('caseDoormodel', { initialValue: caseDoormodel })(<RadioGroup defaultValue="别墅" size="small">
              {casemodelButton}
           </RadioGroup>)}
           </FormItem>
           <FormItem className={styles.FormItem} {...formItemLayout} label="请选择案例空间" > {getFieldDecorator('caseSpace', { initialValue: caseSpace })(<RadioGroup defaultValue="客厅" size="small">
              {casespaceButton}
           </RadioGroup>)}
           </FormItem>
           <FormItem className={styles.FormItem} {...formItemLayout} label="请选择案例风格" > {getFieldDecorator('caseStyle', { initialValue: caseStyle })(<RadioGroup defaultValue="现代" size="small">
             {casestyleButton}
           </RadioGroup>)}
           </FormItem>
           <FormItem className={styles.FormItem} {...formItemLayout} label="发布时间" style={_id ? { display: 'block' } : { display: 'none' }}>    {getFieldDecorator('createAt', { initialValue: moment(new Date(createAt)).format('YYYY-MM-DD HH:mm:ss') })(
              <Input size="small" />
            )}</FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(CaseEditModal);