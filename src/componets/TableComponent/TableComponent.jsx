import { Dropdown, Space, Table } from 'antd';
import React from 'react'
import { useState } from 'react';
import Loading from '../LoadingComponent/Loading';
import { Excel } from 'antd-table-saveas-excel';
import { useMemo } from 'react';


const TableComponent = (props) => {
    const { selectionType = 'checkbox', data:dataSource =[], isLoading= false, columns = [],handleDeleteMany } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
    const newColumnExport = useMemo(() => {
      const arr = columns?.filter((col) => col.dataIndex !== 'action')
      return arr
    },[columns])

  // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setRowSelectedKeys(selectedRowKeys)
        },
        // getCheckboxProps: (record) => ({
        // disabled: record.name === 'Disabled User',
        // // Column configuration not to be checked
        // name: record.name,
        // }),
    };
    // const items = [
    //   {
    //     label: (
    //       <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
    //         Xóa tất cả
    //       </a>
    //     ),
    //     key: '0',
    //   }
    // ];  
  const handleDeleleAll = () => {
    handleDeleteMany(rowSelectedKeys)
  }

  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(dataSource, {
        str2Percent: true
      })
      .saveAs("Excel.xlsx");
  };

  return (
    <Loading isLoading={isLoading}>
      {rowSelectedKeys.length > 0 && (
          <div style={{
            background:'blue',
            color: '#fff',
            fontWeight: 'bold',
            padding:'10px',
            cursor:'pointer',
            }}
            onClick={handleDeleleAll}
            > 
            Xóa tất cả
            {/* <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Hover me
                <DownOutlined />
              </Space>
            </a>
          </Dropdown> */}
          </div>
      )} 
      <button onClick={exportExcel}>Export Excel</button>
    <Table
        rowSelection={{
            type: selectionType,
            ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        {...props}
    />
    </Loading>
  )
}

export default TableComponent