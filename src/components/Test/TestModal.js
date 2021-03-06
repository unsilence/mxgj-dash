import React, { Component } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import ReactDOM from 'react-dom';
import Editor from 'react-umeditor';
const FormItem = Form.Item;
class TestEditModal extends Component {
  constructor(props) {
    super(props);
        this.state = {
            content: ""
        }
  }
  handleChange(content){
        this.setState({
            content: content
        })
    }
    getIcons(){
        var icons = [
            "source | undo redo | bold italic underline strikethrough fontborder emphasis | ",
            "paragraph fontfamily fontsize | superscript subscript | ",
            "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
            "cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
            "horizontal date time  | image emotion spechars | inserttable"
        ]
        return icons;
       
    }
    getQiniuUploader(){
        return {
            url:'http://upload.qiniu.com',
            type:'qiniu',
            name:"file",
            request: "image_src",
            qiniu:{
                app:{
                    Bucket:"liuhong1happy",
                    AK:"l9vEBNTqrz7H03S-SC0qxNWmf0K8amqP6MeYHNni",
                    SK:"eizTTxuA0Kq1YSe2SRdOexJ-tjwGpRnzztsSrLKj"
                },
                domain:"http://o9sa2vijj.bkt.clouddn.com",
                genKey:function(options){
                    return options.file.type +"-"+ options.file.size +"-"+ options.file.lastModifiedDate.valueOf() +"-"+ new Date().valueOf()+"-"+options.file.name;
                }
            }
        }
    }
   
    handleSubmitForm(){
        var content = this.state.content;
        alert(content.editor);
    }
  render() {
    var icons = this.getIcons();
        var uploader = this.getQiniuUploader();
        var plugins = {
            image:{
                uploader:uploader
            }
        }
        var count = 100;
        var editors = [];
        for(var i=0;i<count;i++){
            editors.push({
                icons:icons,
                plugins:plugins
            })
        }
   return <Editor ref="editor"
                                icons={icons}
                                value={this.state.content}
                                defaultValue="<p>提示文本</p>"
                                onChange={this.handleChange.bind(this)}
                                plugins={plugins} />
  }
}

export default Form.create()(TestEditModal);
