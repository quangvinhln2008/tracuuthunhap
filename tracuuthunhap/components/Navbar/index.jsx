import React from "react";
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
  AccountBookOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import styles from './index.module.css'

const {Sider } = Layout;

const Navbar = (props) =>{
  const {collapsed} = props
  const router = useRouter()

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem('Tra cứu', 'sub1', <AppstoreOutlined />, [
      getItem(<Link href={'/thunhapthang'}><a onClick={() => router.push('/thunhapthang') }>Thu nhập tháng</a></Link>, '1', <AccountBookOutlined />),
      getItem(<Link href={'/thuetncn'}><a onClick={() => router.push('/thuetncn') }>Thuế TNCN</a></Link>, '2', <VideoCameraOutlined />), 
    ]),
    getItem('Cài đặt', 'sub2', <SettingOutlined  />, [
      getItem(<Link href={'/changepassword'}><a onClick={() => router.push('/changepassword') }>Đổi mật khẩu</a></Link>, '3', <UserOutlined />),
      getItem(<Link href={'/logout'}><a onClick={() => router.push('/logout') }>Đăng xuất</a></Link>, '4', <LogoutOutlined />), 
    ]),
  ];

  return(
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className={styles.logo} />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['sub1']}
        defaultOpenKeys={['sub1']}
        items={items}
      />
  </Sider>
  )
}

export default Navbar