import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm ,Row,Col,Button,Icon} from 'antd';
import { routerRedux } from 'dva/router';
import styles from '../list.less';
let PAGE_SIZE = 10
import SerialModal from './SerialModal';

function Serials({ dispatch, list: dataSource, loading, total, page: current }) {

  function deleteHandler(itm) {
      console.log('deleteHandler',itm)
    dispatch({
      type: 'serials/remove',
      payload: {id:itm._id},
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/serials',
      query: { page },
    }));
  }

  function editHandler(id, values) {
      if(id){
          dispatch({
            type: 'serials/patch',
            payload: { id, values },
          });
      }else {
          dispatch({
            type: 'serials/add',
            payload: { id, values },
          });
      }

  }

  const columns = [
    {
      title: 'id',
      dataIndex: '_id',
      key: '_id',
      render: text => <a href="">{text}</a>,
    },
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '备注',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, serial) => (
        <span className={styles.operation2}>
          <SerialModal serial={serial} onOk={editHandler.bind(null, serial._id)}>
            <Icon type="edit" className={styles.icon}/>
          </SerialModal>
          <Popconfirm title={"确定要删除色系【"+serial.name+"】吗？"} onConfirm={deleteHandler.bind(null, serial)}>
            <Icon type="delete" className={styles.icon}/>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <Row type="flex" justify="end">
            <SerialModal serial={{}} onOk={editHandler.bind(null,'')}>
                <Button  icon="plus-circle-o">添加</Button>
            </SerialModal>
        </Row>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={serial => serial._id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.serials;
  return {
    loading: state.loading.models.serials,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Serials);
