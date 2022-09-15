import React, {useState, useEffect} from "react";
import Link from 'next/link'
import {Text} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
  AccountBookOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { Divider, Layout, Menu } from 'antd';
import styles from './index.module.css'

const {Sider } = Layout;

const Navbar = (props) =>{
  const {collapsed} = props
  const [role, setRole] = useState('user')
  const router = useRouter()
  
  useEffect(()=>{
    setRole(window.localStorage.getItem('rolesTracuu'))
    }, []);

  function logout(){
    const isRememberMe = window.localStorage.getItem('rememberTracuu')
    if (isRememberMe === 'true') {
      window.localStorage.removeItem('passwordTracuu')
      window.localStorage.removeItem('emailTracuu')
      window.localStorage.removeItem('fullNameTracuu')
      window.localStorage.removeItem('emailTracuu')
      window.localStorage.removeItem('rTokenTracuu')
      window.localStorage.removeItem('rolesTracuu')
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
    // getItem(<Link href={'/'}><a onClick={() => router.push('/') }>Home</a></Link>, '1', <HomeOutlined />),
    getItem('Tra cứu', 'sub1', <AppstoreOutlined />, [
      getItem(<Link href={'/thunhapthang'}><a onClick={() => router.push('/thunhapthang') }>Thu nhập tháng</a></Link>, '2', <AccountBookOutlined />),
      getItem(<Link href={'/thuetncn'}><a onClick={() => router.push('/thuetncn') }>Thuế TNCN</a></Link>, '3', <VideoCameraOutlined />), 
    ]),
    getItem('Cài đặt', 'sub2', <SettingOutlined  />, [
      getItem(<Link href={'/profile'}><a onClick={() => router.push('/profile') }>Trang cá nhân</a></Link>, '5', <UserOutlined />),
      getItem(<a onClick={logout }>Đăng xuất</a>, '6', <LogoutOutlined />), 
    ]),
    role.toLowerCase() === 'admin' && getItem('Quản trị', 'sub3', <BarChartOutlined />, [
      getItem(<Link href={'/employees'}><a onClick={() => router.push('/employees') }>Nhân viên</a></Link>, '7', <UserOutlined />),
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
        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
        items={items}
      />
      <div className={styles.version}>
        <Text>Version: 1.0.0</Text>
        <Divider/>
        <Link href={'/help'}><a onClick={() => router.push('/help') }>Hướng dẫn sử dụng</a></Link>
      </div>
  </Sider>
  )
}

export default Navbar