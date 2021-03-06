import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Row, Col, Button, Icon, Input , message} from 'antd';
import { routerRedux, browserHistory } from 'dva/router';
import styles from '../list.less';
const PAGE_SIZE_P = 5;
const PAGE_SIZE_R = 5;
import AddBannerModal from './AddBannerModal.js';
import BannerConsoleModal from './BannerConsoleModal.js';
import HistryBannerModal from './HistryBannerModal.js';

import moment from 'moment'

const dateFormat = 'YYYY/MM/DD  hh:mm:ss';

class Banners extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: this.props.loading,
      plist: this.props.plist,
      ptotal: this.props.ptotal,
      ppage: this.props.ppage,
      rlist: this.props.rlist,
      rtotal: this.props.rtotal,
      rpage: this.props.rpage,
      categoryMap: this.props.categoryMap,
      dispatch: this.props.dispatch,
      searchWords: this.props.searchWords || ""
    }
  }

  componentWillReceiveProps (nextProps) {
    let temp = {
      loading: nextProps.loading,
      plist: nextProps.plist,
      ptotal: nextProps.ptotal,
      ppage: nextProps.ppage,
      rlist: nextProps.rlist,
      rtotal: nextProps.rtotal,
      rpage: nextProps.rpage,
      categoryMap: nextProps.categoryMap,
      dispatch: nextProps.dispatch,
      searchWords: nextProps.searchWords
    }
    this.setState(temp);
  }

  deleteHandler = (itm) => {
    this.state.dispatch({
      type: 'banners/remove',
      payload: { id: itm._id, searchWords: this.state.searchWords },
    });
  }

  pageChangeHandler = (page) => {
    this.state.dispatch(routerRedux.push({
      pathname: '/banners',
      query: { page, rpage: this.state.rpage, searchWords: this.state.searchWords },
    }));
  }
  rpageChangeHandler = (page) => {
    this.state.dispatch(routerRedux.push({
      pathname: '/banners',
      query: { page: this.state.ppage, rpage: page, searchWords: this.state.searchWords },
    }));
  }

  offlineHandle = (id, values) => {
    let obj = {};
    obj.is_online = false;
    obj.is_history = true;
    obj.pend = true;
    this.state.dispatch({
      type: 'banners/patch',
      payload: { id, values : obj, searchWords: this.state.searchWords },
    });
  }

  editHandler = (id, values) => {
    if (id) {
      this.state.dispatch({
        type: 'banners/patch',
        payload: { id, values },
      });
    } else {
      this.state.dispatch({
        type: 'banners/add',
        payload: { id, values },
      });
    }
  }

  uptop = (record) => {
    this.state.dispatch({
      type: 'banners/uptop',
      payload: { record, searchWords: this.state.searchWords },
    });
  }

  upbottom = (record) => {
    this.state.dispatch({
      type: 'banners/upbottom',
      payload: { record, searchWords: this.state.searchWords },
    });
  }


  historyHandler = (e) => {
    e.preventDefault();
    (async function () {
      browserHistory.push('/historybanners')
    })();
  }

  // downLine = (record) => {
  //   let value = {};
  //   value.is_online = false;
  //   value.is_history = true;
  //   value.pend = true;
  //   this.state.dispatch({
  //     type: 'banners/patch',
  //     payload: { id: record._id, values: value, searchWords: this.state.searchWords },
  //   });
  // }

  getImg = (images) => {
    if (images.length > 0) {
      return <img src={"/api/file/" + images} style={{ width: "30px", height: "30px" }} />
    } else {
      return '无图';
    }
  }

  getRank(record) {
    let opts = [];
    if ((this.state.plist.indexOf(record) + PAGE_SIZE_P * (this.state.ppage ? this.state.ppage - 1 : 0)) === 0) {
      opts.push(<Icon type="arrow-down" key="arrow-down" onClick={() => { this.upbottom(record) }} style={{ marginRight: "10px" }} />)
    } else if ((this.state.plist.indexOf(record) + PAGE_SIZE_P * (this.state.ppage ? this.state.ppage - 1 : 0)) === this.state.ptotal - 1) {
      opts.push(<Icon type="arrow-up" key="arrow-up" onClick={() => { this.uptop(record) }} style={{ marginRight: "10px" }} />);
    } else {
      opts.push(<Icon type="arrow-up" key="arrow-up" onClick={() => { this.uptop(record) }} style={{ marginRight: "10px" }} />);
      opts.push(<Icon type="arrow-down" key="arrow-down" onClick={() => { this.upbottom(record) }} style={{ marginRight: "10px" }} />)
    }
    return <div> {opts}</div>
  }


  search = (e) => {
    if (e.target) {
      this.setState({ "searchWords": e.target.value });
    }
    else {
      this.setState({ "searchWords": e });
    }

  }
  // 资源池  发布按钮的方法
  upLineHandler = (record) => {
    if(record.title && record.image){
      let value = {};
      value.is_online = true;
      value.is_history = false;
      value.pstart = true;
      this.editHandler(record._id,value);
    }else{
      message.warning('请填写完整数据');
    }
  }

  render() {
    let columns = [
      {
        title: '序号',
        dataIndex: 'cnum',
        key: 'cnum',
        render: (text, record) => <span>{(this.state.plist.indexOf(record) + 1) + PAGE_SIZE_P * (this.state.ppage ? this.state.ppage - 1 : 0)}</span>
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: text => <span>{text}</span>
      },
      {
        title: '发布时间',
        dataIndex: 'pstart',
        key: 'pstart',
        render: text => <span>{moment(text).format(dateFormat)}</span>
      },
      {
        title: '点击量',
        dataIndex: 'hot',
        key: 'hot',
        render: text => <span>{text || 0}</span>
      },
      {
        title: "排序",
        dataIndex: 'rank',
        key: 'rank',
        render: (text, record) => this.getRank(record)
      },
      {
        title: '操作',
        key: 'operation',
        render: (text, record) => (
          <span className={styles.operation2}>
            <Button type="primary" onClick={this.offlineHandle.bind(null, record._id, record)}>下线</Button>
            <AddBannerModal banner={record} onOk={this.editHandler.bind(null, record._id)}>
              <Button type="danger">编辑</Button>
            </AddBannerModal>

          </span>
        ),
      },
    ];

    const history = [
      {
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: text => <span>{text}</span>
      },
      {
        title: '图片',
        dataIndex: 'image',
        key: 'image',
        render: text => <span>{this.getImg(text)}</span>
      },
      {
        title: '操作',
        key: 'operation',
        render: (text, record) => (
          <span className={styles.operation2}>
            <Button type="danger" onClick={() => this.upLineHandler(record)}>发布</Button>
            <AddBannerModal banner={record} onOk={this.editHandler.bind(null, record._id)}>
              <Button type="edit">编辑</Button>
            </AddBannerModal>
          </span>
        ),
      },
    ];

    return (
      <div className={styles.normal}>
        <div>
          <Row type="flex" justify="space-between">
            <Col span={15}>
              <Input.Search
                type="text"
                placeholder="搜索"
                size="default"
                value={this.state.searchWords}
                onChange={v => this.search(v)}
                onSearch={v => { this.search(v); this.pageChangeHandler() }}
              />
            </Col>
            <Col span={9} push={1} style={{ marginBottom: "15px" }}>
              <Button onClick={this.historyHandler}>历史banner</Button>
              <BannerConsoleModal>
                <Button style={{ marginLeft: "15px" }}>操作日志</Button>
              </BannerConsoleModal>

              <AddBannerModal banner={{}} onOk={this.editHandler.bind(null, '')}>
                <Button style={{ marginLeft: "15px" }}>添加banner</Button>
              </AddBannerModal>
            </Col>
          </Row>
          <Row>
            <div style={{ position: "relative", paddingLeft: "10px" }}>
              <Table
                columns={columns}
                dataSource={this.state.plist || []}
                loading={this.state.loading}
                rowKey={record => record._id}
                pagination={false}
              />
              <span style={{ display: 'inline-block', width: "15px", position: "absolute", left: "0px", top: "0px" }}>已发布</span>
            </div>

            <Pagination
              className="ant-table-pagination"
              total={this.state.ptotal}
              current={this.state.ppage || 1}
              pageSize={PAGE_SIZE_P}
              onChange={this.pageChangeHandler}
            />
          </Row>
          <Row>
            <div style={{ position: "relative", paddingLeft: "10px" }}>
              <Table
                columns={history}
                dataSource={this.state.rlist || []}
                rowKey={record => record._id}
                pagination={false}
              />
              <span style={{ display: 'inline-block', width: "15px", position: "absolute", left: "0px", top: "0px" }}>资源池</span>
            </div>
            <Pagination
              className="ant-table-pagination"
              total={this.state.rtotal}
              current={this.state.rpage || 1}
              pageSize={PAGE_SIZE_R}
              onChange={this.rpageChangeHandler}
            />
          </Row>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {

  const { list ,searchWords} = state.banners;
  if (Array.isArray(list)) {
    return { loading: state.loading.models.banners,searchWords:searchWords }
  }
  else {
    return {
      loading: state.loading.models.banners,
      plist: list.p.data,
      ptotal: list.p.total,
      ppage: list.p.page,
      rlist: list.r.data,
      rtotal: list.r.total,
      rpage: list.r.page,
      searchWords:searchWords
    };
  }

}

function mapDispatchToProps(dispatch) {
  return { dispatch: dispatch }
}
export default connect(mapStateToProps, mapDispatchToProps)(Banners);
