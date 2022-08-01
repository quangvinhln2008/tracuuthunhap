import React from "react";
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
  AccountBookOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import styles from './index.module.css'

const {Sider } = Layout;

const Navbar = (props) =>{
  const {collapsed} = props
  const router = useRouter()

  function logout(){
    const isRememberMe = window.localStorage.getItem('rememberTracuu')
    if (isRememberMe === 'true') {
      window.localStorage.removeItem('passwordTracuu')
      window.localStorage.removeItem('emailTracuu')
      window.localStorage.removeItem('fullNameTracuu')
      window.localStorage.removeItem('emailTracuu')
    } else {
      window.localStorage.clear()
    }
    router.push('/login')
  }

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem(<Link href={'/'}><a onClick={() => router.push('/') }>Home</a></Link>, '1', <HomeOutlined />),
    getItem('Tra cứu', 'sub1', <AppstoreOutlined />, [
      getItem(<Link href={'/thunhapthang'}><a onClick={() => router.push('/thunhapthang') }>Thu nhập tháng</a></Link>, '2', <AccountBookOutlined />),
      getItem(<Link href={'/thuetncn'}><a onClick={() => router.push('/thuetncn') }>Thuế TNCN</a></Link>, '3', <VideoCameraOutlined />), 
    ]),
    getItem('Cài đặt', 'sub2', <SettingOutlined  />, [
      getItem(<Link href={'/profile'}><a onClick={() => router.push('/profile') }>Trang cá nhân</a></Link>, '4', <UserOutlined />),
      getItem(<a onClick={logout }>Đăng xuất</a>, '5', <LogoutOutlined />), 
    ]),
  ];

  return(
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className={styles.logo}>
        <a
            href="https://ufm.edu.vn/"
            target="_blank"
            rel="noopener noreferrer"
          >
          <img src='./logo4.png'/>
        </a>
        </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys = {['1']}
        defaultOpenKeys={['sub1', 'sub2']}
        items={items}
      />
  </Sider>
  )
}

export default Navbar