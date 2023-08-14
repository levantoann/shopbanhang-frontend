import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../untils';
import {UserOutlined, AppstoreOutlined,ShoppingCartOutlined } from '@ant-design/icons'
import HeaderComponent from '../../componets/HeaderComponent/HeaderComponent';
import AdminUser from '../../componets/AdminUser/AdminUser';
import AdminProduct from '../../componets/AdminProduct/AdminProduct';
import OrderAdmin from '../../componets/OrderAdmin/OrderAdmin';

const AdminPage = () => {
    const items = [
        getItem('Người Dùng', 'user', <UserOutlined />),
        getItem('Sản Phẩm', 'product', <AppstoreOutlined />),
        getItem('Đơn hàng', 'order', <ShoppingCartOutlined />)
      ];

    const [keySelected, setKeySelected] = useState('')

    const renderPage = (key) => {
        switch(key) {
            case 'user':
                return(
                    <AdminUser />
                )
            case 'product':
                return(
                    <AdminProduct />
                    )
            case 'order':
                return(
                      <OrderAdmin />
                      )
            default:
                return <></>
        }
    }

    const handleOnClick = ({key}) => {
        setKeySelected(key)
    }

  return (
    <>
    <HeaderComponent isHiddenSearch isHiddenCard/>
    <div style={{display:'flex', overflowX: 'hidden'}}>
    <Menu
      mode="inline"
      style={{
        width: 256,
        boxShadow: '1px 1px 2px #ccc',
        height: '100vh'
      }}
      items={items}
      onClick={handleOnClick}
    />
    <div style={{flex:1,padding:'15px 0 15px 15px'}}>
      {renderPage(keySelected)}
    </div>
    </div>
    </>
  )
}

export default AdminPage