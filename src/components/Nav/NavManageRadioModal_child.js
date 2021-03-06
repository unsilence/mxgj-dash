import React, { Component } from 'react';
import { Modal, Form, Checkbox ,Row,Col , Button} from 'antd';
import styles from '../item.less';
import * as utils from '../utils.js';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
class NavManageRadioModalChild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indeterminate: true,
      checkObj:{},
      text : "排序",
      sort : [],
      sortIsShow : false
    };
  }
  // getCheckObj(){
  //   let { checkedChildIds , child} = this.props;
  //   let obj = {};
  //   obj.checkedList = [];
  //   if(checkedChildIds && checkedChildIds[child._id] && checkedChildIds[child._id].length > 0){
  //     obj.checkedList = checkedChildIds[child._id];
  //   }
  //   return obj;
  // }
  componentWillReceiveProps (nextProps) {

    if(nextProps.childrenList !== undefined){
      this.setState({
        checkObj : {"checkedList" : nextProps.childrenList}
      })
    }
  }
  getChildCheckItems(_ids){
    return _ids.filter(v => {return this.state.checkObj[v] !== undefined});
  }
  componentDidMount() {
    this.props.form.validateFields();
  }
  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
    this.props.form.resetFields();
  };

  handleChange = (info) => {
    if (info.file.status === 'done') {
      this.setState({imageUrl:info.file.response.md5list[0]});
    }else if(info.file.status === 'removed'){
      this.setState({imageUrl:null});
    }
  }

  okHandler = () => {
    const { onOk } = this.props;
    onOk(this.state.checkObj.checkedList);
    this.hideModelHandler();
  };
  onChangeHandler = (checkedList) => {
    this.state.checkObj.checkedList = checkedList;
    this.setState({
      checkObj : this.state.checkObj
    })
  }
  sortClickHandler = () => {
   const { child , rootObj } = this.props;
   let childList = rootObj[child._id];
   console.log(this.state.sort);
   if(this.state.text === "排序"){
    this.state.checkObj.checkedList.map(v => {
      childList.map(l => {
        if(v === l.value){
          this.state.sort.push(l)
        }
      })
    })
    this.setState({
      text : "勾选",
      sort : this.state.sort,
      sortIsShow : true
    })
  }else{
    this.state.sort = [];
    this.setState({
      text : "排序",
      sort : this.state.sort,
      sortIsShow : false
    })
  }
}
render() {
  const { child , rootObj ,children ,childrenList } = this.props;
  let childList = rootObj[child._id];
  console.log(childList);
  const { getFieldDecorator } = this.props.form;
  return (
    <span>
    <span onClick={this.showModelHandler}>
    {children}
    </span>
    <Modal
    title={`${child.name}展示`}
    visible={this.state.visible}
    onOk={this.okHandler}
    onCancel={this.hideModelHandler}
    >
    <Form layout="vertical" onSubmit={this.okHandler}>
    <Row type="flex" justify="end">
    <span style={{marginRight:"20px" }} onClick={this.sortClickHandler}>{this.state.text}</span>
    </Row> {
      !this.state.sortIsShow ?
      <FormItem className={styles.FormItem}>
      <div>
      <CheckboxGroup options={childList} value={this.state.checkObj.checkedList ?  this.state.checkObj.checkedList : childrenList} onChange={this.onChangeHandler}/>            
      </div>
      </FormItem> :
      <FormItem className={styles.FormItem}>
      {getFieldDecorator('radio_1')(
        <div>{
          this.state.sort.map((item, index) => (
            <span key={index} style={{ padding: "10px", border: "1px solid #666", borderRadius: "5px" }}>
            {item.label}
            </span>
            ))
          }</div>
          )}
          </FormItem>
        } </Form>
        </Modal>
        </span>
        );
        }
      }

      export default Form.create()(NavManageRadioModalChild);
