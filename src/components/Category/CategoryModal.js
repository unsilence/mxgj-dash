import React, { Component } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import styles from '../item.less';

const FormItem = Form.Item;

class CategoryEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

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
    this.props.form.resetFields(['name','parentId','note']);
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { _id, name, note ,parentId} = this.props.record;
    const categoryMap =  this.props.record.categoryMap || {};
    let categories = [];
    for(let key in categoryMap){
      categories.push({key:key,value:categoryMap[key].name})
    }
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const options = categories.filter(v => v.key !== _id).map(v => <Select.Option key={v.key} value={v.key}>{v.value}</Select.Option>);
    return (
      <span>
        <span onClick={this.showModelHandler}>
          {children}
        </span>
        <Modal
          title={_id ? "修改" : '新建'}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem className={styles.FormItem} {...formItemLayout} label="分类" >    {getFieldDecorator('name', {rules:[{required: true, message: '请输入分类名称!'}], initialValue: name })(<Input size="small" />)}</FormItem>
            <FormItem className={styles.FormItem} {...formItemLayout} label="父分类" > {getFieldDecorator('parentId', {rules:[{required: true, message: '请输入所属分类!'}], initialValue: parentId })(
              <Select size="small" {...{ defaultActiveFirstOption: true }} >{options}</Select>
            )}
            </FormItem>
            <FormItem className={styles.FormItem} {...formItemLayout} label="备注" >       {getFieldDecorator('note', {rules:[{required: true, message: '请输入备注内容!'}], initialValue: note })(<Input size="small" />)}</FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(CategoryEditModal);
