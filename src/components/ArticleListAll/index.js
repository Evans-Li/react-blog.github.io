import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Table,Pagination, Spin } from 'antd'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import './index.scss'
import Transition from '../../components/Transition'

const ArticleListAll = ({ list, toUpdataArticle, delArticle }) => {

  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  let searchRef = useRef(null)
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchRef = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>

      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchRef.select());
      }
    },
    render: text => searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('')
  };

  
  //  修改文章
  function upArticle(e) {
    toUpdataArticle(e.target.value)
  }
  //  删除文章
  const delArt = e =>{
    delArticle(e.target.value)
  }

  //  留言管理
  const artCommMange = (e) =>{
  }


  const renderList = () => {
    const TableCols = [
      {
        title: '文章标题',
        dataIndex: 'title',
        key: 'title',
        fixed: 'left',
        ...getColumnSearchProps('title'),
      },
      {
        title: '文章类别',
        dataIndex: 'typeName',
        key: 'typeName',
        ...getColumnSearchProps('typeName'),
      },
      {
        title: '发布时间',
        dataIndex: 'addTime',
        key: 'addTime',
        ...getColumnSearchProps('addTime'),
      },
      {
        title: '浏览量',
        dataIndex: 'view_count',
        key: 'view_count',
        ...getColumnSearchProps('view_count'),
      },
      {
        title: '操作',
        dataIndex: 'handle',
        key: 'handle',
        render: (text, record) => {
          return (
            <div className='action-btn-div'>
              <button value={record.id} type='button' onClick={upArticle}>修改</button>
              <button value={record.id} type='button' onClick={delArt}>删除</button>
              <button value={record.id} type='button' onClick={artCommMange}>留言管理</button>
            </div>
          )
        }
      },
    ]
    return (
      <div>
        <Table columns={TableCols} dataSource={list} size='middle'  bordered />
      </div>
    )
  }

  const renderTable = () =>(
    renderList()
  )


  return (
    <div>
      {/* <Transition
        in={true}
        timeout={1500}
        classNames={"fly"}
        appear={true}
        unmountOnExit={true}
        item={renderTable}
      /> */}
      {renderList()}
    </div>
  )
}

export default ArticleListAll